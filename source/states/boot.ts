/*
 * Boot state
 *
 * Initialization of input, resolution, etc.
 */
export class Boot extends Phaser.State {
    preload() {
        this.load.image('preloader', 'assets/images/loading_bar.png');
        this.load.image('splash', 'assets/images/background.png');
    }

    create() {
        this.game.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
        this.stage.smoothed = false;

        /*
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        */

        this.game.state.start('preload');
    }
}
