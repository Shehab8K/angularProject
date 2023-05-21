import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly Base_URL = environment.apiURL;

  constructor(private readonly myClient: HttpClient) { }

  GetUserOrders(id: string) {
    return this.myClient.get(this.Base_URL + '/orders/user/' + id)
  }
}
