import { Component } from '@angular/core';
import { GamesService } from 'src/app/services/products.service';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent {
  games: any
  isFavorite: boolean = false;
  isAdded: boolean = false;

  constructor(gamesService: GamesService) {
    // console.log(gamesService.GetAllGames())
    gamesService.GetAllGames().subscribe({
      next: (data) => {
        this.games = data
      },
      error: (err) => { }
    })
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

  toggleAdded(): void {
    this.isAdded = !this.isAdded;
  }

}
