import {DragItem, HighlightMode} from "./Background";
import {Point} from "./mathUtils";
import {GameObject} from "./GameObject";
import iconMaschinenbau from "../../assets/maschinenbau.png";
import iconInformatics from "../../assets/informatics.png";
import iconBricolage from "../../assets/bricolage.png";
import {Scaler} from "./utils";

enum ReferencePointMode {
    LowerLeft,
    UpperLeft,
    UpperRight,
}

export class ContentPreview{
    targets: ContentTile[];

    constructor() {
        this.targets = [
            new ContentTile(new Point(Scaler.x(ContentTile.radius / 4), Scaler.getHeight() - Scaler.y(ContentTile.radius / 4)), iconBricolage, ReferencePointMode.LowerLeft),
            new ContentTile(new Point(Scaler.getWidth() / 2 - Scaler.x(ContentTile.radius / 2), Scaler.y(ContentTile.radius / 2)), iconInformatics, ReferencePointMode.UpperRight),
        new ContentTile(new Point(Scaler.getWidth() / 1.3 - Scaler.x(ContentTile.radius / 2), Scaler.getHeight() * 0.5), iconMaschinenbau, ReferencePointMode.UpperLeft)];
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

    drawTargets(context: CanvasRenderingContext2D) {
        this.targets.forEach((target) => {
            target.dragTarget.draw(context);
        });
    }
}

export class ContentTile extends GameObject {
    dragTarget: DragItem;
    static radius: number = 400;
    private img: HTMLImageElement;
    private scaleFactor: number = 1;

    constructor(rawCenter: Point, private imgSrc: any, private referencePointMode?: ReferencePointMode) {
        if (referencePointMode === ReferencePointMode.LowerLeft){
            rawCenter.y -= Scaler.y(ContentTile.radius);
        }
        if (referencePointMode === ReferencePointMode.UpperRight){
            rawCenter.x -= Scaler.x(ContentTile.radius);
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
        const minSize = 128;
        const maxSize = 768;
        const calculatedFactor = Math.min(Scaler.x(1), Scaler.y(1));

        if (ContentTile.radius * calculatedFactor < minSize)
            this.scaleFactor = minSize / ContentTile.radius;
        else if (ContentTile.radius * calculatedFactor > maxSize)
            this.scaleFactor = maxSize / ContentTile.radius;
        else
            this.scaleFactor = calculatedFactor;
        this.moveIntoVisibleCanvas();
        this.dragTarget.setCenter(
            new Point(
                this.center.x + ContentTile.radius * this.scaleFactor * 0.175,
                this.center.y + ContentTile.radius * this.scaleFactor * 0.375
            )
        );
    }

    private moveIntoVisibleCanvas() {
        while (this.center.x + ContentTile.radius * this.scaleFactor > Scaler.getWidth())
            this.center.x--;
        while (this.center.x < 0)
            this.center.x++;
        while (this.center.y + ContentTile.radius * this.scaleFactor > Scaler.getHeight())
            this.center.y--;
        while (this.center.y < 0)
            this.center.y++;
    }

    async draw(context: CanvasRenderingContext2D) {
        const x = this.center.x;
        const y = this.center.y;
        const w = this.scaleFactor * ContentTile.radius;
        const h = this.scaleFactor * ContentTile.radius;
        this.dragTarget.draw(context);
        await new Promise(r => {
            this.img.onload = r;
            this.img.src = this.imgSrc;
        });
        context.drawImage(this.img, x, y, w, h);
    }
}
