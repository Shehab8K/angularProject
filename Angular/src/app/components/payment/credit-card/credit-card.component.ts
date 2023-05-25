import { Component } from '@angular/core';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent {
  cardholderName = 'CARDHOLDER';
  cardNumber: string[] = ['XXXX', 'XXXX', 'XXXX', 'XXXX'];
  cvv = 'XXX';

  expirationDatemonth = new Date().getMonth();
  months:number[] = [];

  expirationDateyear = new Date().getFullYear();
  endYear = this.expirationDateyear + 6;
  years: number[] = [];

  cvvFocus = false;

  constructor() {
    for (let i = this.expirationDateyear; i <= this.endYear; i++) {
      this.years.push(i);
    }
    for (let i = 0; i <= 12; i++) {
      this.months.push(i);
    }
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
    const monthString = (event.target as HTMLInputElement).value; // get the input value as a string
    this.expirationDatemonth = parseInt(monthString, 10);
  }

  onexpirationDateyearChange(event: Event): void {
    const yearString = (event.target as HTMLInputElement).value; // get the input value as a string
    this.expirationDateyear = parseInt(yearString, 10); // convert the string to a number using parseInt()
  }
}
