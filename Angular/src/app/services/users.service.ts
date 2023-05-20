import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static Register(formData: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private readonly myClient: HttpClient) {}

  private readonly Base_URL = 'http://localhost:3000/api/users';

  Login(body:any){
    return this.myClient.post(this.Base_URL+"/login", body);
  }
  Register(body:any){
    return this.myClient.post(this.Base_URL+"/register",body);
  }
}
