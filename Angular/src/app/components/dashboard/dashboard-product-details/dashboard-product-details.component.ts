import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from 'src/app/services/products.service';

@Component({
  selector: 'app-dashboard-product-details',
  templateUrl: './dashboard-product-details.component.html',
  styleUrls: ['./dashboard-product-details.component.css']
})
export class DashboardProductDetailsComponent implements OnInit {
  Title: string="Game details";
  hoveredImageUrl: string = ""; // Added hoveredImageUrl property
  defaultImageUrl: string = "../../../../assets/images/giphy.gif"; // Set a default image URL
  ID:any;
  game:any;
  constructor(myRoute:ActivatedRoute,public myService:GamesService ){
    this.ID=myRoute.snapshot.params["id"]
    // console.log(this.ID)
  }
  ngOnInit(): void {
    this.myService.GetGameByID(this.ID).subscribe(
      {
        next: (data) => {
          this.game = data;
        },
        error: (err) => { console.log(err); }
      }
    );
  }

  displayLargeImage(imageUrl: string) {
    this.hoveredImageUrl = imageUrl;
  }
}