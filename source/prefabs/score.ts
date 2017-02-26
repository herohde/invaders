/*
 * Score
 *
 * Simple game score UI element.
 */
export class Score extends Phaser.Group {
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game);

        const style = { font: "32px Arial", fill: "#fff" };
        this.txt = new Phaser.Text(game, x, y, "", style);
        this.add(this.txt);

        this.reset();
    }

    inc(num : number) {
        this._set(this.score + num);
    }

    reset() {
        this._set(0);
    }

    private _set(score: number) {
        this.score = score;
        this.txt.setText(this.score.toString());
    }

    private txt: Phaser.Text;
    private score: number;
}