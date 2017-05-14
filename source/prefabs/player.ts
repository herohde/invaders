import {Bullets} from "../util/bullets"
import {Input3, Keyboard} from "../util/input";
import {Gamepad3} from "./gamepad3";

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
        if (!game.device.desktop) {
            this.input3 = new Gamepad3(game);
        } else {
            this.input3 = new Keyboard(game);
        }
    }

    update() {
        const speed = 300;

        if (this.input3.left()) {
            this.body.velocity.x = -speed;
        }
        if (this.input3.right()) {
            this.body.velocity.x = speed;
        }
        if (this.input3.a()) {
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

    private input3: Input3 = null;
}