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
                private canvas: HTMLCanvasElement) {
    }

    draw(context: CanvasRenderingContext2D){
        const radius = 70;
        context.beginPath();
        context.arc(this.center.x, this.center.y, radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'green';
        context.fill();
        context.lineWidth = 5;
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
    drawTile(context, 600, 1200, "C++");
    drawTile(context, 1300, 1800, "Python");
}

export class Rails{
    interpolator: CurveInterpolator;
    curve: number[][];
    scalefactor: number = 0;

    constructor(points: number[][], scalefactor: number) {
        let tmp = JSON.parse(JSON.stringify(points)) as number[][];
        this.scalefactor = scalefactor;
        tmp.forEach((point) => {
            point[0] *= this.scalefactor;
            point[1] *= this.scalefactor;
        });
        this.interpolator = new CurveInterpolator(tmp, {tension: -.75});
        this.curve = this.interpolator.getPoints(this.interpolator.length);
    }

    pxToNormalized(px: number): number{
        return px / this.interpolator.length;
    }

    public getInterpolatedTrainPosition(normalizedInput: number): Point{
        if (normalizedInput < 0 || normalizedInput > 1)
            throw new Error("input from zero to one expected")
        let tmp = this.interpolator.getPointAt(normalizedInput) as number[];

        return new Point(tmp[0], tmp[1]);
    }

    public draw(context: CanvasRenderingContext2D): void{
        let negativeOffset = generateOffsetCurveNegative(this.curve, 10 * this.scalefactor);
        let positiveOffset = generateOffsetCurvePositive(this.curve, 10 * this.scalefactor);

        drawCurve(context, this.curve,
            new LineStyle('#d4a373', 45 * this.scalefactor, true, 2 * this.scalefactor, '#B7BF9C', 5 * this.scalefactor, 5 * this.scalefactor));
        for (let i: number = 1; i < negativeOffset.length; i++) {
            if (i % (Math.floor(20 * this.scalefactor)) === 0){
                drawCurve(context, [negativeOffset[i], positiveOffset[i]],
                    new LineStyle('#faedcd', 10 * this.scalefactor, true, 2 * this.scalefactor, '#4a4e69', 1 * this.scalefactor, 1 * this.scalefactor));
            }
        }
        drawCurve(context, negativeOffset,
            new LineStyle('#432818', 5 * this.scalefactor, true, 2 * this.scalefactor, '#4a4e69', 1 * this.scalefactor, 1 * this.scalefactor));
        drawCurve(context, positiveOffset,
            new LineStyle('#432818', 5 * this.scalefactor, true, 2 * this.scalefactor, '#4a4e69', 1 * this.scalefactor, 1 * this.scalefactor));
    }

    setScaleFactor(scalefactor: number) {
        this.scalefactor = scalefactor;
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