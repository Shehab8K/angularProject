import { Component } from '@angular/core';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {

  user: any;
  total: number = 0;
  cart: any[] = []
  constructor(private userService: UserService) {

    const userObservable = userService.getCurrentUser()
    if (userObservable) {
      userObservable.subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }

  removeCartItem(cart: any) {
    if (this.cart.length > 0) {
      let index = this.cart.indexOf(cart);
      this.cart.splice(index, 1);
      this.userService.updateUserCart(this.user._id, this.cart).subscribe({
        next: () => {
          this.calculateTotalPrice();
        },

        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  async ngOnInit(): Promise<void> {
    const userObservable = this.userService.getCurrentUser()
    if (userObservable) {
      userObservable.subscribe({
        next: (data) => {
          this.user = data;
          this.cart = this.user.cart
          this.calculateTotalPrice();

        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }

  clearCart(){
    this.userService.updateUserCart(this.user._id, []).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  calculateTotalPrice() {
    this.total = this.cart.reduce((acc, item) => acc + item.price, 0);
  }

}
