import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // image = [
  //   { src: 'https://th.bing.com/th/id/OIP.ky02K_RaApV5EI5d0VvJLgHaEK?pid=ImgDet&rs=1' },
  //   { src: 'https://th.bing.com/th/id/R.0e249008936b54dd7e510ab07835eebc?rik=tJ4QvPsaUT8xvw&pid=ImgRaw&r=0'},
  //   { src: 'https://i.pinimg.com/originals/d0/ea/7d/d0ea7d697127bf515aa6d1e33001db0d.jpg' }
  // ];
  // currentImage = '';
  // currentImageAlt = '';

  // setCurrentImage(image: any) {
  //   this.currentindex = image.src;
  //   this.currentImageAlt = image.alt;
  // }

  currentindex = 0;
  timer:any;
  currentImageIndex = 0;

  images = [
    {
      src: 'https://th.bing.com/th/id/OIP.ky02K_RaApV5EI5d0VvJLgHaEK?pid=ImgDet&rs=1',
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
      src: 'https://th.bing.com/th/id/R.0e249008936b54dd7e510ab07835eebc?rik=tJ4QvPsaUT8xvw&pid=ImgRaw&r=0',
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
      src: 'https://i.pinimg.com/originals/d0/ea/7d/d0ea7d697127bf515aa6d1e33001db0d.jpg',
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
  ngOnInit1() {
    this.timer = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images[this.currentImageIndex].photo.length;
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
