import {Input3} from "../util/input";

/**
 * Gamepad3
 *
 * Simple 3-input game pad: left, right, fire. Fixed to screen.
 */
export class Gamepad3 implements Input3 {
    constructor(game: Phaser.Game) {
        let y = game.height - 70;

        // TODO(herohde) 5/13/2017: buttons do not reliably detect a finger
        // that slides between buttons or if lifted (even with Over/Out). We
        // should instead look at "active" pointers directly.

        let lb = game.add.button(6, y, 'gamepad3');
        lb.fixedToCamera = true;
        lb.alpha = 0.3;
        lb.events.onInputDown.add(() => { this.leftDown = true; });
        lb.events.onInputUp.add(() => { this.leftDown = false; });


        let rb = game.add.button(76, y, 'gamepad3');
        rb.fixedToCamera = true;
        rb.alpha = 0.3;
        rb.events.onInputDown.add(() => { this.rightDown = true; });
        rb.events.onInputUp.add(() => { this.rightDown = false; });

        let fb = game.add.button(game.width - 70, y, 'gamepad3');
        fb.fixedToCamera = true;
        fb.alpha = 0.3;
        fb.events.onInputDown.add(() => { this.aDown = true; });
        fb.events.onInputUp.add(() => { this.aDown = false; });
    }

    public left(): boolean {
        return this.leftDown;
    }
    public right(): boolean {
        return this.rightDown;
    }
    public a(): boolean {
        return this.aDown;
    }

    private leftDown: boolean;
    private rightDown: boolean;
    private aDown: boolean;
}
