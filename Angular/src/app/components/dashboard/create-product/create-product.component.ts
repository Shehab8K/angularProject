import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { GamesService } from 'src/app/services/products.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent  {
  
  createdGame: string = "New Game";
  gameForm!: FormGroup;
  selectedImages:string[] = [];

  

  constructor(public gamesService: GamesService,  private formBuilder: FormBuilder) {}


  ngOnInit(): void {
    this.gameForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      tag: new FormControl([], Validators.required),
      type: new FormControl([], Validators.required),
      os: new FormControl([], Validators.required),
      description: new FormControl(null, Validators.required),
      // imageURL: new FormControl([], Validators.required),
      imageURL: this.formBuilder.array([]),
    });
  }
  // validate(){
  //   this.gameForm = this.formBuilder.group({
  //     name: new FormControl(null, Validators.required),
  //     price: new FormControl(null, Validators.required),
  //     tag: new FormControl([], Validators.required),
  //     type: new FormControl([], Validators.required),
  //     os: new FormControl([], Validators.required),
  //     description: new FormControl(null, Validators.required),
  //     imageURL: new FormControl([], Validators.required),
  //     // imageURL: this.formBuilder.array([]),
  //   }); 
  // }
  onChangeFile(event: any) {
    const files = event.target.files;
    console.log(files);
    this.selectedImages = [];

    const imagesControl = this.gameForm.get('imageURL') as FormArray;
    // imagesControl.clear();
// console.log(imagesControl)
    for (let i = 0; i < files.length; i++) {
      this.selectedImages.push(files[i].name);
      imagesControl.push(this.formBuilder.control(files[i]));
    }

    // console.log(this.selectedImages);
  }

  add(){
        const formData = new FormData();
        // console.log('in function')
        if (this.gameForm.valid) {
          for(let image of this.selectedImages){
            formData.append('imageURL', image);    
          }
          const currentDate = new Date();
          const formattedDate = currentDate.toISOString();
          // console.log(formattedDate)
          formData.append('releasedDate', formattedDate);
          // console.log(this.gameForm.value)
          // console.log("validated :", this.gameForm.valid)
          // console.log(this.gameForm.value)
          // console.log(this.gameForm.valid)
          // console.log(typeof(this.gameForm.get('tag')!.value))
          // console.log(this.gameForm.get('name')!.value);
          formData.append('name', this.gameForm.get('name')!.value);
              formData.append('price', this.gameForm.get('price')!.value);
              formData.append('tag', this.gameForm.get('tag')!.value);
              formData.append('type', this.gameForm.get('type')!.value);
              formData.append('os', this.gameForm.get('os')!.value);
              formData.append('description', this.gameForm.get('description')!.value);
              
              // for (const entry of formData.entries()) {
              //   console.log(entry);
              // }

              console.log(formData);

          this.gamesService.AddNewProduct( this.gameForm.value).subscribe({
            next:()=>{console.log("donee")},
            error:(err)=>{console.log(err)}
          });
     }
    else{
      console.log("engzzzzzzzzz")
    }
  }   
}
 