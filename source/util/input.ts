/**
 * Input3 interface
 *
 * Exposes "left", "right", "a" from an input source. Usually, "a" will be
 * interpreted as fire or jump, depending on the game.
 */
export interface Input3 {
    left(): boolean;
    right(): boolean;
    a(): boolean;
}

/**
 * Keyboard
 *
 * Keyboard is an input source for multiple kinds of inputs.
 */
export class Keyboard implements Input3 {
    constructor(game: Phaser.Game) {
        this.cursors = game.input.keyboard.createCursorKeys();
        this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }

    public left(): boolean {
        return this.cursors.left.isDown;
    }
    public right(): boolean {
        return this.cursors.right.isDown;
    }
    public a(): boolean {
        return this.spacebar.isDown;
    }

    private cursors: Phaser.CursorKeys;
    private spacebar: Phaser.Key;
}
