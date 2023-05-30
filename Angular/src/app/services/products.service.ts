import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private valueSubject: Subject<object> = new Subject<object>();
  value$: Observable<object> = this.valueSubject.asObservable();

  constructor(private readonly myClient: HttpClient) { }

  private readonly Base_URL = environment.apiURL + '/products';
  public panUserSubject:Subject<void> = new Subject <any>
  public panUserUpdateObservable: Observable <void> = this.panUserSubject.asObservable();
  GetAllGames() {
    // console.log (this.myClient.get(this.Base_URL));
    return this.myClient.get(this.Base_URL);
  }
  GetGameByID(id: any) {
    // return this.myClient.get(this.Base_URL + '/' + id)
    return this.myClient.get(this.Base_URL + '/' + id)

  }
  deleteGame(id: any) {
    console.log("in product service")
    console.log(this.Base_URL + '/' + id)

    return this.myClient.delete(this.Base_URL + '/' + id)

  }
  AddNewProduct(newProduct:any){
    console.log('in service')
    console.log(newProduct);
    // console.log(Array.isArray(newProduct.os))
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');  // Add the 'Content-Type' header
    headers.append('Accept', 'application/json');  // Add any other necessary headers
    return this.myClient.post(this.Base_URL,newProduct,{ headers });
  }

  UpdateProduct(newProduct:any, id:any){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');  // Add the 'Content-Type' header
    headers.append('Accept', 'application/json');  // Add any other necessary headers
    console.log("update service")
    console.log(newProduct)
    return this.myClient.put(this.Base_URL+"/"+id,newProduct,{ headers });
  }
}
