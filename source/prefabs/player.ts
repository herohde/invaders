
/*
 * Invaders player
 *
 * Human-controlled cat. Uses arrows and space bar.
 */
export class Player extends Phaser.Sprite {
    constructor(game: Phaser.Game, x :number, y:number, public bullets : Phaser.Group) {
        super(game, x, y, "spaceship");

        game.add.existing(this);
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;
        this.body.drag.x = 800;
        this.body.drag.y = 800;

        this.animations.add('idle');
        this.animations.play('idle', 2, true);

        // Smaller bounding box. Makes collisions tighter.
        this.body.height = 20;
        this.body.width = 20;

        this.scale.x = 2;
        this.scale.y = 2;

        // Shooting.
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

        this.fireguard = 0;

        // this.health, heal, damage, ..

        // Input.
        this.cursors = game.input.keyboard.createCursorKeys();
        this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }

    update() {
        const speed = 200;

        if (this.cursors.left.isDown) {
            this.body.velocity.x = -speed;
        }
        if (this.cursors.right.isDown) {
            this.body.velocity.x = speed;
        }
        if (this.spacebar.isDown) {
            this.fire();
        }
    }

    fire() {
        if (this.game.time.now < this.fireguard) {
            return; // too soon to fire again
        }

        this.fireguard = this.game.time.now + 400;

        const offset = {x: 45, y: 15};


        let bullet = this.bullets.getFirstDead();
        if (bullet) {
            bullet.x = this.x + offset.x;
            bullet.y = this.y + offset.y;
            bullet.revive();
        } else {
            bullet = this.bullets.create(this.x + offset.x, this.y + offset.y, "laser");
            this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
            bullet.outOfBoundsKill = true;
            bullet.checkWorldBounds = true;

            bullet.body.velocity.y = -400;
        }
    }

    private fireguard: number;
    private cursors: Phaser.CursorKeys;
    private spacebar: Phaser.Key;
}