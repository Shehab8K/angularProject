import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router, private auth: AuthService, private toastr:ToastrService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.auth.isLoggedIn()) {
      this.toastr.error('Please Log In!');
      this.router.navigate(['/login']);
    }
    return this.auth.isLoggedIn();
  }
}
