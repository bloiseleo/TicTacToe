import Game from "./Game";

export class WinPolicy {
    constructor(private game: Game) {}
    get rowLength() {
        return this.game.board[0].length;
    }
    get columnLength() {
        return this.game.board.length;
    }
    getRow(i: number): Array<0 | 1 | -1> {
        return this.game.board[i];
    }
    get player() {
        return this.game.player;
    }
    private async checkLine(x: number): Promise<boolean> {
        const row = this.getRow(x);
        let i = 0;
        while(i < row.length) if(row[i++] != this.player) return false;
        return true;
    }
    private async checkColumn(y: number): Promise<boolean> {
        let i = 0;
        const line = this.game.board.reduce((arr, row) => { arr.push(row[y]); return arr }, []);
        while(i < line.length)  if(line[i++] != this.player) return false;
        return true;
    }
    private async checkCrossLeft() {
        let i = 0;
        while(i < this.game.board.length) if(this.game.board[i][i++] != this.player) return false;
        return true;
    }
    private async checkCrossRight() {
        let t = this.game.board.length - 1;
        let r = 0
        while(t >= 0) if(this.game.board[r++][t--] != this.player) return false;
        return true;
    }
    check(lastPlayedPoint: {x: number, y: number}): Promise<boolean> {
        return new Promise((resolve, _) => {
            Promise.all([this.checkLine(lastPlayedPoint.x), this.checkColumn(lastPlayedPoint.y), this.checkCrossLeft(), this.checkCrossRight()])
            .then(res => res.filter(r => r))
            .then(res => resolve(res.length > 0)); // Se é maior que 0, já ganhou
        });
    }
}
