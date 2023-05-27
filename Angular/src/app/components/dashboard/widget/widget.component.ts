import { Component } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { GamesService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent {

  itemsCount: number = 0
  usersCount: number = 0
  ordersCount: number = 0

  constructor(private gamesService: GamesService, private userService: UserService, private orderService:OrdersService) {
    this.getAllItemsCount();
    this.getAllUsersCount();
    this.getAllOrdersCount();
  }

  getAllItemsCount() {
    this.gamesService.GetAllGames().subscribe((items: Object) => {
      this.itemsCount = Object.keys(items).length;
      // console.log(`Number of items: ${this.itemsCount}`);
    });
  }

  getAllUsersCount() {
    this.userService.getAllUsers().subscribe((users: Object) => {
      this.usersCount = Object.keys(users).length;
      // console.log(`Number of items: ${this.usersCount}`);
    });
  }

  getAllOrdersCount() {
    this.orderService.getAllOrders().subscribe((orders: Object) => {
      this.ordersCount = Object.keys(orders).length;
      // console.log(`Number of items: ${this.usersCount}`);
    });
  }
}
