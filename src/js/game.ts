import {Logic} from "./logic";

type DrawingState = {
	pointerPosition: { x: number; y: number };
	isPointerDown: boolean;
	pressedKeys: Set<string>;
};

export default class Game {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private height: number = window.innerHeight;
	private width: number = window.innerWidth;
	private logic: Logic;
	private drawingState: DrawingState = {
		pointerPosition: { x: 0, y: 0 },
		isPointerDown: false,
		pressedKeys: new Set(),
	};

	constructor() {
		this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.ctx = this.canvas.getContext("2d");
		this.addEventListeners();
		this.logic = new Logic(this.canvas);
		let image = new Image();
	}

	addEventListeners(): void {
		this.canvas.addEventListener('pointerdown', () => {
			this.drawingState.isPointerDown = true;
		});

		this.canvas.addEventListener('pointerup', () => {
			this.drawingState.isPointerDown = false;
		});

		this.canvas.addEventListener('pointermove', (e) => {
			this.drawingState.pointerPosition.x = e.clientX;
			this.drawingState.pointerPosition.y = e.clientY;
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
		})
	}

	public render(): void {
				this.logic.updateOffset(this.drawingState.pressedKeys);
				this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
				this.logic.process(this.ctx);
	}

	private isForcingRedraw(): boolean {
		return this.drawingState.pressedKeys.has('ArrowDown') ||
			this.drawingState.pressedKeys.has('ArrowUp') ||
			this.drawingState.pressedKeys.has('ArrowRight') ||
			this. drawingState.pressedKeys.has('ArrowLeft');
	}
}
