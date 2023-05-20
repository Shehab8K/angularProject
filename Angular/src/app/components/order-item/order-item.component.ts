import { Component } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent {
  user: any;
  constructor(private userService: UserService) {
    const userObservable = userService.getCurrentUser()
    if (userObservable) {
      userObservable.subscribe({
        next: (data) => {
          this.user = data;
          console.log(this.user)
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }
}


