import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GamesService } from 'src/app/services/products.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard-products',
  templateUrl: './dashboard-products.component.html',
  styleUrls: ['./dashboard-products.component.css']
})
export class DashboardProductsComponent implements OnInit {
  displayedColumns: string[] = ['_id', 'name', 'date', 'price', 'actions'];
  dataSource!: MatTableDataSource<any>;
  productsTitle: string = "Games";
  games: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private gamesService: GamesService, private location: Location) { }

  ngOnInit() {
    this.gamesService.GetAllGames().subscribe(
      (data: Object) => {
        this.games = data as any[];
        this.dataSource = new MatTableDataSource(data as any[]);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteProduct(id: any) {
    this.gamesService.deleteGame(id).subscribe(
      {
        next:() => {
        this.removeDeletedProduct(id);
        this.dataSource = new MatTableDataSource(this.games);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    }
    );
  }

  removeDeletedProduct(id: any) {
    this.games = this.games.filter(game => game._id !== id);
  }
}
