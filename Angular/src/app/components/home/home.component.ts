import { Component } from '@angular/core';
import { GamesService } from 'src/app/services/products.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  currentindex = 0;
  timer:any;
  // currentImageIndex = 0;

  items: any[] = [];
  images: any[] = []
  currentIndex: number = 0;

  constructor(private gamesService: GamesService) {
    this.getGames();

    // console.log('items oninit:', this.items)
   }

   getGames() {
    this.gamesService.GetAllGames().subscribe(
      (response: Object) => {
        this.items = response as any[];
        this.images = this.items.map((item: any) => item.images);
        // this.images = this.items[this.currentIndex];
        console.log('items:', this.items);
        console.log('images:', this.images);
      },
      (error) => {
        console.error('Error retrieving games:', error);
      }
    );
  }
  currentImageIndex: number = 0;

  // getGames() {
  //   this.gamesService.GetAllGames().subscribe(
  //     (response: Object) => {
  //       this.items = response as any[];
  //       console.log('items:', this.items);
  //     },
  //     (error) => {
  //       console.error('Error retrieving games:', error);
  //     }
  //   );
  // }





  ShowPrevious(){
    if(this.currentIndex > 0)
    {
      this.currentIndex--;
      console.log('images:', this.images[this.currentIndex]);
    }
    else
    {
      this.currentIndex = this.items.length-1;
    }

  }

  ShowNext(){

    if(this.currentIndex < this.items.length-1)
    {
      this.currentIndex++
    }
    else
    {
      this.currentIndex=0;
    }

  }

  onMouseOver() {
    this.Stop();
  }

  onMouseOut() {
    this.ngOnInit();
  }

  ngOnInit() {

    this.timer = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
    }, 4000);
  }

  Stop(){
    clearInterval(this.timer);
  }



}
