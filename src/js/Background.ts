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


export function drawBackground(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    context.fillStyle = '#ccd5ae'
    context.beginPath();
    context.fillRect(0, 0, canvas.width + window.screen.width, canvas.height + window.screen.height);
    context.stroke();
}

export class Rails{
    interpolator: CurveInterpolator;
    curve: number[][];
    scalefactor: number = 0;

    constructor(points: number[][], scalefactor: number) {
        this.scalefactor = scalefactor;
        points.forEach((point) => {
            point[0] *= this.scalefactor;
            point[1] *= this.scalefactor;
        });
        this.interpolator = new CurveInterpolator(points, {tension: -.75});
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