import {Highscore} from "../server/highscore";

/*
 * End state
 *
 * Game over.
 */
export class End extends Phaser.State {
    create() {
        let bg = this.add.sprite(0, 0, 'splash');
        bg.width = this.game.width;
        bg.height = this.game.height;

        bg.inputEnabled = true;
        bg.events.onInputDown.add(() => {
            this.game.state.start('game');
        }, this);

        const style = { font: "64px Arial", fill: "#ffffff", align: "center" };
        let text = this.game.add.text(this.game.width/2, this.game.height/3, "Game over. You were awesome!", style);
        text.anchor.setTo(0.5, 0.5);

        (async () => {
            let x = text.x - text.width/4;
            let y = text.y + text.height/2 + 20;

            let list = await Highscore.top();
            let i = 1;
            for (let elm of list) {
                const style = { font: "20px Arial", fill: "#ff0000" };
                let line = this.game.add.text(x, y, "[" + i + "]", style);
                this.game.add.text(x + 40, y, elm.name, style);
                this.game.add.text(x + 300, y, elm.score + " pts", style);

                y += line.height;
                i++;
            }
        })();
    }
}
