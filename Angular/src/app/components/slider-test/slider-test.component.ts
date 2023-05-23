import {Component, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
@Component({
  selector: 'app-slider-test',
  templateUrl: './slider-test.component.html',
  styleUrls: ['./slider-test.component.css']
})
export class SliderTestComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder) {}

  @ViewChild('stepper') stepper: MatStepper | any;
  goToNextStep(): void {
    this.stepper.next();
  }
}
