import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly myClient: HttpClient) {}

  private readonly Base_URL = 'http://localhost:3000/api/users';

  Login(body:any){
    console.log("Inside Service");
    return this.myClient.post(this.Base_URL+"/login", body);
  }
}
