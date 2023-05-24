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
  expirationDatemonth = ' MM';
  expirationDateyear = ' YY';
  cvvFocus = false;

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
    this.expirationDatemonth = (event.target as HTMLInputElement).value;
  }
  onexpirationDateyearChange(event: Event): void {
    this.expirationDateyear = (event.target as HTMLInputElement).value;
  }
}
