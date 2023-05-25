import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { cleanData } from 'jquery';
import { GamesService } from 'src/app/services/products.service';

@Component({
  selector: 'app-dashboard-products',
  templateUrl: './dashboard-products.component.html',
  styleUrls: ['./dashboard-products.component.css']
})
export class DashboardProductsComponent implements OnInit {
  displayedColumns: string[] = ['_id','name','date', 'price', 'actions'];
  dataSource!: MatTableDataSource<any>;
  productsTitle:string="Games";
  
constructor (public gamesService: GamesService){
// console.log(gamesService.GetAllGames());
}
ngOnInit() {
  this.gamesService.GetAllGames().subscribe(
    {
      next:(data) => {
    this.dataSource = new MatTableDataSource(data as any[]);
  },
  error:(err)=>{console.log(err)}
});
}
}
