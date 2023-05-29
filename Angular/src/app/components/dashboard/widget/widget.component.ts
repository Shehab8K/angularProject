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
  acceptedOrders:any[] = []
  countAcceptedOrders: number = 0
  revenue:number = 0

  constructor(private gamesService: GamesService, private userService: UserService, private orderService:OrdersService) {
    this.getAllItemsCount();
    this.getAllUsersCount();
    this.getAllOrdersCount();
    this.getRevenue();
  }

  getAllItemsCount() {
    this.gamesService.GetAllGames().subscribe({
      next: (items:Object) => {
        this.itemsCount = Object.keys(items).length;
      },
      error: (err) => {
        console.log(err);
      }
  });
  }

  getAllUsersCount() {
    this.userService.getAllUsers().subscribe({
      next: (users:Object) => {
        this.usersCount = Object.keys(users).length;
      },
      error: (err) => {
        console.log(err);
      }
  });
  }

  getRevenue() {
    this.orderService.getAllOrders().subscribe({
        next: (items:any) => {
        this.acceptedOrders = Object.keys(items).filter((order: any) => items[order].status == 'accepted')
        this.countAcceptedOrders = this.acceptedOrders.length
        for(let i =0; i < this.acceptedOrders.length; i++){
          this.revenue = this.revenue + items[this.acceptedOrders[i]].total
        }
        },
        error: (err) => {
          console.log(err);
        }
    });
  }

  getAllOrdersCount() {
    this.orderService.getAllOrders().subscribe({
      next: (orders:Object) => {
        this.ordersCount = Object.keys(orders).length;
      },
      error: (err) => {
        console.log(err);
      }
  });
  }

}
