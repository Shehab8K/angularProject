import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent {

  cardholderName = 'CARDHOLDER';
  cardNumber: string[] = ['XXXX', 'XXXX', 'XXXX', 'XXXX'];
  cvv = 'xxx';

  // expirationDatemonth = new Date().getMonth();
  expirationDatemonth:any
  months:any[] = [];
  expirationDateyear = new Date().getFullYear();
  endYear = this.expirationDateyear + 6;
  years: number[] = [];
  cart: any[] = [];
  cvvFocus = false;
  cartTotalPrice: number  = 0;

  ngOnInit(): void {
    this.cartTotalPrice = this.cartService.gettotalPriceFromLocalStorage();
    // console.log(typeof this.cartTotalPrice)
    this.cart.length = this.cartService.getallItemsFromLocalStorage();
  }

  constructor(private cartService: CartService) {

    for (let i = this.expirationDateyear; i <= this.endYear; i++) {
      this.years.push(i);
    }

    for (let i = 1; i <= 12; i++) {
      if (i < 10) {
        this.months.push(("0" + i));
      } else {
        this.months.push(i);
      }
    }

  }

  onFormSubmit(): void {
    // if (myForm.invalid) {
    //   // Form is invalid, do not proceed with submission
    //   return;
    // }
    console.log(this.cartTotalPrice, this.cvv);
    const cardNumberString = this.cardNumber.join('');
    console.log(cardNumberString,this.cartTotalPrice !== null ? this.cartTotalPrice.toFixed(2) : null, this.cvv,this.expirationDatemonth, this.expirationDateyear);
  }

  onCvvFocus() {
    this.cvvFocus = true;
  }

  onCvvBlur() {
    this.cvvFocus = false;
  }

  onNameChange(event: Event): void {
    this.cardholderName = (event.target as HTMLInputElement).value;
  }

  onCardNumberChange(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    const cardNumber = input.replace(/\D/g, '').slice(0, 16);
    for (let i = 0; i < 16; i += 4) {
      this.cardNumber[i / 4] = cardNumber.slice(i, i + 4);
    }

  }

 onCvvChange(event: Event): void {
    this.cvv = (event.target as HTMLInputElement).value;
  }

  onexpirationDatemonthChange(event: Event): void {
    // const monthString = (event.target as HTMLInputElement).value;
    // this.expirationDatemonth = parseInt(monthString, 10);
    this.expirationDatemonth = (event.target as HTMLInputElement).value;
  }

  onexpirationDateyearChange(event: Event): void {
    const yearString = (event.target as HTMLInputElement).value;
    this.expirationDateyear = parseInt(yearString, 10);
  }
}
