import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from 'src/app/services/products.service';
import { GalleryItem, ImageItem } from 'ng-gallery';

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
  images: GalleryItem[] = [];

  ID: any;
  game: any;

  constructor(private route: ActivatedRoute, private gameService: GamesService) { }

  ngOnInit(): void {
    this.ID=this.route.snapshot.params["id"]
    this.loadGameDetails();
  }
  assignImages() {
    this.game.images.forEach((img: string) => {
      this.images.push(new ImageItem({ src: img, thumb: img })
      )
    });
  }

  loadGameDetails(): void {
    this.gameService.GetGameByID(this.ID).subscribe(
      {
        next: (data) => {
          this.game = data;
          this.assignImages()
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
  }

  }