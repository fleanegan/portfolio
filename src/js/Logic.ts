import {drawBackground, Rails} from "./Background";
import {Direction, Locomotive} from "./Locomotive";
import {Point} from "./mathUtils";
import {Scaler} from "./utils";
import {DetailedContentView} from "./DetailedContentView";
import {RailInteractivityHandler} from "./RailInteractivityHandler";
import {ContentPreview} from "./ContentPreview";

export class Logic {
    private rails: Rails;
    private background: ImageData;
    private locomotive: Locomotive;
    private detailedContentView: DetailedContentView;
    private railInteractivityHandler: RailInteractivityHandler;
    private contentPreview: ContentPreview;

    constructor(private canvas: HTMLCanvasElement, private context: CanvasRenderingContext2D) {
    }

    async init() {
        this.detailedContentView = new DetailedContentView();
        this.rails = new Rails([
            [1500.4928366762176, 147.263644773358], [218.08595988538679, 98.17576318223868], [219.62177650429797, 545.5448658649399], [804.7679083094554, 565.626271970398], [932.2406876790828, 1077.7021276595744], [1541.9598853868195, 1054.2738205365406], [1957.666485605649, 785.3950413223142]
        ]);
        this.contentPreview = new ContentPreview();
        this.railInteractivityHandler = new RailInteractivityHandler(this.rails, this.contentPreview);
        this.locomotive = new Locomotive(this.rails.path, Scaler.x(175));
        await this.generateStaticBackground();
    }

    private async generateStaticBackground() {
        let canvas = document.createElement('canvas')
        let context = canvas.getContext('2d');

        canvas.width = window.screen.width;
        canvas.height = window.screen.height;
        drawBackground(context, canvas);
        this.railInteractivityHandler.updateZoom();
        await this.contentPreview.draw(context);
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
        this.context.putImageData(this.getBackground(), 0, 0);
        this.rails.draw(this.context);
        if (this.railInteractivityHandler.isPathDragged())
        {
            this.contentPreview.drawTargets(this.context);
        }
        this.locomotive.draw(this.context);
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
        this.railInteractivityHandler.updateZoom();
        this.locomotive.scaleLength(Scaler.xLimited(1));
        this.generateStaticBackground();
    }

    handlePointerDown(pointerPosition: Point) {
        this.railInteractivityHandler.handlePointerDown(pointerPosition);
    }

    handlePointerUp(pointerPosition: Point) {
        if (this.railInteractivityHandler.isPathDragged() || this.railInteractivityHandler.isNearTarget(pointerPosition)) {
            this.railInteractivityHandler.handlePointerUp(pointerPosition);
            this.generateStaticBackground();
        }
        if (this.railInteractivityHandler.autopilotDestination != null) {
            this.locomotive.setDestination(this.railInteractivityHandler.autopilotDestination);
            this.railInteractivityHandler.autopilotDestination = null;
        }
    }

    handlePointerPressedMove(pointerPosition: Point) {
        this.railInteractivityHandler.handlePointerPressedMove(pointerPosition);
    }
}