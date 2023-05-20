import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment  } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private readonly myClient: HttpClient) {}

  private readonly Base_URL = environment.apiURL;

  GetAllGames() {
    // console.log (this.myClient.get(this.Base_URL));
    return this.myClient.get(this.Base_URL+'/products');
  }
  GetGameByID(id: any) {
    return this.myClient.get(this.Base_URL + '/products/' + id)

  }
}
