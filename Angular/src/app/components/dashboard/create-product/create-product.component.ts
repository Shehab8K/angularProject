import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, Form  } from '@angular/forms';
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
  // selectedTags:string[] = [];
  // selectedType:string[] = [];
  // selectedOs:string[] = [];



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
    this.selectedImages = [];
    console.log(event.target)
    console.log("tesssss")
    const imagesControl = this.gameForm.get('imageURL') as FormArray;
    for (let i = 0; i < files.length; i++) {
      this.selectedImages.push(files[i]);
      imagesControl.push(this.formBuilder.control(files[i]));
    }
  }

  // onChangeTags(event: any) {
  //   const tags = event.target.value;
  //   console.log(event.target.selectedOptions);
  //   this.selectedTags.push(tags);
  //   console.log(this.selectedTags);
  //   console.log("Tag : "+event.target.value)
  //   const tagsControl = this.gameForm.get('tag') as FormArray;

  //   for (let i = 0; i < tags.length; i++) {
  //     this.selectedTags.push(tags[i]);
  //     tagsControl.push(this.formBuilder.control(tags[i]));
  //   }
  // }

  // onChangeType(event: any) {
  //   const type = event.target.value;
  //   this.selectedType = [];
  //   const typeControl = this.gameForm.get('type') as FormArray;
  //   for (let i = 0; i < type.length; i++) {
  //     this.selectedType.push(type[i]);
  //     typeControl.push(this.formBuilder.control(type[i]));
  //   }
  // }

  // onChangeOs(event: any) {
  //   const os = event.target.value;
  //   this.selectedOs = [];
  //   const osControl = this.gameForm.get('os') as FormArray;
  //   for (let i = 0; i < os.length; i++) {
  //     this.selectedOs.push(os[i]);
  //     osControl.push(this.formBuilder.control(os[i]));
  //   }
  // }
  add(){
        const formData = new FormData();
        // console.log('in function')
        if (this.gameForm.valid) {
          for(let image of this.selectedImages){
            formData.append('imageURL', image);
          }
          //////
          // for(let tag of this.selectedTags){
          //   formData.append('tag', tag);
          // }
          // //////
          // for(let type of this.selectedType){
          //   formData.append('type', type);
          // }
          // ///////
          // for(let os of this.selectedOs){
          //   formData.append('os', os);
          // }
          const currentDate = new Date();
          const formattedDate = currentDate.toISOString();
          // console.log(formattedDate)
          formData.append('releasedDate', formattedDate);
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

          this.gamesService.AddNewProduct( formData).subscribe({
            next:()=>{console.log("donee")},
            error:(err)=>{console.log(err)}
          });
     }
    else{
      console.log("engzzzzzzzzz")
    }
  }   
}
 