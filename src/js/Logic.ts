import {drawBackground, Rails} from "./Background";
import {Direction, Locomotive} from "./Locomotive";
import {Point} from "./mathUtils";
import {Scaler} from "./utils";
import {DetailedContentView} from "./DetailedContentView";
import {RailInteractivityHandler} from "./RailInteractivityHandler";
import {ContentPreview} from "./ContentPreview";
import {AnimationHandler} from "./AnimationHandler";

export class Logic {
    private rails: Rails;
    private background: ImageData;
    private locomotive: Locomotive;
    private railInteractivityHandler: RailInteractivityHandler;
    private contentPreview: ContentPreview;
    private detailedContentView: DetailedContentView;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private animationHandler: AnimationHandler;

    constructor() {
    }

    async init(detailedContentView: DetailedContentView) {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.context = this.canvas.getContext('2d');
        this.detailedContentView = detailedContentView;
        this.rails = new Rails([[1500.4928366762176, 147.263644773358], [218.0859598853868, 98.17576318223868], [233.63027113720958, 454.75211344326783], [732.298728249195, 591.3103282673394], [806.6857356636901, 965.1881591448949], [1445.8629845586108, 978.4462382540282], [1957.666485605649, 785.3950413223142],]);
        this.contentPreview = new ContentPreview();
        this.railInteractivityHandler = new RailInteractivityHandler(this.rails, this.contentPreview);
        this.locomotive = new Locomotive(this.rails.path, Scaler.xLimited(1) * 175);
        await this.generateStaticBackground();
        this.animationHandler = new AnimationHandler();
        this.animationHandler.init(this.rails.splineBasePoints[3].center, this.locomotive);
    }

    private async generateStaticBackground() {
        let canvas = document.createElement('canvas')
        let context = canvas.getContext('2d');

        canvas.width = Scaler.getWidth();
        canvas.height = Scaler.getHeight();
        drawBackground(context, canvas);
        this.railInteractivityHandler.updateZoom();
        await this.contentPreview.draw(context);
        this.rails.reDraw(context);
        this.background = context.getImageData(0, 0, canvas.width, canvas.height);
    }

    getBackground(): ImageData {
        return this.background;
    }

    process(newDirection: Direction) {
        if (this.detailedContentView.isHidden() == false)
            return;
        this.updateLocomotiveDirection(newDirection);
        if (this.locomotive.hasReachedDestination() && this.locomotive.direction == Direction.Auto) {
            this.detailedContentView.show();
            this.init(this.detailedContentView);
            return;
        }
        this.locomotive.move();
        this.context.putImageData(this.getBackground(), 0, 0);
        this.rails.draw(this.context);
        if (this.railInteractivityHandler.isPathDragged())
            this.contentPreview.drawTargets(this.context);
        this.locomotive.draw(this.context);
        this.animationHandler.run(this.context)
        if (newDirection != Direction.Idle)
            this.animationHandler.deactivateHelp();
    }

    updateLocomotiveDirection(userInput: Direction) {
        if (this.locomotive.autopilotDestinationAsProgress == null) {
            this.locomotive.setDirection(userInput);
        } else
            this.locomotive.setDirection(Direction.Auto);
    }

    zoom() {
        Scaler.updateDimensions();
        this.railInteractivityHandler.updateZoom();
        this.locomotive.scaleLength(Scaler.xLimited(1));
        this.generateStaticBackground();
        this.animationHandler.updateZoom();
    }

    handlePointerDown(pointerPosition: Point) {
        this.railInteractivityHandler.handlePointerDown(pointerPosition);
        if (this.railInteractivityHandler.isPathDragged() || this.railInteractivityHandler.isNearTile(pointerPosition))
            this.animationHandler.deactivateHelp();
    }

    handlePointerUp(pointerPosition: Point) {
        if (this.railInteractivityHandler.isPathDragged() || this.railInteractivityHandler.isNearTile(pointerPosition)) {
            this.railInteractivityHandler.handlePointerUp(pointerPosition);
            this.generateStaticBackground();
        }
        if (this.railInteractivityHandler.autopilotDestination != null && this.locomotive.direction != Direction.Auto) {
            this.locomotive.setDestination(this.railInteractivityHandler.autopilotDestination.getDragTargetCenter());
            this.detailedContentView.setContent(this.railInteractivityHandler.autopilotDestination.getContent())
        }
    }

    handlePointerPressedMove(pointerPosition: Point) {
        this.railInteractivityHandler.handlePointerPressedMove(pointerPosition);
        if (this.railInteractivityHandler.isPathDragged() || this.railInteractivityHandler.isNearTile(pointerPosition))
            this.animationHandler.deactivateHelp();
    }
}