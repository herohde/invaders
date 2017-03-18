import {Point} from "./point"

/*
 * Bullets
 *
 * Convenience group to create sprites that fly in a fixed direction
 * and do not extend beyond the screen. Reuses sprites.
 */
export class Bullets extends Phaser.Group {
    constructor(game: Phaser.Game, private sprite: string, private offset: Point, private velocity: Point) {
        super(game);

        this.enableBody = true;
        this.physicsBodyType = Phaser.Physics.ARCADE;
    }

    // fire creates a bullet from the given position, optionally overriding
    // the group velocity.
    public fire(origin: Point) : Phaser.Sprite {
        let bullet = this.getFirstDead();
        if (bullet) {
            bullet.revive();
        } else {
            bullet = this.create(0, 0, this.sprite);
            this.game.physics.enable(bullet, Phaser.Physics.ARCADE);

            bullet.outOfBoundsKill = true;
            bullet.checkWorldBounds = true;
        }

        bullet.x = origin.x + this.offset.x;
        bullet.y = origin.y + this.offset.y;
        bullet.body.velocity.x = this.velocity.x;
        bullet.body.velocity.y = this.velocity.y;
        return bullet
    }
}