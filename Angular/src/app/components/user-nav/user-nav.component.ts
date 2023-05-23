import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent {
  public user:any;
  public myusername:any;
  public image:any;

  constructor(private userService: UserService, private router: Router) {
    const userObservable = this.userService.getCurrentUser()
    if (userObservable) {
      userObservable.subscribe({
        next: (data) => {
          this.user = data;
          this.myusername = this.user.username
          console.log("inside next "+this.myusername)
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

  logout(){
    this.userService.logout();
    this.myusername = null
  }
}
