import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tic-tac-toe';
  currentPlayer: 'X' | 'O';

  grid = [
    [ {player: ''}, { player: '' }, {player: ''} ],
    [ {player: ''}, { player: '' }, {player: ''} ],
    [ {player: ''}, { player: '' }, {player: ''} ]
  ];

  constructor() {
    this.currentPlayer = 'X';
  }

  checkRows(): string {
    for (const row of this.grid) {
      if (row[0].player && row[0].player === row[1].player &&
        row[1].player && row[1].player === row[2].player) {
        return row[0].player;
      }
    }
    return '';
  }

  checkColumns(): string {
    for (let i = 0; i < 3; i++) {
      if (this.grid[0][i].player && this.grid[0][i].player === this.grid[1][i].player &&
        this.grid[1][i].player && this.grid[1][i].player === this.grid[2][i].player) {
          return this.grid[0][i].player;
        }
    }
    return '';
  }

  checkDiagonal(): string {
    if (this.grid[0][0].player && this.grid[0][0].player === this.grid[1][1].player &&
      this.grid[1][1].player && this.grid[1][1].player === this.grid[2][2].player) {
        return this.grid[0][0].player;
      }
    if (this.grid[0][2].player && this.grid[0][2].player === this.grid[1][1].player &&
      this.grid[1][1].player && this.grid[1][1].player === this.grid[2][0].player) {
        return this.grid[0][2].player;
      }
    return '';
  }

  clearGrid(): void {
    for (const row of this.grid) {
      for (const block of row) {
        block.player = '';
      }
    }
  }

  gameWon(player: string): void {
    alert(`Player ${player} won the game`);
    this.clearGrid();
    this.currentPlayer = 'X';
  }

  checkCompletion(): void {
    let playerWon = this.checkRows();
    if (playerWon) {
      this.gameWon(playerWon);
      return;
    }
    playerWon = this.checkColumns();
    if (playerWon) {
      this.gameWon(playerWon);
      return;
    }
    playerWon = this.checkDiagonal();
    if (playerWon) {
      this.gameWon(playerWon);
    }
  }

  handleClick(i: number, j: number): void {
    if (this.grid[i][j].player) {
      return;
    }
    this.grid[i][j].player = this.currentPlayer;
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';

    this.checkCompletion();
  }
}
