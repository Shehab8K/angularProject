import { Component } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent {
  user: any;
  orders: any;
  constructor(private userService: UserService, private orderService: OrdersService) {
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
    // const ordersObservable = orderService.GetUserOrders(this.user.id)
    // if (ordersObservable) {
    //   ordersObservable.subscribe({
    //     next: (data) => {
    //       this.orders = data;
    //       console.log(this.orders)
    //     },
    //     error: (err) => {
    //       console.log(err)
    //     }
    //   })
    // }
  }
}


