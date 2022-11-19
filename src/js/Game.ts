import {Logic} from "./Logic";
import {Point} from "./mathUtils";
import {Scaler} from "./utils";
import {DetailedContentView} from "./DetailedContentView";
import legalPage from "../legal.html"
import contactPage from "../contact.html"

type DrawingState = {
    pointerPosition: { x: number; y: number };
    isPointerDown: boolean;
    pressedKeys: Set<string>;
};

export default class Game {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private height: number = Scaler.getHeight();
    private width: number = Scaler.getWidth();
    private logic: Logic;
    private drawingState: DrawingState = {
        pointerPosition: {x: 0, y: 0},
        isPointerDown: false,
        pressedKeys: new Set(),
    };
    private detailedContentView: DetailedContentView;

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext("2d");
        this.addEventListeners();
        this.detailedContentView = new DetailedContentView();
        this.logic = new Logic();
    }

    private getMousePos(evt: PointerEvent) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: (evt.clientX - rect.left) / (rect.right - rect.left) * this.canvas.width,
            y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * this.canvas.height
        };
    }

    addEventListeners(): void {
        this.canvas.addEventListener('pointerdown', (e) => {
            const {x, y}:{x: number, y: number} = this.getMousePos(e);
            this.drawingState.pointerPosition.x = x;
            this.drawingState.pointerPosition.y = y;
            this.drawingState.isPointerDown = true;
            this.logic.handlePointerDown(new Point(x, y));
        });

        this.canvas.addEventListener('pointerup', (e) => {
            const {x, y}:{x: number, y: number} = this.getMousePos(e);
            this.drawingState.pointerPosition.x = x;
            this.drawingState.pointerPosition.y = y;
            this.drawingState.isPointerDown = false;
            this.logic.handlePointerUp(new Point(x, y));
        });

        this.canvas.addEventListener('pointermove', (e) => {
            const {x, y}:{x: number, y: number} = this.getMousePos(e);
            this.drawingState.pointerPosition.x = x;
            this.drawingState.pointerPosition.y = y;
            if (this.drawingState.isPointerDown)
                this.logic.handlePointerPressedMove(new Point(x, y));
        });

        document.addEventListener('keydown', (e) => {
            this.drawingState.pressedKeys.add(e.key);
        });

        document.addEventListener('keyup', (e) => {
            this.drawingState.pressedKeys.delete(e.key);
        });
        window.addEventListener('resize', () => {
            this.canvas.width = Scaler.getWidth()
            this.canvas.height = Scaler.getHeight()
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

    private setUpClickable(HtmlId: string, rawHtmlModalContent: string){
        const legalLink = document.getElementById(HtmlId);
        const self = this;
        legalLink.onclick = function () {
            self.detailedContentView.setContent(rawHtmlModalContent);
            self.detailedContentView.show();
        };
    }

    async init() {
        this.setUpClickable("legalLink", legalPage);
        this.setUpClickable("contactLink", contactPage);
        this.setUpClickable("titleLink", contactPage);
        await this.logic.init(this.detailedContentView);
    }
}
