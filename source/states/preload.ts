import {Image} from "../util/image"

/*
 * Preload state
 *
 * Load all assets while displaying a status bar/splash.
 */
export class Preload extends Phaser.State {
    preload() {
        this.bg = Image.fill(this.game, 'splash');

        // let text = this.game.add.text(this.game.width/2, this.game.height/2, "invaders", {font: "80px Arial", fill: "#ffffff", align: "center"});
        // text.anchor.setTo(0.5, 0.5);
        
        let img = this.add.image(this.game.width/2, this.game.height/2, "invaders");
        img.anchor.setTo(0.5, 0.5);

        let style = {font: "36px Arial", fill: "#ffffff", align: "center"};
        let credit = this.game.add.text(this.game.width, this.game.height, "Invaders 2017 (c) William ", style);
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

        this.load.spritesheet("gamepad3", "assets/images/gamepad3.png", 64, 64, 1);

        this.load.audio('clank', [ "assets/sounds/clank.mp3", "assets/sounds/clank.ogg" ]);
        this.load.audio('game_over', [ "assets/sounds/game_over.mp3", "assets/sounds/game_over.ogg" ]);
        this.load.audio('large_explosion', [ "assets/sounds/large_explosion.mp3", "assets/sounds/large_explosion.ogg" ]);
        this.load.audio('long_laser', [ "assets/sounds/long_laser.mp3", "assets/sounds/long_laser.ogg" ]);
        this.load.audio('player_explosion', [ "assets/sounds/player_explosion.mp3", "assets/sounds/player_explosion.ogg" ]);
        this.load.audio('player2_explosion', [ "assets/sounds/player2_explosion.mp3", "assets/sounds/player2_explosion.ogg" ]);
        this.load.audio('prepare_for_invasion', [ "assets/sounds/prepare_for_invasion.mp3", "assets/sounds/prepare_for_invasion.ogg" ]);
        this.load.audio('short_laser', [ "assets/sounds/short_laser.mp3", "assets/sounds/short_laser.ogg" ]);
        this.load.audio('small_explosion', [ "assets/sounds/small_explosion.mp3", "assets/sounds/small_explosion.ogg" ]);
    }

    create() {
        let tween = this.add.tween(this.bar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(() => {
            let style = {font: "36px Arial", fill: "#ff0000", align: "center"};
            let click = this.game.add.text(this.game.width/2, this.game.height*3/4, "- click to start -", style);
            click.anchor.setTo(0.5, 0.5);

            this.bg.inputEnabled = true;
            this.bg.events.onInputDown.add(() => {
                this.game.state.start('game');
            }, this);
        }, this);
    }

    bar: Phaser.Sprite;
    bg: Phaser.Sprite;
}
