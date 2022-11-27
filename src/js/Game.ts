import {Logic} from "./Logic";
import {Point} from "./mathUtils";
import {Scaler} from "./utils";
import {DetailedContentView} from "./DetailedContentView";
import legalPage from "../html/legal.html"
import contactPage from "../html/contact.html"
import welcomePage from "../html/welcome.html"
import programmingPage from "../html/informatics.html"
import maschinenbauPage from "../html/maschinenbau.html"
import {Direction} from "./Locomotive";

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
        // this.detailedContentView.setContent(welcomePage);
        this.detailedContentView.setContent(maschinenbauPage);
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
            const {x, y}: { x: number, y: number } = this.getMousePos(e);
            this.drawingState.pointerPosition.x = x;
            this.drawingState.pointerPosition.y = y;
            this.drawingState.isPointerDown = true;
            this.logic.handlePointerDown(new Point(x, y));
            const target = e.target as Element;
            if (target.hasPointerCapture(e.pointerId)) {
                target.releasePointerCapture(e.pointerId);
            }
        });

        this.canvas.addEventListener('pointerup', (e) => {
            const {x, y}: { x: number, y: number } = this.getMousePos(e);
            this.drawingState.pointerPosition.x = x;
            this.drawingState.pointerPosition.y = y;
            this.drawingState.isPointerDown = false;
            this.drawingState.pressedKeys.delete("ForwardButton");
            this.logic.handlePointerUp(new Point(x, y));
        });

        this.canvas.addEventListener('pointermove', (e) => {
            const {x, y}: { x: number, y: number } = this.getMousePos(e);
            this.drawingState.pointerPosition.x = x;
            this.drawingState.pointerPosition.y = y;
            if (this.drawingState.isPointerDown)
                this.logic.handlePointerPressedMove(new Point(x, y));
        });

        document.addEventListener('keydown', (e) => {
            this.drawingState.pressedKeys.add(e.key);
            if (e.key === "Escape")
                this.detailedContentView.hide();
        });

        document.addEventListener('keyup', (e) => {
            this.drawingState.pressedKeys.delete(e.key);
        });

        window.addEventListener('resize', () => {
            this.canvas.width = Scaler.getWidth()
            this.canvas.height = Scaler.getHeight()
            this.logic.zoom();
        });

        document.getElementById("forwardButton").addEventListener("pointerdown", () => {
            this.drawingState.pressedKeys.add("ForwardButton");
        });

        document.getElementById("forwardButton").addEventListener("pointerup", () => {
            this.drawingState.pressedKeys.delete("ForwardButton");
        });

        document.getElementById("forwardButton").addEventListener("contextmenu", function (e) {
            e.preventDefault();
        });

        document.getElementById("forwardButton").addEventListener("pointerleave", () => {
                this.drawingState.pressedKeys.delete("ForwardButton");
            }
        );

        document.getElementById("forwardButton").addEventListener("touchcancel", () => {
                this.drawingState.pressedKeys.delete("ForwardButton");
            }
        );
    }

    public render(): void {
        let userInput: Direction = Direction.Idle;

        if (this.drawingState.pressedKeys.has("ForwardButton") ||
            this.drawingState.pressedKeys.has("ArrowRight"))
            userInput = Direction.Forward;
        else if (this.drawingState.pressedKeys.has('ArrowLeft'))
            userInput = Direction.Backwards;
        this.logic.process(userInput);
    }


    private setUpClickable(HtmlId: string, rawHtmlModalContent: string) {
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
        this.setUpReloadButton();
        await this.logic.init(this.detailedContentView);
    }

    private setUpReloadButton() {
        const legalLink = document.getElementById("titleLink");
        const self = this;
        legalLink.onclick = function () {
            location.reload()
        };
    }
}
