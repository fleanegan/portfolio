import {DetailedContentView} from "./DetailedContentView";

declare var require: any;
require('../css/main.css');

import Game from './Game';

class App {
	private _game: Game;

	constructor(game: Game) {
		this._game = game;
	}

	public async setup() {
		// Any setup that is required that only runs once before game loads goes here
		await this._game.init();
		this.gameLoop();
	}

	private gameLoop(): void {
        // need to bind the current this reference to the callback
		requestAnimationFrame(this.gameLoop.bind(this)); 

		this._game.render();
	}
}

window.onload = () => {
	let app = new App(new Game());

	app.setup();
}
