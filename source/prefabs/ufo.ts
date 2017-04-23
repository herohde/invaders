
/*
 * Enemy UFO.
 *
 * Descends slowly on the player. Mechanical, like the original.
 */
export class Ufo extends Phaser.Sprite {
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "ufo");

        game.add.existing(this);
        game.physics.enable(this, Phaser.Physics.ARCADE);

        this.body.setSize(20, 12, 9, 10); // bounding box
        this.scale.x = 2;
        this.scale.y = 2;

        this.diesound = game.add.audio('small_explosion');
        this.firesound = game.add.audio('short_laser');
    }

    // TODO(herohde) 3/18/2017: use different sprite instead? Not
    // sure what the canonical solution is. Disable body?

    public hit() : boolean {
        if (this.dying) {
            return false; // already dead
        }
        this.dying = true;
        this.diesound.play('', 0, 0.2);

        this.body.velocity.y = -20;
        this.body.velocity.x *= 0.8;

        let t = this.game.add.tween(this).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
        t.onComplete.add((c : Phaser.Sprite, obj: any) => {
            c.kill();
        }, this);

        return true;
    }

    public firesound: Phaser.Sound;

    private diesound: Phaser.Sound;
    private dying: boolean = false;
}
