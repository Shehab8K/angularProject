import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from 'src/app/services/products.service';

@Component({
  selector: 'app-dashboard-product-details',
  templateUrl: './dashboard-product-details.component.html',
  styleUrls: ['./dashboard-product-details.component.css']
})
export class DashboardProductDetailsComponent implements OnInit {
  ID:any;
  game:any;
  constructor(myRoute:ActivatedRoute,public myService:GamesService ){
    this.ID=myRoute.snapshot.params["id"]
    // console.log(this.ID)
  }
  ngOnInit(): void {
   this.myService.GetGameByID(this.ID).subscribe(
    {
      next:(data)=>{
        this.game=data
      },
      error:(err)=>{console.log(err)}
    }
   )
  }
}
