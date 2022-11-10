import {drawBackground, Rails} from "./Background";
import {Direction, Locomotive} from "./Locomotive";
import {Point} from "./mathUtils";

export class Logic {
    private rails: Rails;
    private background: ImageData;
    private offset: Point;
    private locomotive: Locomotive;


    constructor(private canvas: HTMLCanvasElement) {
        this.rails = new Rails([[300, 300], [800, 700], [300, 1500], [1200, 1800], [2100, 300], [3000, 300]]);
        this.locomotive = new Locomotive(this.rails, Math.round(window.screen.width * 0.075));
        this.generateStaticBackground();
        this.offset = new Point(0, 0);
    }

    private generateStaticBackground(): void {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d');

        canvas.width = window.screen.width * 5;
        canvas.height = window.screen.height * 5;
        drawBackground(ctx, canvas);
        ctx.translate(window.screen.width, window.screen.height);
        this.rails.draw(ctx);
        ctx.translate(-window.screen.width, -window.screen.height);
        this.background = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }

    getBackground(): ImageData {
        return this.background;
    }

    getOffset() {
        return this.offset;
    }

    updateOffset(pressedKeys: Set<string>) {
        let currentLocomotivePosition = this.locomotive.getPositionOnScreen();

        if (currentLocomotivePosition[1].y > 0.8 * this.canvas.height)
            this.offset.y += 0.8 * this.canvas.height - currentLocomotivePosition[1].y;
        if (currentLocomotivePosition[0].y < 0.2 * this.canvas.height)
            this.offset.y += 0.200001 * this.canvas.height - currentLocomotivePosition[0].y;
        if (currentLocomotivePosition[1].x > 0.8 * this.canvas.width)
            this.offset.x += 0.8 * this.canvas.width - currentLocomotivePosition[1].x;
        if (currentLocomotivePosition[0].x < 0.2 * this.canvas.width)
            this.offset.x += 0.200001 * this.canvas.width - currentLocomotivePosition[0].x;
        if (pressedKeys.has('ArrowUp'))
            this.offset.y -= 10;
        if (pressedKeys.has('ArrowRight'))
            this.locomotive.move(Direction.Forward);
        if (pressedKeys.has('ArrowLeft'))
            this.locomotive.move(Direction.Backwards);
        if (!pressedKeys.has('ArrowRight') && !pressedKeys.has('ArrowLeft'))
            this.locomotive.move(Direction.Idle);
        this.locomotive.setGlobalOffset(this.offset);
    }

    process(context: CanvasRenderingContext2D) {
        context.putImageData(this.getBackground(), this.getOffset().x - window.screen.width, this.getOffset().y - window.screen.height);
        this.locomotive.draw(context);
    }
}