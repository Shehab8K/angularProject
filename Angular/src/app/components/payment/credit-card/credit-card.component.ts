import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/users.service';
import { OrdersService } from 'src/app/services/orders.service';
import { PaymentService } from 'src/app/services/payment.servce';
import { Router } from '@angular/router';

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
  years: any[] = [];
  cart: any[] = [];
  cvvFocus = false;
  cartTotalPrice: number  = 0;
  user:any
  filteredMonths: string[] = this.months;

  creditcardForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Za-z]+$/), Validators.minLength(6)]),
    cardNumber: new FormControl(null, [Validators.required, Validators.pattern(/^\d{16}$/)]),
    expirationMonth: new FormControl(null, [Validators.required]),
    expirationYear: new FormControl(null, [Validators.required]),
    cvv : new FormControl(null, [Validators.required, Validators.pattern(/^\d{3}$/)])
  })

  ngOnInit(): void {
    this.cartTotalPrice = this.cartService.gettotalPriceFromLocalStorage();
    // console.log(typeof this.cartTotalPrice)
    this.cart.length = this.cartService.getallItemsFromLocalStorage();
  }

  constructor(private cartService: CartService, private userService: UserService, private orderService: OrdersService, private router: Router, private paymentService: PaymentService) {

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

  formErrors: { [key: string]: string } = {
    name: '',
    cardNumber: '',
    expirationMonth: '',
    expirationYear: '',
    cvv: ''
  };

  onFormSubmit(): void {
    if (this.creditcardForm.valid) {
      // Form is valid, perform further actions or submit the form
      console.log("Form is valid");

      // console.log(typeof price)
      // console.log(typeof this.cartTotalPrice)
      // console.log(this.user.cart)

      //service to create oreder
      this.createOrder();

      //service to clear cart
      this.clearCart();

      //service to pament stripe
      this.createPayment()

      this.router.navigate(['/cart']);
    } else {
      // Form is invalid, handle validation errors
      console.log("Form is invalid");
      // Mark all form controls as touched to trigger validation errors
      this.markFormGroupTouched(this.creditcardForm);
    }
  }

  createOrder(): void {
    // properities to create order
    const orderData = {
      gameItems: this.user.cart,
      userID: this.user._id,
      total:this.cartTotalPrice
    };

    console.log(orderData)
    this.orderService.createOrder(orderData).subscribe(
      (response) => {
        // Handle successful response here
        console.log('Order created successfully:', response);
      },
      (error) => {
        // Handle error here
        console.error('Error creating order:', error);
      }
    );
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

    createPayment(): void {
      // Your logic to get the required data for creating the payment
      let id = this.user._id
      let cardNumber = this.cardNumber.join('')
      let cardExpMonth = this.expirationDatemonth
      let cardExpYear = this.expirationDateyear
      let cardCVC = this.cvv
      let price = this.cartTotalPrice !== null ? this.cartTotalPrice : null

      let paymentData ={
        id,
        cardNumber,
        cardExpMonth,
        cardExpYear,
        cardCVC,
        price
      }
      console.log(paymentData)
      this.paymentService.createPayment(paymentData).subscribe(
        (response) => {
          // Handle successful response here
          console.log('Payment created successfully:', response);
        },
        (error) => {
          // Handle error here
          console.error('Error creating payment:', error);
        }
      );
    }

// Mark all form controls as touched
  markFormGroupTouched(formGroup: FormGroup): void {
  Object.values(formGroup.controls).forEach(control => {
    control.markAsTouched();
  });
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

  onexpirationDateyearChange(event: any) {
    const selectedYear = event.target.value;
    const currentYear = new Date().getFullYear();

    if (selectedYear === currentYear.toString()) {
      // Use current month and future months
      const currentMonth = new Date().getMonth() + 1;
      this.filteredMonths = this.months.filter(month => parseInt(month, 10) > currentMonth);
    } else {
      // Use all months
      this.filteredMonths = this.months;
    }
    const yearString = (event.target as HTMLInputElement).value;
      this.expirationDateyear = parseInt(yearString, 10);
  }
}
