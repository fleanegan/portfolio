import {CurveInterpolator} from 'curve-interpolator';
import {generateOffsetCurveNegative, generateOffsetCurvePositive, Point} from "./mathUtils";
import {Scaler} from "./utils";

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
    radius: number = 32;
    unScaledCenter: Point;

    constructor(public center: Point) {
        this.unScaledCenter = new Point(center.x / Scaler.x(1), center.y / Scaler.y(1));
    }

    setCenter(newCenter: Point) {
        this.center = newCenter;
        this.center.x;
        this.center.y;
        this.unScaledCenter.x = newCenter.x / Scaler.x(1);
        this.unScaledCenter.y = newCenter.y / Scaler.y(1);
    }

    updateZoom() {
        this.center.x = Scaler.x(this.unScaledCenter.x);
        this.center.y = Scaler.y(this.unScaledCenter.y);
    }

    draw(context: CanvasRenderingContext2D) {
        const radius = this.radius;
        context.beginPath();
        context.globalAlpha = 0.5;
        context.arc(this.center.x, this.center.y, radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'white';
        context.fill();
        context.lineWidth = 5;
        context.globalAlpha = 1;
        context.strokeStyle = '#003300';
        context.stroke();
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
    drawTile(context, 300, 300, "C++");
    drawTile(context, 1300, 1800, "Python");
}

export class Rails {
    interpolator: CurveInterpolator;
    curve: number[][];
    private splineBasePoints: DragItem[] = [];
    private shouldRedrawRails: boolean;
    private activeDragPoint: DragItem[] = [];
    private shouldRedrawDragPoints: boolean = false;

    constructor(points: number[][]) {
        points.forEach((point) => {
            const x = point[0];
            const y = point[1];
            this.splineBasePoints.push(new DragItem(new Point(x, y)));
        });
        this.interpolate();
    }

    private interpolate() {
        let tmp: number[][] = [];
        for (const splineBasePoint of this.splineBasePoints) {
            splineBasePoint.updateZoom();
            tmp.push(splineBasePoint.center.toArr());
        }
        this.interpolator = new CurveInterpolator(tmp, {tension: -.75});
        this.curve = this.interpolator.getPoints(this.interpolator.length);
        this.shouldRedrawRails = true;
    }

    pxToNormalized(px: number): number {
        return px / this.interpolator.length;
    }

    public getInterpolatedTrainPosition(normalizedInput: number): Point {
        if (normalizedInput < 0 || normalizedInput > 1)
            throw new Error("input from zero to one expected, got " + normalizedInput)
        let tmp = this.interpolator.getPointAt(normalizedInput) as number[];

        return new Point(tmp[0], tmp[1]);
    }

    public reDraw(context: CanvasRenderingContext2D): void {
        this.drawRails(context);
        this.splineBasePoints.forEach((item) => {
            item.draw(context);
        });
    }

    public draw(context: CanvasRenderingContext2D): void {
        if (this.shouldRedrawRails)
            this.drawRails(context);
        if (this.shouldRedrawDragPoints)
            this.splineBasePoints.forEach((item) => {
                item.draw(context);
            });
    }

    private drawRails(context: CanvasRenderingContext2D) {
        let scaleFactor = Scaler.x(1);
        let negativeOffset = generateOffsetCurveNegative(this.curve, 10 * scaleFactor);
        let positiveOffset = generateOffsetCurvePositive(this.curve, 10 * scaleFactor);

        drawCurve(context, this.curve,
            new LineStyle('#d4a373', 45 * scaleFactor, true, 2 * scaleFactor, '#B7BF9C', 5 * scaleFactor, 5 * scaleFactor));
        for (let i: number = 1; i < negativeOffset.length; i++) {
            if (i % (Math.floor(20 * scaleFactor)) === 0) {
                drawCurve(context, [negativeOffset[i], positiveOffset[i]],
                    new LineStyle('#faedcd', 10 * scaleFactor, true, 2 * scaleFactor, '#4a4e69', 1 * scaleFactor, 1 * scaleFactor));
            }
        }
        drawCurve(context, negativeOffset,
            new LineStyle('#432818', 5 * scaleFactor, true, 2 * scaleFactor, '#4a4e69', 1 * scaleFactor, 1 * scaleFactor));
        drawCurve(context, positiveOffset,
            new LineStyle('#432818', 5 * scaleFactor, true, 2 * scaleFactor, '#4a4e69', 1 * scaleFactor, 1 * scaleFactor));
        this.shouldRedrawRails = false;
    }

    updateZoom() {
        this.splineBasePoints.forEach((item) => {
            item.updateZoom();
        });
        this.interpolate();
    }

    handlePointerDown(pointerPosition: Point) {
        for (let dragItem of this.splineBasePoints) {
            if (dragItem.center.distanceTo(pointerPosition) < this.splineBasePoints[0].radius) {
                this.activeDragPoint.push(dragItem);
                this.shouldRedrawDragPoints = true;
            }
        }
    }

    handlePointerUp(pointerPosition: Point) {
        if (this.isBeingDragged()) {
            this.interpolate();
            this.activeDragPoint.pop();
            this.shouldRedrawDragPoints = false;
        }
    }

    handlePointerPressedMove(pointerPosition: Point) {
        if (this.activeDragPoint.length == 1) {
            for (const splineBasePoint of this.splineBasePoints) {
                const oldDistance = splineBasePoint.center.distanceTo(this.activeDragPoint[0].center);
                const newDistance = splineBasePoint.center.distanceTo(pointerPosition);
                if (oldDistance > 0 && newDistance < this.activeDragPoint[0].radius * 2.5)
                    return;
            }
            this.activeDragPoint[0].setCenter(pointerPosition);
        }
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