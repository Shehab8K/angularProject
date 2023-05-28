import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GamesService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/users.service';
import { GalleryItem, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-game-show',
  templateUrl: './game-show.component.html',
  styleUrls: ['./game-show.component.css']
})
export class GameShowComponent implements OnInit {
  gameID: any;
  game: any;
  isLoggedIn: boolean = false;
  user: any;
  cart: any[] = []
  images: GalleryItem[] = [];

  constructor(route: ActivatedRoute, private gameService: GamesService, private authService: AuthService, private userService: UserService) {
    this.gameID = route.snapshot.params["id"]
  }

  ngOnInit(): void {
    this.gameService.GetGameByID(this.gameID).subscribe({
      next: (data) => {
        this.game = data
        this.assignImages()
      },
      error: (err) => {
        console.log(err)
      }
    })
    const userObservable = this.userService.getCurrentUser()
    if (userObservable) {
      userObservable.subscribe({
        next: (data) => {
          this.user = data;
          this.cart = this.user.cart
          this.isloggedIn();
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }
  assignImages() {
    this.game.images.forEach((img: string) => {
      this.images.push(new ImageItem({ src: img, thumb: img })
      )
    });
  }
  isloggedIn() {
    this.isLoggedIn = this.authService.isLoggedIn()
  }

  isInCart(): boolean {
    const index = this.cart.findIndex((item: any) => item._id === this.gameID);
    if (index === -1) {
      return false;
    } else {
      return true
    }
  }

  addToCart() {
    if (this.cart.length > 0) {
      const index = this.cart.findIndex((item: any) => item._id === this.gameID);
      if (index === -1) {
        this.cart.push(this.game);
      } else {
        this.cart.splice(index, 1);
      }
    }
    else
      this.cart.push(this.game);
    this.userService.updateUserCart(this.user._id, this.cart).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
