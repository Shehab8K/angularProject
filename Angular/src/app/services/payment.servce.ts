import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly Base_URL = environment.apiURL + "/payment"; //localhost:3000/api

  constructor(private readonly myClient: HttpClient) { }

  createPayment(data: any): Observable<any> {
    return this.myClient.post(this.Base_URL + '/charge', data);
  }
}
