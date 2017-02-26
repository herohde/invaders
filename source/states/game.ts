import {Player} from "../prefabs/player"
import {Ufo} from "../prefabs/ufo";
import {Score} from "../prefabs/score";

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
        this.player = new Player(this.game, 50, this.game.height - 50, this.bullets);
        this.score = new Score(this.game, 5, 5);

        // Create grid of Ufos.

        const spacing = 80;

        for (let x = 0; x<12; x++) {
            for (let y = 0; y<4; y++) {
                let ufo = new Ufo(this.game, 20 + x*spacing, 20 + y*spacing);
                this.ufos.add(ufo);
            }
        }

        this.ufos.setAll('body.velocity.x', 30)
    }

    update() {
        this.moveUfos();

        this.physics.arcade.overlap(this.player, this.ufos, (p : Phaser.Sprite, c : Phaser.Sprite) => {
            c.destroy();
            this.game.state.start('end');
        }, null, this);

        this.physics.arcade.overlap(this.bullets, this.ufos, (b : Phaser.Sprite, c : Ufo) => {
            if (c.destroy()) {
                this.score.inc(10);
                b.kill();
            }
        }, null, this);
    }

    private moveUfos() {
        let minX = 10000;
        let maxX = 0;
        this.ufos.forEachAlive((ufo : Ufo) => {
            minX = Math.min(minX, ufo.x)
            maxX = Math.max(maxX, ufo.x)
        }, this);

        if (minX < 5) {
            this.ufos.setAll('body.velocity.x', 30)
        }
        if (maxX > this.game.width - 80) {
            this.ufos.setAll('body.velocity.x', -30)
        }
    }

    score: Score;
    player: Player;
    bullets: Phaser.Group;
    ufos: Phaser.Group;
}
