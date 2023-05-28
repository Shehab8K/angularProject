import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from 'src/app/services/products.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  createdGame:String= "Update product"
  ID:any;
  game:any;
  constructor(myRoute:ActivatedRoute,public myService:GamesService){
    this.ID=myRoute.snapshot.params["id"]
    // console.log(this.ID)
  }

  ngOnInit(): void {
    this.myService.GetGameByID(this.ID).subscribe(
     {
       next:(data)=>{
         this.game=data
       },
       error:(err)=>{console.log(err)}
     }
    )
   }
}
