import { Component } from '@angular/core';
import { Observable, firstValueFrom, switchMap } from 'rxjs';
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
    const userObservable = userService.getCurrentUser();

    if (userObservable) {
      userObservable.pipe(
        switchMap((userData) => { //to switch to the ordersObservable inside the userObservable subscription
          this.user = userData;
          console.log(this.user._id);

          // Fetch user orders
          const ordersObservable = orderService.GetUserOrders(this.user._id);

          if (ordersObservable) {
            return ordersObservable;
          } else {
            throw new Error('Failed to fetch user orders');
          }
        })
      ).subscribe({
        next: (data) => {
          this.orders = data;
          console.log(this.orders);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }

  }
  formatDate(dateString: string | null): string {
    if (dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    return '';
  }
}

