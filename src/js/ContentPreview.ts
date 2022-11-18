import {DragItem, HighlightMode} from "./Background";
import {Point} from "./mathUtils";
import {GameObject} from "./GameObject";
import icon from "../../assets/contentShape.png";
import {Scaler} from "./utils";

enum ReferencePointMode {
    LowerLeft,
    UpperLeft,
    LowerRight,
    UpperRight,
    Middle,
}

export class ContentPreview{
    targets: ContentTile[];

    constructor() {
        this.targets = [
            new ContentTile(new Point(Scaler.x(64), window.innerHeight), "Content 1", ReferencePointMode.LowerLeft),
            new ContentTile(new Point(window.innerWidth - Scaler.x(128), 0), "Content 2", ReferencePointMode.UpperRight),
        new ContentTile(new Point(window.innerWidth / 2 - Scaler.x(128), window.innerHeight * 0.5), "Content 2", ReferencePointMode.UpperLeft)];
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
    private height: number = 350;
    private width: number = 390;
    private img: HTMLImageElement;
    private scaleFactor: number = 1;

    constructor(rawCenter: Point, private title: string, private referencePointMode?: ReferencePointMode) {
        let height = 350;
        let width = 390;
        if (referencePointMode === ReferencePointMode.LowerLeft){
            rawCenter.y -= Scaler.y(height);
        }
        if (referencePointMode === ReferencePointMode.UpperRight){
            rawCenter.x -= Scaler.x(width);
        }
        super(rawCenter);
        this.img = new Image();
        this.img.src = icon;
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
        const maxSize = 512;
        const calculatedFactor = Math.min(Scaler.x(1), Scaler.y(1));

        if (this.width * calculatedFactor < minSize)
            this.scaleFactor = minSize / this.height;
        else if (this.width * calculatedFactor > maxSize)
            this.scaleFactor = maxSize / this.height;
        else
            this.scaleFactor = calculatedFactor;
        this.moveIntoVisibleCanvas();
        this.dragTarget.setCenter(new Point(this.center.x + this.width * this.scaleFactor * 0.85, this.center.y + this.height * this.scaleFactor * 0.85));
    }

    private moveIntoVisibleCanvas() {
        while (this.center.x + this.width * this.scaleFactor > window.innerWidth)
            this.center.x--;
        while (this.center.x < 0)
            this.center.x++;
        while (this.center.y + this.height * this.scaleFactor > window.innerHeight)
            this.center.y--;
        while (this.center.y < 0)
            this.center.y++;
    }

    async draw(context: CanvasRenderingContext2D) {
        const x = this.center.x - this.scaleFactor * 512 / 10;
        const y = this.center.y - this.scaleFactor * 512 / 7;
        const w = this.scaleFactor * 512;
        const h = this.scaleFactor * 512;
        this.dragTarget.draw(context);
        await new Promise(r => {
            this.img.onload = r;
            this.img.src = icon;
        });
        context.drawImage(this.img, x, y, w, h);
    }
}
