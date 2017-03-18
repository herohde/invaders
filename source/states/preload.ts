import {Image} from "../util/image"

/*
 * Preload state
 *
 * Load all assets while displaying a status bar/splash.
 */
export class Preload extends Phaser.State {
    preload() {
        this.bg = Image.fill(this.game, 'splash');

        let text = this.game.add.text(this.game.width/2, this.game.height/2, "invaders", {font: "80px Arial", fill: "#ffffff", align: "center"});
        text.anchor.setTo(0.5, 0.5);

        let style = {font: "36px Arial", fill: "#ffffff", align: "center"};
        let credit = this.game.add.text(this.game.width, this.game.height, "2017 (c) William ", style);
        credit.anchor.setTo(1, 1);

        this.bar = this.add.sprite(this.game.width/2, this.game.height*3/4, 'preloader');
        this.bar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.bar, 0);

        // TODO(herohde) 2/25/2017: asset packs would be nice, but there is poor tooling
        // to make it worthwhile.

        this.load.image('background', 'assets/images/background.png');

        this.load.spritesheet("ufo", "assets/images/ufo.png", 32, 32, 1);
        this.load.spritesheet("spaceship", "assets/images/spaceship.png", 32, 32, 2);
        this.load.spritesheet("mothership", "assets/images/mothership.png", 64, 32, 1);
        this.load.spritesheet("laser", "assets/images/laser.png", 4, 16, 1);
        this.load.spritesheet("drop", "assets/images/drop.png", 4, 16, 1);
        this.load.spritesheet("bomb", "assets/images/bomb.png", 16, 16, 1);

        // this.load.audio('lazer', [ "assets/sounds/lazer.mp3", "assets/sounds/lazer.m4a", "assets/sounds/lazer.ogg" ]);
        // this.load.audio('die', [ "assets/sounds/die.mp3", "assets/sounds/die.m4a", "assets/sounds/die.ogg" ]);
    }

    create() {
        let tween = this.add.tween(this.bar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(() => {
            let style = {font: "36px Arial", fill: "#ff0000", align: "center"};
            let click = this.game.add.text(this.game.width/2, this.game.height*3/4, "- click to start -", style);
            click.anchor.setTo(0.5, 0.5);
        }, this);

        this.bg.inputEnabled = true;
        this.bg.events.onInputDown.add(() => {
            this.game.state.start('game');
        }, this);
    }

    bar: Phaser.Sprite;
    bg: Phaser.Sprite;
}
