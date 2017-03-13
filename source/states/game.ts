import {Player} from "../prefabs/player"
import {Ufo} from "../prefabs/ufo";
import {Score} from "../prefabs/score";
import {Highscore} from "../server/highscore";

/*
 * Game state
 *
 * Active invaders game.
 */
export class Game extends Phaser.State {
    create() {
        let bg = this.add.sprite(0, 0, 'background');
        bg.scale.x = this.game.width/2000;
        bg.scale.y = this.game.height/2000;

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.bullets = this.add.group();
        this.ufos = this.add.group();
        this.player = new Player(this.game, this.game.world.centerX, this.game.world.height - 60, this.bullets);
        this.score = new Score(this.game, 5, 5);

        // Create grid of Ufos.

        const spacing = 80;
        for (let x = 0; x<12; x++) {
            for (let y = 0; y<4; y++) {
                let ufo = new Ufo(this.game, 20 + x*spacing, 20 + y*spacing);
                this.ufos.add(ufo);
            }
        }

        this.speed = 150;
        this.ufos.setAll('body.velocity.x', this.speed)
    }

    update() {
        this.moveUfos();

        if (this.ufos.getFirstAlive() == null) {
            let score = this.score.get();
            (async () => {
                await Highscore.submit({name: "William", score: score});
                this.game.state.start('end');
            })();
        }

        this.physics.arcade.overlap(this.player, this.ufos, (p : Phaser.Sprite, c : Phaser.Sprite) => {
            c.destroy();

            let score = this.score.get();
            (async () => {
                await Highscore.submit({name: "William", score: score});
                this.game.state.start('end');
            })();
        }, null, this);

        this.physics.arcade.overlap(this.bullets, this.ufos, (b : Phaser.Sprite, c : Ufo) => {
            c.damage(1);

            if (c.destroy()) {
                b.kill();

                this.score.inc(2);
            }
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

    private moveUfos() {
        let minX = 10000;
        let maxX = 0;
        this.ufos.forEachAlive((ufo : Ufo) => {
            minX = Math.min(minX, ufo.x);
            maxX = Math.max(maxX, ufo.x);
        }, this);

        if (minX < 5) {
            this.ufos.forEachAlive((ufo : Ufo) => {
                ufo.y += 10;
            }, this);
            this.ufos.setAll('body.velocity.x', this.speed);
        }
        if (maxX > this.game.width - 80) {
            this.ufos.forEachAlive((ufo : Ufo) => {
                ufo.y += 10;
            }, this);
            this.ufos.setAll('body.velocity.x', -this.speed);
        }
    }

    speed: number;

    score: Score;
    player: Player;
    bullets: Phaser.Group;
    ufos: Phaser.Group;
}
