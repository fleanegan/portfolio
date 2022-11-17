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

    draw(context: CanvasRenderingContext2D){
        this.targets.forEach((target) => {
            target.draw(context);
        });
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
}

export class ContentTile extends GameObject {
    private dragTarget: DragItem;
    private height: number = 350;
    private width: number = 390;
    private img: HTMLImageElement;

    constructor(private upperLeft: Point, private title: string) {
        super(upperLeft);
        this.img = new Image();
        this.img.onload = function () {
            console.log("loaded");
        }
        this.img.src = icon;
        let relativeDragTargetPosition = new Point(upperLeft.x, upperLeft.y);
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

    updateZoom() {
        super.updateZoom();
        this.dragTarget.updateZoom();
    }

    draw(context: CanvasRenderingContext2D) {
        context.drawImage(this.img, this.center.x, this.center.y, Scaler.x(512), Scaler.x(512));
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
        // context.strokeRect(this.center.x - 200 + 175, this.center.y + 425 - 600, this.width, this.height);
        context.stroke();
        context.shadowBlur = 0;
        context.shadowOffsetY = 0;
        context.shadowOffsetX = 0;
    }
}
