import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static Register(formData: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private readonly myClient: HttpClient, private authService: AuthService) { }

  private readonly Base_URL = environment.apiURL;

  Login(body: any) {
    return this.myClient.post(this.Base_URL + "/users/login", body);
  }
  Register(body: any) {
    return this.myClient.post(this.Base_URL + "/users/register", body);
  }
  getCurrentUser() {
    const token = this.authService.getToken('user');
    try {
      if (token) {
        const decodedToken: any = jwt_decode(token);
        return this.getUserByID(decodedToken.id)
      }
    }
    catch (err) {

    }
    return null
  }
  getUserByID(id: any) {
    return this.myClient.get(this.Base_URL + '/users/' + id)
  }

  logout(){
    localStorage.removeItem('user');
  }
}
