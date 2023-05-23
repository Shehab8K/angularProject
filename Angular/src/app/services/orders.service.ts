import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly Base_URL = environment.apiURL + "/orders"; //localhost:3000/api

  constructor(private readonly myClient: HttpClient) { }

  GetUserOrders(id: string) {
    return this.myClient.get(this.Base_URL + '/user/' + id)
  }

  deleteOrder(id: string) {
    console.log("in order service")
    console.log(this.Base_URL + '/' + id)
    return this.myClient.delete(this.Base_URL + '/' + id)

  }
}
