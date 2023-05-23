import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  name: any;
  cardnumber: any;
  expirationdate: any;
  securitycode: any;
  output: any;
  ccicon: any;
  ccsingle: any;
  generatecard: any;

  cctype: any = null;



}
