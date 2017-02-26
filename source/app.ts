/// <reference path="../bower_components/phaser/typescript/phaser.comments.d.ts" />

import {Boot} from "./states/boot";
import {Preload} from "./states/preload";
import {Game} from "./states/game";
import {End} from "./states/end";

/**
 * Invaders game
 */
class Invaders extends Phaser.Game {
    constructor(id: string) {
        super(window.innerWidth, window.innerHeight, Phaser.AUTO, id);

        this.state.add('boot', new Boot());
        this.state.add('preload', new Preload());
        this.state.add('game', new Game());
        this.state.add('end', new End());

        this.state.start('boot');
    }
}

window.onload = () => {
    var game = new Invaders('game');
};
