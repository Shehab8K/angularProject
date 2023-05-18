import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home-cards',
  templateUrl: './home-cards.component.html',
  styleUrls: ['./home-cards.component.css']
})
export class HomeCardsComponent implements AfterViewInit {
  products = [
    {
      name: 'ARTFX DC UNIVERSE Batman HUSH Renewal Package',
      image: '../../../assets/images/batman.png',
      color: '',
      releaseDate: '31/03/2021',
      discountPrice: 9999,
      price : 9999
    },
    {
      name: 'Mafex No.091 MAFEX BLACK PANTHER',
      image: '../../../assets/images/blackpanter.png',
      color: '#1d1d1d',
      releaseDate: '31/03/2021',
      discountPrice: 2799
    },
    {
      name: 'Nendoroid Fate/Grand Order: Saber/Arthur Pendragon Ascension',
      image: '../../../assets/images/arthur.png',
      color: '#153a82',
      releaseDate: '31/03/2021',
      discountPrice: 1999,
        price: 9999
    },
    {
      name: 'figma Kantai Collection -Kan Colle- Kashima',
      image: '../../../assets/images/kashima.png',
      color: '#3f4a69',
      releaseDate: '31/03/2021',
      discountPrice: 2799,
      price: 9999
    },
    {
      name: 'Valorant Skye Female Character Neon Silhouette',
      image: '../../../assets/images/ValorantSkye.png',
      color: '#5AE173',
      releaseDate: '21/04/2021',
      discountPrice: 3299,
      price: 5315
    },
    {
      name: 'Nova-pubg',
      image: '../../../assets/images/pubg.png',
      color: '#04c3e5',
      releaseDate: '11/02/2021',
      discountPrice: 1299,
      price: 7415
    },
    {
      name: 'Battlefield',
      image: '../../../assets/images/Battlefield.png',
      color: '#F8A43A',
      releaseDate: '05/01/2021',
      discountPrice: 2599,
      price: 9215
    }
    ,
    {
      name: 'Roronoa Zoro Zorro',
      image: '../../../assets/images/Roronoa.png',
      color: '#904258',
      releaseDate: '09/03/2021',
      discountPrice: 9339,
      price: 9715
    }
    ,
    {
      name: 'Spoiler-Final Fantasy',
      image: '../../../assets/images/Spoiler.png',
      color: '#E6A9C8',
      releaseDate: '03/09/2021',
      discountPrice: 1339,
      price: 6715
    }
    
  ];


  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    //Producto a favoritos
    const Fav = this.el.nativeElement.querySelectorAll('.card .Fav');
    Fav.forEach((el: HTMLElement) => {
      this.renderer.listen(el, 'click', () => {
        el.closest('.card')?.classList.toggle('esFav');
      });
    });
    
    const toCart = this.el.nativeElement.querySelectorAll('.card .toCart');
    toCart.forEach((el: HTMLElement) => {
      this.renderer.listen(el, 'click', () => {
        el.closest('.card')?.classList.toggle('enCarrito');
      });
    }); }

    
}