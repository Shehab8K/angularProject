// import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GamesService } from 'src/app/services/products.service';
// import { FiltersService } from 'src/app/services/filters.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.component.html',
  styleUrls: ['./all-games.component.css']
})

export class AllGamesComponent implements OnInit {
  tags: string[] = [];
  types: string[] = [];
  games: any
  rawData: any
  isFavorite: boolean = false;
  isAdded: boolean = false;
  priceRange: FormGroup;
  os: FormGroup;
  filteredGames: any[] = [];
  gameTags: any[] = [];

  constructor(private gamesService: GamesService, private formBuilder: FormBuilder,) {
    this.priceRange = this.formBuilder.group({
      range1: false,
      range2: false,
      range3: false,
      range4: false,
      range5: false,
      range6: false
    });
    this.os = this.formBuilder.group({
      mac: false,
      windows: false,
      linux: false
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      const data = await firstValueFrom(this.gamesService.GetAllGames());
      this.rawData = data;
      this.games = this.rawData;
      this.genTags();
    } catch (error) {
      console.error("An error occurred while retrieving the games", error);
    }
  }
  genTags() {
    if (this.games && this.games.length > 0) {
      this.games.forEach((game: any) => {
        game.tag.forEach((tag: string) => {
          if (!this.gameTags.includes(tag))
            this.gameTags.push(tag)
        });
      });
    }
    console.log(this.gameTags)
  }

  toggleFavorite(): void {
    // this.isFavorite = !this.isFavorite;
  }

  toggleAdded(): void {
    // this.isAdded = !this.isAdded;
  }
  onChangepriceRange(): void {
    const selectedPrice = Object.keys(this.priceRange.value).filter(option => this.priceRange.value[option]);
    console.log(selectedPrice);

  }

  onChangeOs(): void {
    const selectedOS = Object.keys(this.os.value).filter(option => this.os.value[option]);
    // console.log(selectedOS)
    this.rawData.forEach((game: any) => {
      if (game.os.some((os: string) => selectedOS.includes(os))) {
        if (!(this.filteredGames.some(obj => obj.name === game.name)))
          this.filteredGames.push(game)
      }
      else
        if (this.filteredGames.some(obj => obj.name === game.name))
          this.filteredGames.splice(game)

    });
    console.log(this.filteredGames)
    if (this.filteredGames.length > 0)
      this.games = this.filteredGames
    else
      this.games = this.rawData

    // console.log(selectedOS)
    // this.filtersService.FilterByOS(selectedOS).subscribe({
    //   next: (data) => {
    //     this.filteredGames = data
    //     this.games = this.filteredGames
    //     console.log(data)
    //   },
    //   error: (err) => { }
    // })
    // console.log(selectedOS);
  }

  onChangeTags(): void {
    // console.log(this.tags);
    this.rawData.forEach((game: any) => {
      if (game.tag.some((tag: string) => this.tags.includes(tag))) {
        if (!(this.filteredGames.some(obj => obj.name === game.name)))
          this.filteredGames.push(game)
      }
      else
        if (this.filteredGames.some(obj => obj.name === game.name))
          this.filteredGames.splice(game)

    });
    console.log(this.filteredGames)
    if (this.filteredGames.length > 0)
      this.games = this.filteredGames
    else
      this.games = this.rawData
  }
  onChangeTypes(): void {
    this.rawData.forEach((game: any) => {
      if (game.type.some((type: string) => this.types.includes(type))) {
        if (!(this.filteredGames.some(obj => obj.name === game.name)))
          this.filteredGames.push(game)
      }
      else
        if (this.filteredGames.some(obj => obj.name === game.name))
          this.filteredGames.splice(game)
    });
    console.log(this.filteredGames)
    if (this.filteredGames.length > 0)
      this.games = this.filteredGames
    else
      this.games = this.rawData
  }
  formatDate(dateString: string | null): string {
    if (dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    return '';
  }

}
