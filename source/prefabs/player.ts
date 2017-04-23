import {Bullets} from "../util/bullets"

/*
 * Invaders player
 *
 * Human-controlled spaceship. Uses arrows and space bar.
 */
export class Player extends Phaser.Sprite {
    constructor(game: Phaser.Game, x :number, y:number) {
        super(game, x, y, "spaceship");

        game.add.existing(this);
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;
        this.body.drag.x = 800;
        this.body.drag.y = 800;

        this.animations.add('idle');
        this.animations.play('idle', 2, true);

        // Smaller bounding box.
        this.body.setSize(16, 12, 8, 10); // bounding box
        this.scale.x = 2;
        this.scale.y = 2;

        this.bullets = new Bullets(game, "laser", {x: 45, y: 15}, {x: 0, y: -600});
        this.firesound = game.add.audio('short_laser');

        // this.health, heal, damage, ..

        // Input.
        this.cursors = game.input.keyboard.createCursorKeys();
        this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }

    update() {
        const speed = 300;

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

    private fire() {
        const delay = 200;

        if (this.game.time.now < this.fireguard) {
            return; // too soon to fire again
        }

        this.firesound.play('', 0, 0.2);

        this.fireguard = this.game.time.now + delay;
        let bullet = this.bullets.fire(this);
        if (this.side) {
            // Fire with alternating weapon
            bullet.x -= 26;
        }
        this.side = !this.side;
    }

    public bullets: Bullets;
    public diesound: Phaser.Sound;

    private firesound: Phaser.Sound;

    private fireguard: number = 0;
    private side: boolean = false;
    private cursors: Phaser.CursorKeys;
    private spacebar: Phaser.Key;
}