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
      image: 'https://firebasestorage.googleapis.com/v0/b/fotos-3cba1.appspot.com/o/batman.png?alt=media&token=bcce964a-7224-4e47-b619-265e93b5311e',
      color: '',
      releaseDate: '31/03/2021',
      discountPrice: 9999,
      price : 9999
    },
    {
      name: 'Mafex No.091 MAFEX BLACK PANTHER',
      image: 'https://firebasestorage.googleapis.com/v0/b/fotos-3cba1.appspot.com/o/blackpanter.png?alt=media&token=de5d3491-e31f-4d91-aa3d-1eb15827d954',
      color: '#1d1d1d',
      releaseDate: '31/03/2021',
      price: 2799
    },
    {
      name: 'Nendoroid Fate/Grand Order: Saber/Arthur Pendragon Ascension',
      image: 'https://firebasestorage.googleapis.com/v0/b/fotos-3cba1.appspot.com/o/arthur.png?alt=media&token=7e0f09e6-1369-42c5-9c98-af99946fae72',
      color: '#153a82',
      releaseDate: '31/03/2021',
      discountPrice: 1999,
        price: 9999
    },
    {
      name: 'figma Kantai Collection -Kan Colle- Kashima',
      image: 'https://firebasestorage.googleapis.com/v0/b/fotos-3cba1.appspot.com/o/kashima.png?alt=media&token=ffed0174-7dbe-4b61-bd42-05608a3a3090',
      color: '#3f4a69',
      releaseDate: '31/03/2021',
      discountPrice: 2799,
      price: 9999
    }
  ];


  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    //Producto a favoritos
    const aFavs = this.el.nativeElement.querySelectorAll('.card .aFavs');
    aFavs.forEach((el: HTMLElement) => {
      this.renderer.listen(el, 'click', () => {
        el.closest('.card')?.classList.toggle('esFav');
      });
    });
    
    const alCarrito = this.el.nativeElement.querySelectorAll('.card .alCarrito');
    alCarrito.forEach((el: HTMLElement) => {
      this.renderer.listen(el, 'click', () => {
        el.closest('.card')?.classList.toggle('enCarrito');
      });
    }); }

    
}