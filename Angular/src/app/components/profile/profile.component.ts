import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const userObservable = this.userService.getCurrentUser()
    if (userObservable) {
      userObservable.subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }


}
