import {CurveInterpolator} from 'curve-interpolator';
import {generateOffsetCurveNegative, generateOffsetCurvePositive, Point} from "./mathUtils";
import {Scaler} from "./utils";
import {GameObject} from "./GameObject";

export type Style = {
    strokeColor: string;
    fillColor: string;
    lineWidth: number;
    shadowBlur?: number;
    shadowColor?: string;
    shadowOffsetY?: number;
    shadowOffsetX?: number;
}

export enum HighlightMode {
    None,
    Light,
    Full
}

export class DragItem extends GameObject {
    static radius: number = 32;
    public isHightlighted: HighlightMode = HighlightMode.None;

    constructor(center: Point, private normalStyle: Style, private hightlightStyle?: Style, private highlightStyle2?: Style) {
        super(center);
    }

    draw(context: CanvasRenderingContext2D) {
        const radius = DragItem.radius;
        const style = this.getStyle();

        context.beginPath();
        context.shadowBlur = 0;
        context.globalAlpha = 0.5;
        context.arc(this.center.x, this.center.y, radius, 0, 2 * Math.PI, false);
        context.fillStyle = style.fillColor;
        context.fill();
        context.lineWidth = style.lineWidth;
        context.globalAlpha = 1;
        context.strokeStyle = style.strokeColor;
        context.stroke();
    }

    private getStyle(): Style {
        if (this.isHightlighted == HighlightMode.Light)
            return this.hightlightStyle;
        else if (this.isHightlighted == HighlightMode.Full)
            return this.highlightStyle2;
        return this.normalStyle;
    }
}

export function drawBackground(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    context.fillStyle = '#ccd5ae'
    context.beginPath();
    context.fillRect(0, 0, canvas.width + window.innerWidth, canvas.height + window.innerHeight);
    context.stroke();
}

export class Path {
    interpolator: CurveInterpolator;
    points: number[][];
    basePoints: number[][];

    constructor() {
    }

    pxToNormalized(px: number): number {
        return px / this.interpolator.length;
    }

    interpolate(basePoints: number[][]) {
        this.basePoints = basePoints;
        this.interpolator = new CurveInterpolator(basePoints, {tension: 0, closed: true});
        this.points = this.interpolator.getPoints(this.interpolator.length);
    }

    getPoints(): number[][] {
        return this.points;
    }
}

export class Rails {
    splineBasePoints: DragItem[] = [];
    path: Path;
    shouldRedrawRails: boolean;
    shouldRedrawDraggable: boolean = false;

    constructor(points: number[][]) {
        points.forEach((point) => {
            const x = Scaler.x(point[0]);
            const y = Scaler.y(point[1]);
            this.splineBasePoints.push(new DragItem(new Point(x, y), {
                strokeColor: '#ffffff',
                fillColor: '#ffffff',
                lineWidth: 5
            }));
        });
        this.path = new Path();
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
        if (this.shouldRedrawDraggable) {
            this.splineBasePoints.forEach((item) => {
                item.draw(context);
            });
        }
    }

    private drawRails(context: CanvasRenderingContext2D) {
        let scaleFactor = Scaler.xLimited(1);
        let negativeOffset = generateOffsetCurveNegative(this.path.getPoints(), 10 * scaleFactor);
        let positiveOffset = generateOffsetCurvePositive(this.path.getPoints(), 10 * scaleFactor);

        drawCurve(context, this.path.getPoints(),
            {
                strokeColor: '#d4a373',
                fillColor: '#ffffff',
                lineWidth: 45 * scaleFactor,
                shadowBlur: 2 * scaleFactor,
                shadowColor: '#B7BF9C',
                shadowOffsetX: 5 * scaleFactor,
                shadowOffsetY: 5 * scaleFactor
            });
        for (let i: number = 1; i < negativeOffset.length; i++) {
            if (i % (Math.floor(20 * scaleFactor)) === 0) {
                drawCurve(context, [negativeOffset[i], positiveOffset[i]],
                    {
                        strokeColor: '#faedcd',
                        fillColor: '#ffffff',
                        lineWidth: 10 * scaleFactor,
                        shadowBlur: 2 * scaleFactor,
                        shadowColor: '#4a4e69',
                        shadowOffsetX: 1 * scaleFactor,
                        shadowOffsetY: 1 * scaleFactor
                    });
            }
        }
        drawCurve(context, negativeOffset,
            {
                strokeColor: '#432818',
                fillColor: '#ffffff',
                lineWidth: 5 * scaleFactor,
                shadowBlur: 2 * scaleFactor,
                shadowColor: '#4a4e69',
                shadowOffsetX: 1 * scaleFactor,
                shadowOffsetY: 1 * scaleFactor
            });
        drawCurve(context, positiveOffset,
            {
                strokeColor: '#432818',
                fillColor: '#ffffff',
                lineWidth: 5 * scaleFactor,
                shadowBlur: 2 * scaleFactor,
                shadowColor: '#4a4e69',
                shadowOffsetX: 1 * scaleFactor,
                shadowOffsetY: 1 * scaleFactor
            });
        this.shouldRedrawRails = false;
    }
}

function drawCurve(context: CanvasRenderingContext2D, curve: number[][], style: Style) {
    let i: number;
    let point = curve.at(1) as number[];

    context.beginPath();
    context.moveTo(point[0], point[1])
    for (i = 0; i < curve.length; i++) {
        let point = curve.at(i) as number[];
        context.lineTo(point[0], point[1]);
    }
    context.strokeStyle = style.strokeColor;
    context.lineWidth = style.lineWidth;
    if (style.shadowBlur) {
        context.shadowBlur = style.shadowBlur as number;
        context.shadowColor = style.shadowColor as string;
        context.shadowOffsetY = style.shadowOffsetY as number;
        context.shadowOffsetX = style.shadowOffsetX as number;
    } else {
        context.shadowBlur = 0;
        context.shadowOffsetY = 0;
        context.shadowOffsetX = 0;
    }
    context.closePath();
    context.stroke();
}