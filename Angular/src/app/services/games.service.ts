import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private readonly myClient: HttpClient) {}

  private readonly Base_URL = 'http://localhost:3000/api/products';

  GetAllGames() {
    // console.log (this.myClient.get(this.Base_URL));
    return this.myClient.get(this.Base_URL);
  }
  GetGameByID(id: any) {
    return this.myClient.get(this.Base_URL + '/' + id)

  }
}
