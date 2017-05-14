import {Player} from "../prefabs/player"
import {Ufo} from "../prefabs/ufo";
import {Score} from "../prefabs/score";
import {Image} from "../util/image"
import {Session} from "../session";
import {Bullets} from "../util/bullets";

/*
 * Game state
 *
 * Active invaders game.
 */
export class Game extends Phaser.State {
    constructor(private session: Session) {
        super();
    }

    init() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
    }

    create() {
        Image.fill(this.game, 'background');

        this.player = new Player(this.game, this.game.world.centerX, this.game.world.height - 60);
        this.bullets = new Bullets(this.game, "drop", {x: 20, y: 30}, {x: 0, y: 300});
        let score = new Score(this.game, 5, 5, this.session.score);

        console.log("level: " + this.session.level);
        // this.game.add.audio('prepare_for_invasion').play('', 0, 0.5);

        const style = { font: "64px Arial", fill: "#ffffff", align: "center" };
        let text = this.game.add.text(this.game.width/2, this.game.height/3, "Level " + this.session.level, style);
        let t = this.game.add.tween(text).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
        t.onComplete.add((c : Phaser.Sprite, obj: any) => {
            c.kill();
        }, this);


        // Difficulty adjustments based on level.
        this.speed = (100 + (50*this.session.level)) * (this.game.width/2000);
        this.fire = 0.01 + (0.005*this.session.level);

        // Create grid of Ufos.
        this.makeUfos();
    }

    update() {
        if (this.ufos.getFirstAlive() == null) {
            this.game.state.start('boss');
            return
        }

        this.moveUfos();
        this.maybeShoot();

        if (this.ufos.bottom > this.game.height - 50) {
            this.game.state.start('end');
            return
        }

        this.physics.arcade.overlap(this.player.bullets, this.ufos, (b : Phaser.Sprite, c : Ufo) => {
            if (c.hit()) {
                b.kill();
                this.session.score.inc(10);
            }
        }, null, this);
        this.physics.arcade.overlap(this.bullets, this.player, (b : Phaser.Sprite, c : Player) => {
            b.kill();
            c.kill();
            this.game.state.start('end');
        }, null, this);

    }

    render() {
        // this.game.debug.bodyInfo(sprite1, 32, 32);

         /*
        this.ufos.forEachAlive((ufo : Ufo) => {
            this.game.debug.body(ufo);
        }, this);
        this.game.debug.body(this.player);
        */
    }

    private makeUfos() {
        this.ufos = this.add.group();
        this.ufos.enableBody = true;

        const spacing = 80;
        for (let x = 0; x<10; x++) {
            for (let y = 0; y<3; y++) {
                let ufo = new Ufo(this.game, 20 + x*spacing, 20 + y*spacing);
                this.ufos.add(ufo);
            }
        }

        this.ufos.setAll('body.velocity.x', this.speed)
    }

    private moveUfos() {
        if (this.ufos.left < 2) {
            this.ufos.forEachAlive((ufo : Ufo) => {
                ufo.y += 10;
            }, this);
            this.ufos.setAll('body.velocity.x', this.speed);
        }
        if (this.ufos.right > this.game.width - 2) {
            this.ufos.forEachAlive((ufo : Ufo) => {
                ufo.y += 10;
            }, this);
            this.ufos.setAll('body.velocity.x', -this.speed);
        }
    }

    private maybeShoot() {
        if (Math.random() > this.fire) {
            return;
        }

        let index = Math.floor(this.ufos.total * Math.random());
        let alive = this.ufos.filter((ufo: Ufo) => { return ufo.alive; });

        alive.list[index].firesound.play('', 0, 0.1);

        let bullet = this.bullets.fire(alive.list[index]);
        bullet.scale.x = 2;
        bullet.scale.y = 2;

        // console.log("Picked: " + index + " of " + alive.total);
    }

    speed: number = 150;
    fire: number = 0.01;

    player: Player;
    ufos: Phaser.Group;
    bullets: Bullets;
}
