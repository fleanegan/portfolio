import {DragItem, drawBackground, Rails} from "./Background";
import {Direction, Locomotive} from "./Locomotive";
import {Point} from "./mathUtils";

export class Logic {
    private rails: Rails;
    private background: ImageData;
    private locomotive: Locomotive;
    private scalefactor: number;

    constructor(private canvas: HTMLCanvasElement, private context: CanvasRenderingContext2D, scalefactor: number) {
        this.rails = new Rails([[300, 300], [1000, 300], [1000, 800], [2000, 800], [2200, 300]], scalefactor);
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
        this.rails.setScaleFactor(this.scalefactor);
        this.rails.reDraw(context);
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
        this.context.putImageData(this.getBackground(), 0, 0);
        this.locomotive.draw(this.context);
        this.rails.draw(this.context);
    }

    zoom(newScalefactor: number) {
        this.scalefactor = newScalefactor;
        this.rails.setScaleFactor(newScalefactor);
        this.locomotive.scaleLength(newScalefactor);
        this.generateStaticBackground();
    }

    handlePointerDown(pointerPosition: Point) {
        this.rails.handlePointerDown(pointerPosition);
    }

    handlePointerUp(pointerPosition: Point) {
        if (this.rails.isBeingDragged()){
            this.rails.handlePointerUp(pointerPosition);
            this.generateStaticBackground();
        }
    }

    handlePointerPressedMove(pointerPosition: Point) {
        this.rails.handlePointerPressedMove(pointerPosition)
    }
}