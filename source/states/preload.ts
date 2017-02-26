/*
 * Preload state
 *
 * Load all assets while displaying a status bar/splash.
 */
export class Preload extends Phaser.State {
    bar: Phaser.Sprite;

    preload() {
        this.add.sprite(0, 0, 'splash');
        this.bar = this.add.sprite(this.game.width/2, this.game.height/2, 'preloader');
        this.bar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.bar, 0);

        // TODO(herohde) 2/25/2017: asset packs would be nice, but there is poor tooling
        // to make it worthwhile.

        this.load.image('background', 'assets/images/background.png');

        this.load.spritesheet("ufo", "assets/images/ufo.png", 32, 32, 1);
        this.load.spritesheet("spaceship", "assets/images/spaceship.png", 32, 32, 2);
        this.load.spritesheet("mothership", "assets/images/mothership.png", 64, 32, 1);
        this.load.spritesheet("laser", "assets/images/laser.png", 4, 16, 1);

        // this.load.audio('lazer', [ "assets/sounds/lazer.mp3", "assets/sounds/lazer.m4a", "assets/sounds/lazer.ogg" ]);
        // this.load.audio('die', [ "assets/sounds/die.mp3", "assets/sounds/die.m4a", "assets/sounds/die.ogg" ]);
    }

    create() {
        var tween = this.add.tween(this.bar).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(() => {
            this.game.state.start('game');
        }, this);
    }
}
