import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly Base_URL = environment.apiURL + "/orders"; //localhost:3000/api
public orderChngStatusSubject:Subject<void> = new Subject <any>
public orderUpdateChngObservable: Observable <void> = this.orderChngStatusSubject.asObservable();
  constructor(private readonly myClient: HttpClient) { }

  GetUserOrders(id: string) {
    return this.myClient.get(this.Base_URL + '/user/' + id)
  }

  deleteOrder(id: string) {
    console.log("in order service")
    console.log(this.Base_URL + '/' + id)
    return this.myClient.delete(this.Base_URL + '/' + id)
  }

  createOrder(data: any): Observable<any> {
    // console.log('create');
    return this.myClient.post(this.Base_URL + '/', data);
  }

  getAllOrders(){
    return this.myClient.get(this.Base_URL);
  }

  chngOrderStatus(id:any,body:any){
    return this.myClient.put(this.Base_URL+ "/"+id,body)
  }

}
