import {DetailedContentView} from "./DetailedContentView";

declare var require: any;
require('../css/main.css');
require('../css/modal.css');
require('../css/modalContent.css');
require('../html/legal.html');
require('../../assets/contactCode.png');
require('../../assets/arrow.png');
require('../../assets/maschinenbau/only.png');
require('../../assets/maschinenbau/overall.png');
require('../../assets/maschinenbau/full.png');
require('../../assets/maschinenbau/x_act.png');
require('../../assets/bricolage/lampeEis.png');
require('../../assets/bricolage/lampeImDunkeln.JPG');
require('../../assets/bricolage/lampeParisFertig.jpg');
require('../../assets/bricolage/mooslampeTotale.jpg');
require('../../assets/welcome/helpContent.png');
require('../../assets/welcome/helpButton.png');
require('../../assets/welcome/helpBasePoints.png');



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
