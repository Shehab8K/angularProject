import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],

})
export class FiltersComponent {
  tags: string[] | undefined;
  types: string[] | undefined;

  onChangeTags(): void {
    // console.log(this.tags);
  }
  onChangeTypes(): void {
    // console.log(this.types);
  }

  priceRange: FormGroup;
  os: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.priceRange = this.formBuilder.group({
      range1: false,
      range2: false,
      range3: false,
      range4: false,
      range5: false,
      range6: false
    });
    this.os = this.formBuilder.group({
      mac: false,
      windows: false,
      linux: false
    });
  }

  onChangepriceRange(): void {
    const selectedPrice = Object.keys(this.priceRange.value).filter(option => this.priceRange.value[option]);
    // console.log(selectedPrice);
  }

  onChangeOs(): void {
    const selectedOS = Object.keys(this.os.value).filter(option => this.os.value[option]);
    // console.log(selectedOS);
  }
}
