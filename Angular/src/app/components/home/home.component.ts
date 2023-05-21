import { Component } from '@angular/core';
// import { GamesService } from 'src/app/services/games.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // games: any
  // constructor(gamesService: GamesService) {
  //   console.log(gamesService.GetAllGames())
  //   gamesService.GetAllGames().subscribe({
  //     next: (data) => {
  //       this.games = data
  //     },
  //     error: (err) => { }
  //   })
  // }

  currentindex = 0;
  timer:any;
  currentImageIndex = 0;

  images = [
    {
      src: '../../../assets/images/val.jpeg',
      title: 'Game 1',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      photo: [
        'https://i.ytimg.com/vi/_fPJoRFGZpc/maxresdefault.jpg',
        'https://th.bing.com/th/id/OIP._TdlTXLwsbDRxzgoAga19wEsC0?pid=ImgDet&rs=1',
        'https://th.bing.com/th/id/OIP.pHS9-oSfeh2Y2BtzLdoRzAAAAA?pid=ImgDet&w=255&h=255&rs=1',
        'https://i.ytimg.com/vi/h6sH1KYID44/maxresdefault.jpg'
      ]
    },
    {
      src: '../../../assets/images/cod.jpg',
      title: 'Game 2',
      content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      photo: [
        'https://th.bing.com/th/id/OIP._TdlTXLwsbDRxzgoAga19wEsC0?pid=ImgDet&rs=1',
        'https://i.ytimg.com/vi/h6sH1KYID44/maxresdefault.jpg',
        'https://th.bing.com/th/id/OIP.pHS9-oSfeh2Y2BtzLdoRzAAAAA?pid=ImgDet&w=255&h=255&rs=1',
        'https://i.ytimg.com/vi/_fPJoRFGZpc/maxresdefault.jpg',
      ]
    },
    {
      src: '../../../assets/images/lol.jpg',
      title: 'Game 3',
      content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      photo: [
        'https://th.bing.com/th/id/OIP._TdlTXLwsbDRxzgoAga19wEsC0?pid=ImgDet&rs=1',
        'https://i.ytimg.com/vi/_fPJoRFGZpc/maxresdefault.jpg',
        'https://i.ytimg.com/vi/h6sH1KYID44/maxresdefault.jpg',
        'https://th.bing.com/th/id/OIP.pHS9-oSfeh2Y2BtzLdoRzAAAAA?pid=ImgDet&w=255&h=255&rs=1',
      ]
    }
  ];


  photos = [
    { src: 'https://th.bing.com/th/id/OIP.ky02K_RaApV5EI5d0VvJLgHaEK?pid=ImgDet&rs=1', alt: 'Image 1' },
    { src: 'https://th.bing.com/th/id/R.0e249008936b54dd7e510ab07835eebc?rik=tJ4QvPsaUT8xvw&pid=ImgRaw&r=0', alt: 'Image 2' },
    { src: 'https://i.pinimg.com/originals/d0/ea/7d/d0ea7d697127bf515aa6d1e33001db0d.jpg', alt: 'Image 3' },
  ];

  ShowPrevious(){
    if(this.currentImageIndex > 0)
    {
      this.currentImageIndex--;
    }
    else
    {
      this.currentImageIndex = this.images.length-1;
    }

  }

  ShowNext(){
    if(this.currentImageIndex < this.images.length-1)
    {
      this.currentImageIndex++
    }
    else
    {
      this.currentImageIndex=0;
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
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }, 4000);
  }

  Stop(){
    clearInterval(this.timer);
  }

  setCurrentImage(index: number) {
    this.currentImageIndex = index;
    // this.ngOnInit1();
    this.Stop();
  }


}
