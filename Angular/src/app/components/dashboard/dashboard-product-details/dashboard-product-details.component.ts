import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from 'src/app/services/products.service';

@Component({
  selector: 'app-dashboard-product-details',
  templateUrl: './dashboard-product-details.component.html',
  styleUrls: ['./dashboard-product-details.component.css']
})
export class DashboardProductDetailsComponent implements OnInit {
  Title: string = "Game details";
  hoveredImageUrl: string = "";
  firstImage: string = "";
  currentSlideIndex = 0;

  ID: any;
  game: any;

  constructor(private route: ActivatedRoute, private gameService: GamesService) { }

  ngOnInit(): void {
    this.ID=this.route.snapshot.params["id"]
    this.loadGameDetails();
  }

  loadGameDetails(): void {
    this.gameService.GetGameByID(this.ID).subscribe(
      {
        next: (data) => {
          this.game = data;
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
  }

  }
