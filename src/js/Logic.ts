import {drawBackground, InteractiveBackground} from "./Background";
import {Direction, Locomotive} from "./Locomotive";
import {Point} from "./mathUtils";
import {Scaler} from "./utils";
import {DetailedContentView} from "./DetailedContentView";

export class Logic {
    private rails: InteractiveBackground;
    private background: ImageData;
    private locomotive: Locomotive;
    private scalefactor: number;
    private detailedContentView: DetailedContentView;

    constructor(private canvas: HTMLCanvasElement, private context: CanvasRenderingContext2D) {
        this.detailedContentView = new DetailedContentView();
        this.init();
    }

    private init() {
        this.rails = new InteractiveBackground([
            [1500.4928366762176, 147.263644773358],[218.08595988538679, 98.17576318223868],[219.62177650429797, 545.5448658649399],[804.7679083094554, 565.626271970398],[932.2406876790828, 1077.7021276595744],[1541.9598853868195, 1054.2738205365406],[1957.666485605649, 785.3950413223142]
        ]);
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
        if (this.detailedContentView.isHidden() == false)
            return;
        this.updateLocomotiveDirection(pressedKeys);
        if (this.locomotive.hasReachedDestination() && this.locomotive.direction == Direction.Auto) {
            this.detailedContentView.show();
        }
        this.locomotive.move();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.putImageData(this.getBackground(), 0, 0);
        this.locomotive.draw(this.context);
        this.rails.draw(this.context);
    }

    updateLocomotiveDirection(pressedKeys: Set<string>) {
        if (this.locomotive.autopilotDestinationAsProgress == null) {
            if (pressedKeys.has('ArrowRight'))
                this.locomotive.setDirection(Direction.Forward);
            else if (pressedKeys.has('ArrowLeft'))
                this.locomotive.setDirection(Direction.Backwards);
            if (!pressedKeys.has('ArrowRight') && !pressedKeys.has('ArrowLeft') && this.locomotive.direction != Direction.Auto)
                this.locomotive.setDirection(Direction.Idle);
        } else {
            console.log("starting \n\n\nautopilot\n\n\n");
            this.locomotive.setDirection(Direction.Auto);
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
        if (this.rails.isPathDragged() || this.rails.isNearTarget(pointerPosition)) {
            this.rails.handlePointerUp(pointerPosition);
            this.generateStaticBackground();
        }
        if (this.rails.autopilotDestination != null) {
            this.locomotive.setDestination(this.rails.autopilotDestination);
            this.rails.autopilotDestination = null;
        }
    }

    handlePointerPressedMove(pointerPosition: Point) {
        this.rails.handlePointerPressedMove(pointerPosition);
    }
}