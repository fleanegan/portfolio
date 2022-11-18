import {DragItem, HighlightMode} from "./Background";
import {Point} from "./mathUtils";
import {GameObject} from "./GameObject";
import icon from "../../assets/contentShape.png";
import {Scaler} from "./utils";

export class ContentPreview{
    targets: ContentTile[];

    constructor() {
        this.targets = [new ContentTile(new Point(125, 800), "Content 1"), new ContentTile(new Point(1400, 200), "Content 2")];
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
        console.log("redrawing context");
    }
}

export class ContentTile extends GameObject {
    dragTarget: DragItem;
    private height: number = 350;
    private width: number = 390;
    private img: HTMLImageElement;

    constructor(private upperLeft: Point, private title: string) {
        super(upperLeft);
        this.img = new Image();
        this.img.src = icon;
        let relativeDragTargetPosition = new Point(this.center.x + Scaler.x(this.width) * 0.85, this.center.y + Scaler.y(this.height) * 0.85);
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
        console.log("set hightlight to " + targetMode);
    }

    getDragTargetCenter(): Point {
        return this.dragTarget.center;
    }

    updateZoom() {
        super.updateZoom();
        this.dragTarget.setCenter(new Point(this.center.x + Scaler.x(this.width) * 0.85, this.center.y + Scaler.y(this.height) * 0.85));
    }

    async draw(context: CanvasRenderingContext2D) {
        const x = this.center.x - Scaler.x(512) / 10;
        const y = this.center.y - Scaler.y(512) / 7;
        const w = Scaler.x(512);
        const h = Scaler.y(512);
        this.dragTarget.draw(context);
        await new Promise(r => {
            this.img.onload = r;
            this.img.src = icon;
        });
        context.drawImage(this.img, x, y, w, h);
    }
}
