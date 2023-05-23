import { Component } from '@angular/core';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {

  user: any;
  constructor(private userService: UserService) {

    const userObservable = userService.getCurrentUser()
    if (userObservable) {
      userObservable.subscribe({
        next: (data) => {
          this.user = data;
          // console.log(this.user)
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }

  removeItem(g: any) {
    if (this.user.cart.length > 0) {
      const index = this.user.cart.findIndex((item: any) => item.id === g.id);
      if (index != -1) {
        this.user.cart.splice(index, 1);
        //{update actual user cart in db}
      }
    }

  }
}
