import { Component } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-dashboard-orders',
  templateUrl: './dashboard-orders.component.html',
  styleUrls: ['./dashboard-orders.component.css']
})
export class DashboardOrdersComponent {
  ordersTitle: string = 'Orders';
  allOrders: any[] = [];
  pendingOrders:any[]=[];
  acceptedOrders:any[]=[];
  rejectedOrders:any[]=[];

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.ordersService.getAllOrders().subscribe(
   {
       next:(data: Object) => {
        this.allOrders = data as any[];
        this.filterOrders();
        console.log("accepted:",this.acceptedOrders);
        console.log("rejected:",this.rejectedOrders);
        console.log("pending:",this.pendingOrders);
       console.log(this.allOrders)

      },
      error:(error) => {
        console.log(error);
      }}
    );
  }
  filterOrders(){
    this.acceptedOrders=this.allOrders.filter(order => order.status === "accepted");
    this.pendingOrders=this.allOrders.filter(order => order.status === "pending");
    this.rejectedOrders=this.allOrders.filter(order => order.status === "rejected");

  }
}
