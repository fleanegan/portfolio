import {Logic} from "./Logic";
import {Point} from "./mathUtils";

type DrawingState = {
    pointerPosition: { x: number; y: number };
    isPointerDown: boolean;
    pressedKeys: Set<string>;
};

export default class Game {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private height: number = window.innerHeight;
    private width: number = window.innerWidth;
    private logic: Logic;
    private drawingState: DrawingState = {
        pointerPosition: {x: 0, y: 0},
        isPointerDown: false,
        pressedKeys: new Set(),
    };

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext("2d");
        this.addEventListeners();
        this.logic = new Logic(this.canvas, this.context);
    }

    addEventListeners(): void {
        this.canvas.addEventListener('pointerdown', (e) => {
            this.drawingState.pointerPosition.x = e.clientX;
            this.drawingState.pointerPosition.y = e.clientY;
            this.drawingState.isPointerDown = true;
            this.logic.handlePointerDown(new Point(e.clientX, e.clientY));
        });

        this.canvas.addEventListener('pointerup', (e) => {
            this.drawingState.pointerPosition.x = e.clientX;
            this.drawingState.pointerPosition.y = e.clientY;
            this.drawingState.isPointerDown = false;
            this.logic.handlePointerUp(new Point(e.clientX, e.clientY));
        });

        this.canvas.addEventListener('pointermove', (e) => {
            this.drawingState.pointerPosition.x = e.clientX;
            this.drawingState.pointerPosition.y = e.clientY;
            if (this.drawingState.isPointerDown)
                this.logic.handlePointerPressedMove(new Point(e.clientX, e.clientY));
        });

        document.addEventListener('keydown', (e) => {
            this.drawingState.pressedKeys.add(e.key);
        });

        document.addEventListener('keyup', (e) => {
            this.drawingState.pressedKeys.delete(e.key);
        });
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth
            this.canvas.height = window.innerHeight
            this.logic.zoom();
        })
    }

    public render(): void {
        this.logic.process(this.drawingState.pressedKeys);
    }

    private isForcingRedraw(): boolean {
        return this.drawingState.pressedKeys.has('ArrowDown') ||
            this.drawingState.pressedKeys.has('ArrowUp') ||
            this.drawingState.pressedKeys.has('ArrowRight') ||
            this.drawingState.pressedKeys.has('ArrowLeft');
    }
}
