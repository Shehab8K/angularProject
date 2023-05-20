import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment  } from 'src/enviroments/enviroment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  static Register(formData: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private readonly myClient: HttpClient) {}

  private readonly Base_URL = environment.apiURL;

  Login(body:any){
    return this.myClient.post(this.Base_URL+"/users/login", body);
  }
  Register(body:any){
    return this.myClient.post(this.Base_URL+"/users/register",body);
  }
}
