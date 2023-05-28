import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersService } from 'src/app/services/orders.service';


@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css']
})
export class PendingOrdersComponent {
  allOrders: any[] = [];
  acceptedOrders:any[]=[];

  displayedColumns: string[] = ['_id', 'numGames', 'total','action'];
  dataSource!: MatTableDataSource<any>;
@Input() acceptedOrdersChild!:any[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private ordersService:OrdersService) {
    this.filterPendingOrders();

   }

  ngOnInit() {
    this.ordersService.orderUpdateChngObservable.subscribe(()=>{
      this.filterPendingOrders();
    })
  }
  filterPendingOrders(){
this.ordersService.getAllOrders().subscribe({
  next:(data: Object) => {
    this.allOrders = data as any[];
this.acceptedOrders=this.allOrders.filter(order => order.status === "pending");

    this.dataSource = new MatTableDataSource(this.acceptedOrders);
    this.dataSource.paginator = this.paginator;
  },
  error:(error) => {
    console.log(error);
  }
})
  }

  chngStatus(id:any,status:string){
    const body={status:status}
    this.ordersService.chngOrderStatus(id,body).subscribe({
      next:()=>{
        this.ordersService.orderChngStatusSubject.next();
        console.log("done")
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  

}
