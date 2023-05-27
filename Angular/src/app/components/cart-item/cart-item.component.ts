import { Component } from '@angular/core';
import { UserService } from 'src/app/services/users.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],

})
export class CartItemComponent {

  user: any;
  total: number = 0;
  cart: any[] = []

  constructor(private userService: UserService, private cartService: CartService) {

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
          this.updateTotal()
          this.updateCartItems()
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
          this.updateTotal()
          this.updateCartItems()
          this.cartService.updateCartItems(this.cart);
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

  updateTotal() {
    this.total = this.cart.reduce((acc, item) => acc + item.price, 0);
    const totalPrice = this.total;
    this.cartService.updateTotal(totalPrice);
    localStorage.setItem('cartTotalPrice', totalPrice.toString());
    console.log(typeof totalPrice);
  }

  updateCartItems(){
    const allItems = this.cart.length;
    this.cartService.updateTotal(allItems);
    localStorage.setItem('allCartItems', allItems.toString());
    console.log(allItems);
  }

}
