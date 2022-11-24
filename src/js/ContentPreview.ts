import {DragItem, HighlightMode} from "./Background";
import {Point} from "./mathUtils";
import {GameObject} from "./GameObject";
import iconMaschinenbau from "../../assets/maschinenbau.png";
import iconInformatics from "../../assets/informatics.png";
import iconBricolage from "../../assets/bricolage.png";
import contentMechanicalEngineering from "../html/maschinenbau.html"
import contentLampBuilding from "../html/bricolage.html"
import contentProgramming from "../html/informatics.html"
import {Scaler} from "./utils";

enum ReferencePointMode {
    LowerLeft,
    UpperLeft,
    UpperRight,
}

export class ContentPreview {
    targets: ContentTile[];

    constructor() {
        this.targets = [
            new ContentTile(new Point(Scaler.x(ContentTile.diameter / 4), Scaler.getHeight() - Scaler.y(ContentTile.diameter / 4)), iconBricolage, contentLampBuilding, ReferencePointMode.LowerLeft),
            new ContentTile(new Point(Scaler.getWidth() / 1.5 - Scaler.x(ContentTile.diameter / 2), Scaler.y(ContentTile.diameter / 2)), iconInformatics, contentProgramming, ReferencePointMode.UpperRight),
            new ContentTile(new Point(Scaler.getWidth() / 1.3 - Scaler.x(ContentTile.diameter / 2), Scaler.getHeight() * 0.5), iconMaschinenbau, contentMechanicalEngineering, ReferencePointMode.UpperLeft)];
    }

    async draw(context: CanvasRenderingContext2D) {
        for (const target of this.targets) {
            await target.draw(context);
        }
    }

    updateZoom() {
        this.targets.forEach((target) => {
            target.updateZoom();
        });
    }

    setTargetHightlightMode(highlightMode: HighlightMode) {
        this.targets.forEach((target) => {
            target.setHightlightMode(highlightMode);
        });
    }

    getTargetsUnderPointer(pointerPosition: Point): ContentTile[] {
        for (const target of this.targets) {
            const distance = target.getDragTargetCenter().distanceTo(pointerPosition);
            if (distance < DragItem.radius * 2) {
                return [target];
            }
        }
        return [];
    }

    getTileUnderPointer(pointerPosition: Point): ContentTile[] {
        for (const target of this.targets) {
            if (target.isPointOnTile(pointerPosition)) {
                return [target];
            }
        }
        return [];
    }

    drawTargets(context: CanvasRenderingContext2D) {
        this.targets.forEach((target) => {
            target.dragTarget.draw(context);
        });
    }
}

export class ContentTile extends GameObject {
    dragTarget: DragItem;
    static diameter: number = 400;
    static minDiameter: number = 128;
    static maxDiameter: number = 768;
    private img: HTMLImageElement;
    private scaleFactor: number = 1;

    constructor(rawCenter: Point, private imgSrc: any, private contentHtml: string, private referencePointMode?: ReferencePointMode) {
        if (referencePointMode === ReferencePointMode.LowerLeft) {
            rawCenter.y -= Scaler.y(ContentTile.diameter);
        }
        if (referencePointMode === ReferencePointMode.UpperRight) {
            rawCenter.x -= Scaler.x(ContentTile.diameter);
        }
        super(rawCenter);
        this.img = new Image();
        this.img.src = imgSrc;
        let relativeDragTargetPosition = new Point(0, 0);
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
            });
        this.updateZoom();
    }

    setHightlightMode(targetMode: HighlightMode) {
        this.dragTarget.isHightlighted = targetMode;
    }

    getDragTargetCenter(): Point {
        return this.dragTarget.center;
    }

    updateZoom() {
        super.updateZoom();
        this.scaleFactor = ContentTile.calculateScaleFactor()
        this.moveIntoVisibleCanvas();
        this.dragTarget.setCenter(
            new Point(
                this.center.x + ContentTile.diameter * this.scaleFactor * 0.175,
                this.center.y + ContentTile.diameter * this.scaleFactor * 0.375
            )
        );
    }

    static calculateScaleFactor() {
        const calculatedFactor = Math.min(Scaler.x(1), Scaler.y(1));
        let result;

        if (ContentTile.diameter * calculatedFactor < ContentTile.minDiameter)
            result = ContentTile.minDiameter / ContentTile.diameter;
        else if (ContentTile.diameter * calculatedFactor > ContentTile.maxDiameter)
            result = ContentTile.maxDiameter / ContentTile.diameter;
        else
            result = calculatedFactor;
        return result;
    }

    isPointOnTile(point: Point) {
        let circleCenter: Point = new Point(
            this.center.x + ContentTile.diameter * this.scaleFactor / 2,
            this.center.y + ContentTile.diameter * this.scaleFactor / 2
        );

        return circleCenter.distanceTo(point) < this.scaleFactor * ContentTile.diameter / 2;
    }

    private moveIntoVisibleCanvas() {
        while (this.center.x + ContentTile.diameter * this.scaleFactor > Scaler.getWidth())
            this.center.x--;
        while (this.center.x < 0)
            this.center.x++;
        while (this.center.y + ContentTile.diameter * this.scaleFactor > Scaler.getHeight())
            this.center.y--;
        while (this.center.y < 0)
            this.center.y++;
    }

    async draw(context: CanvasRenderingContext2D) {
        const x = this.center.x;
        const y = this.center.y;
        const w = this.scaleFactor * ContentTile.diameter;
        const h = this.scaleFactor * ContentTile.diameter;
        this.dragTarget.draw(context);
        await new Promise(r => {
            this.img.onload = r;
            this.img.src = this.imgSrc;
        });
        context.drawImage(this.img, x, y, w, h);
    }

    getContent() {
        return this.contentHtml;
    }
}
