import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent {
  public user: any;
  public myusername: any;
  public image: any;
  @Output() loggedOut: EventEmitter<void> = new EventEmitter<void>();

  constructor(private userService: UserService, private router: Router,private cdr: ChangeDetectorRef,) {
    const userObservable = this.userService.getCurrentUser()
    if (userObservable) {
      userObservable.subscribe({
        next: (data) => {
          this.user = data;
          this.myusername = this.user.username
          console.log("inside next " + this.myusername)
        },
        error: (err) => {
          console.log(err)
        }
      })
    }

  }

  toggleWrap() {
    const userWrap = document.getElementById('usrWrap');
    userWrap?.classList.toggle('expand');
  }
  refresh() {
    this.loggedOut.emit();
  }
  logout() {
    this.userService.logout();    
    this.loggedOut.emit();
    this.myusername = null
    location.reload()

  }
}
