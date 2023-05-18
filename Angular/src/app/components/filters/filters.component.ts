import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GamesService } from 'src/app/services/products.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],

})
export class FiltersComponent {


  constructor(private formBuilder: FormBuilder,private  gamesService:GamesService) {
   
  }

  

}
