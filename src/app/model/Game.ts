export default interface Game {
    board: Array<Array<0 | 1 | -1>>;
    player: 0 | 1;
    round: number;
    finish: boolean;
    result: string;
}

