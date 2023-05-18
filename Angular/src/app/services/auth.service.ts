import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  getToken(token: string): string | null {
    return localStorage.getItem(token);
  }

  setToken(token: any){
    localStorage.setItem('user', JSON.stringify(token));
  }

  removeToken(token: string){
    localStorage.removeItem(token);
  }

  getRole()
  {
    const storedToken = localStorage.getItem('user');
    try {
      // We need to send the token to server-side for vefication
      if (storedToken) {
        const decodedToken: any = jwt_decode(storedToken);

        const role = decodedToken.role;

        switch(role)
        {
          case 'admin':
            return 'admin';

          case 'user':
            return 'user';

          default:
            return 'other role';
        }

      } else {
        // Handle case when no token is found in local storage
        return 'guest';
      }
    } catch (error) {
      return {"message : ": error }
    }
  }

  isLoggedIn()
  {
    return this.getToken('user') !== null;
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
