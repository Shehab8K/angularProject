import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { switchMap } from 'rxjs';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  options = [
    { label: 'Accepted', value: 'accepted' },
    { label: 'Pending', value: 'pending' },
    { label: 'Rejected', value: 'rejected' }
  ];
  constructor(private orderService: OrdersService, private userService: UserService, private cdr: ChangeDetectorRef) { }
  user: any;
  filteredOrders: any[] = []
  orders: any

  ngOnInit(): void {
    this.radioControl.setValue('pending'); //let pending be pre-selected
    this.fetchData()
  }
  fetchData() {
    const userObservable = this.userService.getCurrentUser(); //get current user
    if (userObservable) {
      userObservable.pipe(
        switchMap((userData) => { //to switch to the orders Observable inside the user Observable subscription
          this.user = userData;
          // Fetch user orders
          const ordersObservable = this.orderService.GetUserOrders(this.user._id);
          if (ordersObservable) {
            return ordersObservable;
          } else {
            throw new Error('Failed to fetch user orders');
          }
        })
      ).subscribe({
        next: (data: any) => {
          this.orders = data;
          this.filterData();
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    }
  }
  radioControl = new FormControl();

  get selectedValue(): string {
    return this.radioControl.value;
  }
  filterData() {
    const valueToFilter = this.selectedValue
    this.filteredOrders = this.orders.filter((order: any) => order.status == valueToFilter);
  }
  refresh() {
    console.log("refreshing")
    this.fetchData()
    this.cdr.detectChanges();
  }
}
