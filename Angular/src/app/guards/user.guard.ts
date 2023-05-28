import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

// Only Admins & users, This Guard is useless for now
// As guests will be forwarded to login if needed but I will keep it for future work :)

@Injectable({
  providedIn: 'root',
})
export class UserGuard {
  constructor(private router: Router, private auth: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
      const role = this.auth.getRole();
    if (role !== 'user' && role !== 'admin') {
      console.log(role);
      this.router.navigate(['/401']); //Useless for now
    }
    return true;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const role = this.auth.getRole();
    if (role !== 'user' && role !== 'admin') {
      console.log(role);
      this.router.navigate(['/401']); //Useless for now
    }
    return true;
  }
}
