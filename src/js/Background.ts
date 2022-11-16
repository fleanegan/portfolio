import {CurveInterpolator} from 'curve-interpolator';
import {generateOffsetCurveNegative, generateOffsetCurvePositive, Point} from "./mathUtils";
import {Scaler} from "./utils";
import {Direction} from "./Locomotive";
import {GameObject} from "./GameObject";

type Style = {
    strokeColor: string;
    fillColor: string;
    lineWidth: number;
    shadowBlur?: number;
    shadowColor?: string;
    shadowOffsetY?: number;
    shadowOffsetX?: number;
}

enum HighlightMode {
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

export class ContentTile extends GameObject {
    private dragTarget: DragItem;
    private height: number = 350;
    private width: number = 390;

    constructor(private upperLeft: Point, private title: string) {
        super(upperLeft);
        let relativeDragTargetPosition = new Point(upperLeft.x + 300, upperLeft.y + 125);
        this.dragTarget = new DragItem(relativeDragTargetPosition,
            {strokeColor: '#ffffff', fillColor: '#ffffff', lineWidth: 5},
            {strokeColor: '#ff0000', fillColor: '#ffffff', lineWidth: 5},
            {
                strokeColor: '#ff0000',
                fillColor: '#ff0000',
                lineWidth: 5,
                shadowBlur: 10,
                shadowColor: '#ff0000',
                shadowOffsetX: 0,
                shadowOffsetY: 0
            })
        ;
    }

    setHightlightMode(targetMode: HighlightMode) {
        this.dragTarget.isHightlighted = targetMode;
    }

    getDragTargetCenter(): Point {
        return this.dragTarget.center;
    }

    draw(context: CanvasRenderingContext2D) {
        context.shadowBlur = 0;
        this.dragTarget.draw(context);
        context.shadowBlur = 0;
        context.shadowOffsetY = 0;
        context.shadowOffsetX = 0;
        context.beginPath();
        context.fillStyle = '#ffffff';
        context.strokeStyle = '#ffffff';
        context.lineWidth = 4;
        context.font = "60px Arial";
        context.fillText(this.title, this.center.x, this.center.y - 115);
        context.font = "30px Arial";
        context.fillText("link zu coolem git repo 1", this.center.x, this.center.y);
        context.fillText("link zu coolem git repo 2", this.center.x, this.center.y + 45);
        context.strokeRect(this.center.x - 200 + 202, this.center.y + 425 - 525, 325, 2);
        context.shadowBlur = 5;
        context.shadowColor = '#ffffff';
        context.shadowOffsetY = 2;
        context.shadowOffsetX = 2;
        context.strokeRect(this.center.x - 200 + 175, this.center.y + 425 - 600, this.width, this.height);
        context.stroke();
        context.shadowBlur = 0;
        context.shadowOffsetY = 0;
        context.shadowOffsetX = 0;
    }
}

export function drawBackground(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    context.fillStyle = '#ccd5ae'
    context.beginPath();
    context.fillRect(0, 0, canvas.width + window.screen.width, canvas.height + window.screen.height);
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

    getInterpolatedTrainPosition(normalizedInput: number): Point {
        if (normalizedInput < 0 || normalizedInput > 1)
            throw new Error("input from zero to one expected, got " + normalizedInput)
        let tmp = this.interpolator.getPointAt(normalizedInput) as number[];

        return new Point(tmp[0], tmp[1]);
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

export class InteractiveBackground {
    private splineBasePoints: DragItem[] = [];
    private shouldRedrawRails: boolean;
    private activeDragPoint: DragItem[] = [];
    targets: ContentTile[];
    path: Path;
    autopilotDestination: Point | null = null;

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
        this.updatePath();
        this.targets = [new ContentTile(new Point(125, 800), "Content 1"), new ContentTile(new Point(1400, 200), "Content 2")];
    }

    private updatePath() {
        let tmp: number[][] = [];
        for (const splineBasePoint of this.splineBasePoints) {
            splineBasePoint.updateZoom();
            tmp.push(splineBasePoint.center.toArr());
        }
        this.path.interpolate(tmp);
        this.shouldRedrawRails = true;
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
        if (this.isPathDragged()) {
            this.splineBasePoints.forEach((item) => {
                item.draw(context);
            });
            this.targets.forEach((target) => {
                target.draw(context);
            });
        }
    }

    private drawRails(context: CanvasRenderingContext2D) {
        let scaleFactor = Scaler.x(1);
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
        this.targets.forEach((target) => {
            target.draw(context);
        });
    }

    updateZoom() {
        this.splineBasePoints.forEach((item) => {
            item.updateZoom();
        });
        this.targets.forEach((target) => {
            target.updateZoom();
        })
        this.updatePath();
    }

    handlePointerDown(pointerPosition: Point) {
        this.selectBasePointToDrag(pointerPosition);
    }

    handlePointerUp(pointerPosition: Point) {
        if (this.isNearTarget(pointerPosition)) {
            this.autoRouteClosestSplineBaseIntoClickedTarget(pointerPosition);
            this.updatePath();
        }
        if (this.isPathDragged()) {
            this.updatePath();
            this.setTargetHightlightMode(HighlightMode.None);
            this.autopilotToSelectedTarget(pointerPosition);
            this.activeDragPoint.pop();
            this.printBasePointCoordinates();
        }
    }

    handlePointerPressedMove(pointerPosition: Point) {
        if (this.isPathDragged()) {
            if (this.isTouchingAnotherSplineBasePoint(pointerPosition))
                return;
            this.setTargetHightlightMode(HighlightMode.Light);
            this.snapPointerToTargetIfNear(pointerPosition);
        }
    }

    private autopilotToSelectedTarget(pointerPosition: Point) {
        const target: ContentTile[] = this.getTargetsUnderPointer(pointerPosition);
        if (target.length != 0)
            this.autopilotDestination = target[0].getDragTargetCenter();
    }

    private autoRouteClosestSplineBaseIntoClickedTarget(pointerPosition: Point) {
        let nearestBasePoint = this.splineBasePoints[0];
        let shortestDistance = Number.MAX_SAFE_INTEGER;
        const targets: ContentTile[] = this.getTargetsUnderPointer(pointerPosition);

        if (targets.length != 0) {
            this.splineBasePoints.forEach((basePoint) => {
                let distanceToTarget = basePoint.center.distanceTo(targets[0].getDragTargetCenter());

                if (distanceToTarget < shortestDistance) {
                    nearestBasePoint = basePoint;
                    shortestDistance = distanceToTarget;
                }
            })
            nearestBasePoint.setCenter(targets[0].getDragTargetCenter());
            this.autopilotDestination = targets[0].getDragTargetCenter();
        }
    }

    private selectBasePointToDrag(pointerPosition: Point) {
        for (let dragItem of this.splineBasePoints) {
            if (dragItem.center.distanceTo(pointerPosition) < DragItem.radius)
                this.activeDragPoint.push(dragItem);
        }
    }

    private setTargetHightlightMode(highlightMode: HighlightMode) {
        this.targets.forEach((target) => {
            target.setHightlightMode(highlightMode);
        });
    }

    private printBasePointCoordinates() {
        let print: string = "[";
        this.path.basePoints.forEach((basePoint) => {
            print += '[' + basePoint[0] / Scaler.x(1) + ', ' + basePoint[1] / Scaler.y(1) + '],';
        })
        print += "]";
        console.log(print);
    }

    private snapPointerToTargetIfNear(pointerPosition: Point) {
        this.getTargetsUnderPointer(pointerPosition).forEach((target) => {
            pointerPosition = target.getDragTargetCenter();
            target.setHightlightMode(HighlightMode.Full);
        });
        this.activeDragPoint[0].setCenter(pointerPosition);
        return pointerPosition;
    }

    private getTargetsUnderPointer(pointerPosition: Point): ContentTile[] {
        for (const target of this.targets) {
            const distance = target.getDragTargetCenter().distanceTo(pointerPosition);
            if (distance < DragItem.radius * 2) {
                return [target];
            }
        }
        return [];
    }

    private isTouchingAnotherSplineBasePoint(pointerPosition: Point) {
        for (const splineBasePoint of this.splineBasePoints) {
            const oldDistance = splineBasePoint.center.distanceTo(this.activeDragPoint[0].center);
            const newDistance = splineBasePoint.center.distanceTo(pointerPosition);
            if (oldDistance > 0 && newDistance < DragItem.radius * 2.5)
                return true;
        }
        return false;
    }

    isPathDragged() {
        let result: boolean = this.activeDragPoint.length != 0;
        return result;
    }

    isNearTarget(point: Point): boolean {
        return this.getTargetsUnderPointer(point).length != 0;
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