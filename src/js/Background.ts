import {CurveInterpolator} from 'curve-interpolator';
import {generateOffsetCurveNegative, generateOffsetCurvePositive, Point} from "./mathUtils";

class LineStyle {
    constructor(
        public strokeStype: string,
        public lineWidth: number,
        public hasShadow: boolean,
        public shadowBlur?: number,
        public shadowColor?: string,
        public shadowOffsetY?: number,
        public shadowOffsetX?: number,
    ) {
    }
}

export class DragItem {

    constructor(public center: Point,
                private scalefactor: number) {
    }

    setCenter(newCenter: Point){
        this.center = newCenter;
    }

    draw(context: CanvasRenderingContext2D) {
        const radius = 32 * this.scalefactor;
        context.beginPath();
        context.globalAlpha = 0.5;
        context.arc(this.center.x * this.scalefactor, this.center.y * this.scalefactor, radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'white';
        context.fill();
        context.lineWidth = 5;
        context.globalAlpha = 1;
        context.strokeStyle = '#003300';
        context.stroke();
    }

    setScaleFactor(newScalefactor: number) {
        this.scalefactor = newScalefactor;
    }
}

export function drawTile(context: CanvasRenderingContext2D, x: number, y: number, title: string) {
    context.beginPath();
    context.fillStyle = '#ffffff'
    context.strokeStyle = '#ffffff'
    context.lineWidth = 4;
    context.font = "60px Arial";
    context.fillText(title, x + window.screen.width, y - 115 + window.screen.height);
    context.font = "30px Arial";
    context.fillText("link zu coolem git repo 1", x + window.screen.width, y + window.screen.height);
    context.fillText("link zu coolem git repo 2", x + window.screen.width, y + 45 + window.screen.height);
    context.strokeRect(x - 200 + 202 + window.screen.width, y + 425 - 525 + window.screen.height, 325, 2);
    context.shadowBlur = 5;
    context.shadowColor = '#ffffff';
    context.shadowOffsetY = 2;
    context.shadowOffsetX = 2;
    context.strokeRect(x - 200 + 175 + window.screen.width, y + 425 - 600 + window.screen.height, 390, 250);
    context.stroke();
}

export function drawBackground(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    context.fillStyle = '#ccd5ae'
    context.beginPath();
    context.fillRect(0, 0, canvas.width + window.screen.width, canvas.height + window.screen.height);
    context.stroke();
    drawTile(context, 600, 1200, "C++");
    drawTile(context, 1300, 1800, "Python");
}

export class Rails {
    interpolator: CurveInterpolator;
    curve: number[][];
    scaleFactor: number = 0;
    private splineBasePoints: DragItem[] = [];
    private isAwaitingRedraw: boolean;
    private activeDragPoint: DragItem[] = [];

    constructor(points: number[][], scalefactor: number) {
        this.scaleFactor = scalefactor;
        points.forEach((point) => {
            const x = point[0] * this.scaleFactor;
            const y = point[1] * this.scaleFactor;
            this.splineBasePoints.push(new DragItem(new Point(x, y),1));
        });
        this.interpolate();
    }

    private interpolate() {
        let tmp: number[][] = [];
        for (const splineBasePoint of this.splineBasePoints) {
            tmp.push(splineBasePoint.center.toArr());
        }
        this.interpolator = new CurveInterpolator(tmp, {tension: -.75});
        this.curve = this.interpolator.getPoints(this.interpolator.length);
        this.isAwaitingRedraw = true;
    }

    pxToNormalized(px: number): number {
        return px / this.interpolator.length;
    }

    public getInterpolatedTrainPosition(normalizedInput: number): Point {
        if (normalizedInput < 0 || normalizedInput > 1)
            throw new Error("input from zero to one expected")
        let tmp = this.interpolator.getPointAt(normalizedInput) as number[];

        return new Point(tmp[0], tmp[1]);
    }

    public draw(context: CanvasRenderingContext2D): void {
        if (this.isAwaitingRedraw)
            this.drawRails(context);
        this.splineBasePoints.forEach((item) => {
            item.draw(context);
        });
    }

    private drawRails(context: CanvasRenderingContext2D) {
        let negativeOffset = generateOffsetCurveNegative(this.curve, 10 * this.scaleFactor);
        let positiveOffset = generateOffsetCurvePositive(this.curve, 10 * this.scaleFactor);

        drawCurve(context, this.curve,
            new LineStyle('#d4a373', 45 * this.scaleFactor, true, 2 * this.scaleFactor, '#B7BF9C', 5 * this.scaleFactor, 5 * this.scaleFactor));
        for (let i: number = 1; i < negativeOffset.length; i++) {
            if (i % (Math.floor(20 * this.scaleFactor)) === 0) {
                drawCurve(context, [negativeOffset[i], positiveOffset[i]],
                    new LineStyle('#faedcd', 10 * this.scaleFactor, true, 2 * this.scaleFactor, '#4a4e69', 1 * this.scaleFactor, 1 * this.scaleFactor));
            }
        }
        drawCurve(context, negativeOffset,
            new LineStyle('#432818', 5 * this.scaleFactor, true, 2 * this.scaleFactor, '#4a4e69', 1 * this.scaleFactor, 1 * this.scaleFactor));
        drawCurve(context, positiveOffset,
            new LineStyle('#432818', 5 * this.scaleFactor, true, 2 * this.scaleFactor, '#4a4e69', 1 * this.scaleFactor, 1 * this.scaleFactor));
        this.isAwaitingRedraw = false;
    }

    setScaleFactor(newScaleFactor: number) {
        this.scaleFactor = newScaleFactor;
        this.splineBasePoints.forEach((item) => {
            item.setScaleFactor(newScaleFactor);
        });
    }

    handlePointerDown(pointerPosition: Point) {
        for (let dragItem of this.splineBasePoints) {
            if (dragItem.center.distanceTo(pointerPosition) < 70)
            {
                this.activeDragPoint.push(dragItem);
                // new DragItem(dragItem.center, this.scaleFactor).
            }
        }
    }

    handlePointerUp(pointerPosition: Point) {
        if (this.isBeingDragged())
        {
            this.interpolate();
            this.activeDragPoint.pop();
        }
    }

    handlePointerPressedMove(pointerPosition: Point) {
        if (this.activeDragPoint.length == 1)
            this.activeDragPoint[0].center = pointerPosition;
    }

    isBeingDragged() {
        return this.activeDragPoint.length != 0;
    }
}

function drawCurve(context: CanvasRenderingContext2D, curve: number[][], style: LineStyle) {
    let i: number;
    let point = curve.at(1) as number[];

    context.beginPath();
    context.moveTo(point[0], point[1])
    for (i = 0; i < curve.length; i++) {
        let point = curve.at(i) as number[];
        context.lineTo(point[0], point[1]);
    }
    context.strokeStyle = style.strokeStype;
    context.lineWidth = style.lineWidth;
    if (style.hasShadow) {
        context.shadowBlur = style.shadowBlur as number;
        context.shadowColor = style.shadowColor as string;
        context.shadowOffsetY = style.shadowOffsetY as number;
        context.shadowOffsetX = style.shadowOffsetX as number;
    } else {
        context.shadowBlur = 0;
        context.shadowOffsetY = 0;
        context.shadowOffsetX = 0;
    }
    context.stroke();
}