import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RowComponent } from './row/row.component';
import { CommonModule } from '@angular/common';
import Game from './model/Game';
import { WinPolicy } from './model/WinPolicy';
import RoundeFinished from './events/RoundFinished';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RowComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TicTacToe';
  game: Game = {
    board: [
      [-1,-1,-1],
      [-1,-1,-1],
      [-1,-1,-1]
    ],
    player: 0,
    round: 0,
    finish: false,
    result: ''
  };
  winPolicy: WinPolicy = new WinPolicy(this.game);
  finish(win: boolean, draw: boolean) {
    this.game.finish = true;
    this.game.result = draw ? "Empate!": win ? `O jogador ${this.parsePlayer(this.game.player)} ganhou!`: '';
  }
  parsePlayer(p: number): string {
    return p == 0 ? 'O': 'X';
  }
  setItem(px: number, {py}: RoundeFinished) {
    if(this.game.board[px][py] != -1 || this.game.finish) {
      return;
    }
    this.game.board[px][py] = this.game.player;
    this.nextRound({px, py: py});
  }
  async nextRound({px, py}: {px: number, py: number}) {
    const win = await this.winPolicy.check({x: px, y: py});
    if(win) {
      this.finish(true, false);
      return;
    }
    this.game.player = this.game.player == 0 ? 1: 0;
    this.game.round++;
    if(this.game.round == 9) {
      this.finish(false, true);
    }
  }
}
