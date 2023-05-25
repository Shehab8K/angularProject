import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private readonly myClient: HttpClient) { }

  private readonly Base_URL = environment.apiURL + '/products';

  GetAllGames() {
    // console.log (this.myClient.get(this.Base_URL));
    return this.myClient.get(this.Base_URL);
  }
  GetGameByID(id: any) {
    // return this.myClient.get(this.Base_URL + '/' + id)
    return this.myClient.get(this.Base_URL + '/' + id)

  }
  deleteGame(id: string) {
    console.log("in product service")
    console.log(this.Base_URL + '/' + id)

    return this.myClient.delete(this.Base_URL + '/' + id)

  }
  AddNewProduct(newProduct:any,){
    console.log('in service')
    console.log(newProduct);
    // console.log(Array.isArray(newProduct.os))
    return this.myClient.post(this.Base_URL,newProduct.imageURL[0]);

  }
}
