import { Component } from '@angular/core';
import { GamesService } from 'src/app/services/products.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent {
  constructor(private gamesService: GamesService) {
    this.gamesService.GetAllGames();
  }


}
