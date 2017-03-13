import {Highscore} from "../server/highscore";

/*
 * End state
 *
 * Game over.
 */
export class End extends Phaser.State {
    create() {
        this.add.sprite(0, 0, 'splash');

        const style = { font: "32px Arial", fill: "#ff0000" };
        this.game.add.text(this.game.width/4, this.game.height/2, "Game over. You were awesome!", style);

        (async () => {
            let y = this.game.width/4 + 40;

            let list = await Highscore.top();
            for (let elm of list) {
                const style = { font: "20px Arial", fill: "#ff0000" };
                this.game.add.text(200, y, " " + elm.name + "    " + elm.score, style);
                y += 20;
            }
        })();

    }
}
