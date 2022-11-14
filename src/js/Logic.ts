import {drawBackground, InteractiveBackground} from "./Background";
import {Direction, Locomotive} from "./Locomotive";
import {Point} from "./mathUtils";
import {Scaler} from "./utils";

export class Logic {
    private rails: InteractiveBackground;
    private background: ImageData;
    private locomotive: Locomotive;
    private scalefactor: number;

    constructor(private canvas: HTMLCanvasElement, private context: CanvasRenderingContext2D) {
        this.rails = new InteractiveBackground([[927, 198 ],[528, 222 ],[526, 549 ],[1198, 839 ],[1580, 829 ],[1540, 468 ],[1206, 439 ]]);
        this.locomotive = new Locomotive(this.rails.path, Scaler.x(175));
        this.generateStaticBackground();
    }

    private generateStaticBackground(): void {
        let canvas = document.createElement('canvas')
        let context = canvas.getContext('2d');

        canvas.width = window.screen.width;
        canvas.height = window.screen.height;
        drawBackground(context, canvas);
        this.rails.updateZoom();
        this.rails.reDraw(context);
        this.background = context.getImageData(0, 0, canvas.width, canvas.height);
    }

    getBackground(): ImageData {
        return this.background;
    }

    process(pressedKeys: Set<string>) {
        console.log("rail mode: " + this.rails.autoPilotMode);
        this.updateLocomotivePosition(pressedKeys);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.putImageData(this.getBackground(), 0, 0);
        this.locomotive.draw(this.context);
        this.rails.draw(this.context);
    }

    updateLocomotivePosition(pressedKeys: Set<string>) {
        if (this.rails.autoPilotMode == Direction.Idle) {
            if (pressedKeys.has('ArrowRight'))
                this.locomotive.move(Direction.Forward);
            if (pressedKeys.has('ArrowLeft'))
                this.locomotive.move(Direction.Backwards);
            if (!pressedKeys.has('ArrowRight') && !pressedKeys.has('ArrowLeft'))
                this.locomotive.move(Direction.Idle);
        }
        else
            this.locomotive.move(this.rails.autoPilotMode);
        this.watchForTargetHits();
    }

    private watchForTargetHits() {
        for (const target of this.rails.targets) {
            if (target.getDragTargetCenter().distanceTo(this.locomotive.calcAxlePositions()[1]) < 20) {
                this.rails.autoPilotMode = Direction.Idle;
                window.open("https://www.tagesschau.de", "_self");
            }
        }
    }

    zoom() {
        this.rails.updateZoom();
        this.locomotive.scaleLength(Scaler.x(1));
        this.generateStaticBackground();
    }

    handlePointerDown(pointerPosition: Point) {
        this.rails.handlePointerDown(pointerPosition);
    }

    handlePointerUp(pointerPosition: Point) {
        if (this.rails.isBeingDragged()) {
            this.rails.handlePointerUp(pointerPosition);
            this.generateStaticBackground();
        }
    }

    handlePointerPressedMove(pointerPosition: Point) {
        this.rails.handlePointerPressedMove(pointerPosition)
    }
}