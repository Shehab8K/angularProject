import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})

// Only Admins can Access

export class AdminGuard {
  constructor(private router: Router, private auth: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.auth.getRole() !== 'admin') {
      this.router.navigate(['/403']);
    }
    return true;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Make logic for admin if needed
    if (this.auth.getRole() !== 'admin') {
      this.router.navigate(['/403']);
    }
    return true;
  }
}
