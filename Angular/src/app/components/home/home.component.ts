import { Component, ElementRef, ViewChild } from '@angular/core';
import { GamesService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  currentindex = 0;
  timer: any;
  images: string[] = [];
  name = '';
  items: any[] = [];
  hoveredImageUrl = '';
  firstImage = '';

  @ViewChild('aboutSection') aboutSection!: ElementRef;

  constructor(private gamesService: GamesService) {
    this.getGames();
  }

  displayLargeImage(imageUrl: string): void {
    this.hoveredImageUrl = imageUrl;
    this.Stop();
  }

  getGames() {
    this.gamesService.GetAllGames().subscribe(
      (response: Object) => {
        this.items = response as { images: any[] }[];
        this.images = this.items.map((item: any) => item.images);
        this.updateFirstImage();
        console.log('items:', this.items);
        console.log('images:', this.images[0]);
        console.log('firstImage:', this.firstImage);
      },
      (error) => {
        console.error('Error retrieving games:', error);
      }
    );
  }


  updateFirstImage() {
    if (this.items && this.items.length > 0) {
      const currentItem = this.items[this.currentindex];
      // if (currentItem && currentItem.images && currentItem.images.length > 0) {
        this.firstImage = currentItem.images[0];
      // }
    }
  }

  ShowPrevious() {
    if (this.currentindex > 0) {
      this.currentindex--;
    } else {
      this.currentindex = this.items.length - 1;
    }
    this.updateFirstImage();
  }

  handleNavigateToSection() {
    this.aboutSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  ShowNext() {
    if (this.currentindex < this.items.length - 1) {
      this.currentindex++;
    } else {
      this.currentindex = 0;
    }
    this.updateFirstImage();
  }

  onMouseOver() {
    this.Stop();
  }

  onMouseOut() {
    this.hoveredImageUrl =''
    this.Start();
  }

  ngOnInit() {
    this.Start();
  }

  Start() {
    this.timer = setInterval(() => {
      this.currentindex = (this.currentindex + 1) % this.items.length;
      this.updateFirstImage();
    }, 4000);
  }

  Stop() {
    clearInterval(this.timer);
  }


}
