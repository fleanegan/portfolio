import {DragItem, drawBackground, Rails} from "./Background";
import {Direction, Locomotive} from "./Locomotive";
import {Point} from "./mathUtils";

export class Logic {
    private rails: Rails;
    private background: ImageData;
    private locomotive: Locomotive;
    private scalefactor: number;
    private dragItems: DragItem[] = [];
    private railTargetPoints: number[][];
    private activeDragItem: DragItem[] = [];

    constructor(private canvas: HTMLCanvasElement, private context: CanvasRenderingContext2D, scalefactor: number) {
        this.railTargetPoints = [[300, 300], [1000, 300], [1000, 800], [2000, 800], [2200, 300]];
        this.rails = new Rails(this.railTargetPoints, scalefactor);
        this.dragItems.push(new DragItem(new Point(this.railTargetPoints[0][0], this.railTargetPoints[0][1]),1, this.canvas));
        this.locomotive = new Locomotive(this.rails,175, scalefactor);
        this.scalefactor = scalefactor;
        this.generateStaticBackground();
    }

    private generateStaticBackground(): void {
        let canvas = document.createElement('canvas')
        let context = canvas.getContext('2d');

        canvas.width = window.screen.width;
        canvas.height = window.screen.height;
        drawBackground(context, canvas);
        // context.translate(window.screen.width, window.screen.height);
        this.rails.setScaleFactor(this.scalefactor);
        this.rails.draw(context);
        // context.translate(-window.screen.width, -window.screen.height);
        this.background = context.getImageData(0, 0, canvas.width, canvas.height);
    }

    getBackground(): ImageData {
        return this.background;
    }

    updateOffset(pressedKeys: Set<string>) {
        let currentLocomotivePosition = this.locomotive.getPositionOnScreen();
        if (pressedKeys.has('ArrowRight'))
            this.locomotive.move(Direction.Forward);
        if (pressedKeys.has('ArrowLeft'))
            this.locomotive.move(Direction.Backwards);
        if (!pressedKeys.has('ArrowRight') && !pressedKeys.has('ArrowLeft'))
            this.locomotive.move(Direction.Idle);
    }

    process() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // context.putImageData(this.getBackground(), this.getOffset().x - window.screen.width, this.getOffset().y - window.screen.height);
        this.context.putImageData(this.getBackground(), 0, 0);
        this.locomotive.draw(this.context);
        this.dragItems.forEach((item) => {
            item.draw(this.context);
        });
    }

    zoom(newScalefactor: number) {
        this.scalefactor = newScalefactor;
        this.rails.setScaleFactor(newScalefactor);
        this.locomotive.scaleLength(newScalefactor);
        this.dragItems.forEach((item) => {
            item.setScaleFactor(newScalefactor);
        });
        this.generateStaticBackground();
    }

    handlePointerDown(pointerPosition: Point) {
        for (let dragItem of this.dragItems) {
            if (dragItem.center.distanceTo(pointerPosition) < 70)
                this.activeDragItem.push(dragItem);
        }
    }

    handlePointerUp(pointerPosition: Point) {
        if (this.activeDragItem.length != 0)
        {
            console.log("old rail curve targetpoints: ", this.railTargetPoints);
            this.railTargetPoints[0][0] = this.activeDragItem[0].center.x;
            this.railTargetPoints[0][1] = this.activeDragItem[0].center.y;
            console.log("generating new rail curve for: ", this.railTargetPoints);
            this.rails = new Rails(this.railTargetPoints, this.scalefactor)
            this.locomotive.rails = this.rails;
            this.generateStaticBackground();
            this.activeDragItem.pop();
        }
    }

    handlePointerPressedMove(pointerPosition: Point) {
        if (this.activeDragItem.length == 1)
            this.activeDragItem[0].center = pointerPosition;
    }
}