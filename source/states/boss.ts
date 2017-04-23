import {Player} from "../prefabs/player"
import {Ufo} from "../prefabs/ufo";
import {Score} from "../prefabs/score";
import {Image} from "../util/image"
import {Session} from "../session";
import {Mothership} from "../prefabs/mothership";
import {Bullets} from "../util/bullets";

/*
 * Boss state
 *
 * Active invaders game end of level monster.
 */
export class Boss extends Phaser.State {
    constructor(private session: Session) {
        super();
    }

    create() {
        Image.fill(this.game, 'background');

        this.player = new Player(this.game, this.game.world.centerX, this.game.world.height - 60);
        this.bullets = new Bullets(this.game, "bomb", {x: 0, y: 20}, {x: 0, y: 400});
        let text = new Score(this.game, 5, 5, this.session.score);

        this.speed = 200 + (50*this.session.level);
        this.fire = 0.01 + (0.01*this.session.level);

        console.log("Boss level: " + this.session.level);

        this.makeUfos();
    }

    update() {
        if (this.ufos.getFirstAlive() == null) {
            this.session.level++;
            this.game.state.start('game');
        }

        this.moveUfos();
        this.maybeShoot();

        if (this.ufos.bottom > this.game.height - 50) {
            this.game.state.start('end');
        }

        this.physics.arcade.overlap(this.player.bullets, this.ufos, (b : Phaser.Sprite, c : Ufo) => {
            if (c.hit()) {
                b.kill();
                this.session.score.inc(50);
            }
        }, null, this);

        this.physics.arcade.overlap(this.bullets, this.player, (b : Phaser.Sprite, c : Player) => {
            b.kill();
            c.kill();
            this.game.state.start('end');
        }, null, this);
    }

    render() {
        /*
        this.ufos.forEachAlive((ufo : Ufo) => {
            this.game.debug.body(ufo);
        }, this);
        this.bullets.forEachAlive((b : Phaser.Sprite) => {
            this.game.debug.body(b);
        }, this);
        this.game.debug.body(this.player);
        */
    }

    private makeUfos() {
        this.ufos = this.add.group();
        this.ufos.enableBody = true;

        let boss = new Mothership(this.game, 20, 20);
        this.ufos.add(boss);

        this.ufos.setAll('body.velocity.x', this.speed)
    }

    private moveUfos() {
        if (this.ufos.left < 5) {
            this.ufos.forEachAlive((ufo : Phaser.Sprite) => {
                ufo.y += 10;
            }, this);
            this.ufos.setAll('body.velocity.x', this.speed);
        }
        if (this.ufos.right > this.game.width - 5) {
            this.ufos.forEachAlive((ufo : Phaser.Sprite) => {
                ufo.y += 10;
            }, this);
            this.ufos.setAll('body.velocity.x', -this.speed);
        }
    }

    private maybeShoot() {
        this.ufos.forEachAlive((ufo : Mothership) => {
            if (Math.random() < this.fire) {
                this.bullets.fire(ufo);
                ufo.firesound.play('', 0, 0.1);
            }
        }, this);
    }

    speed: number = 150;
    fire: number = 0.01;

    player: Player;
    ufos: Phaser.Group;
    bullets: Bullets;
}
