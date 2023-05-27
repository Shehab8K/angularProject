import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersService } from 'src/app/services/orders.service';


@Component({
  selector: 'app-accepted-orders',
  templateUrl: './accepted-orders.component.html',
  styleUrls: ['./accepted-orders.component.css']
})
export class AcceptedOrdersComponent {
  allOrders: any[] = [];
  racceptedOrders:any[]=[];

  displayedColumns: string[] = ['_id', 'numGames', 'total'];
  dataSource!: MatTableDataSource<any>;
@Input() acceptedOrdersChild!:any[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private ordersService:OrdersService) { }

  ngOnInit() {
    this.ordersService.getAllOrders().subscribe(
   {
       next:(data: Object) => {
        this.allOrders = data as any[];
    this.racceptedOrders=this.allOrders.filter(order => order.status === "accepted");

        this.dataSource = new MatTableDataSource(this.racceptedOrders);
        this.dataSource.paginator = this.paginator;
      },
      error:(error) => {
        console.log(error);
      }}
    );
  }
}
