import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, Form  } from '@angular/forms';
import { GamesService } from 'src/app/services/products.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent  {

  createdGame: string = "New Game";
  gameForm!: FormGroup;
  selectedImages:string[] = [];
  selectedTags:string[] = [];
  selectedType:string[] = [];
  selectedOs:string[] = [];
  updatedTags:string[]=[];
  updatedTypes:string[]=[];
  updatedOs:string[]=[];
  tagsList = ['Action', 'funny', 'sports','adventure','horror',"war","combat","fantasy"];
  typesList = ['multiplayer', 'singleplayer'];
  osList = ['linux', 'mac', 'windows'];


  constructor(public gamesService: GamesService,  private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {}


  ngOnInit(): void {

    this.gameForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      tag: new FormControl([], Validators.required),
      type: new FormControl([], Validators.required),
      os: new FormControl([], Validators.required),
      description: new FormControl(null, Validators.required),
      imageURL: this.formBuilder.array([]),
    });

    const tagControl = this.gameForm.get('tag');
    if (tagControl) {
      tagControl.valueChanges.subscribe((selectedTags: string[]) => {
        this.updatedTags = selectedTags;
      });
      console.log(this.updatedTags)
    }
    const typeControl = this.gameForm.get('type');
  if (typeControl) {
    typeControl.valueChanges.subscribe((selectedTypes: string[]) => {
      this.updatedTypes = selectedTypes;
    });
    console.log(this.updatedTypes)
  }
  const osControl = this.gameForm.get('os');
  if (osControl) {
    osControl.valueChanges.subscribe((selectedOs: string[]) => {
      this.updatedOs = selectedOs;
    });
    console.log(this.updatedOs)
  }
  }
  
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

  add(){
        const formData = new FormData();
        // console.log('in function')
        if (this.gameForm.valid) {
          for(let image of this.selectedImages){
            formData.append('imageURL', image);
          }
          //////
          for(let tag of this.updatedTags){
            formData.append('tag', tag);
          }
          console.log(this.updatedTags)
          //////
          for(let type of this.updatedTypes){
            formData.append('type', type);
          }
          ///////
          for(let os of this.updatedOs){
            formData.append('os', os);
          }
          const currentDate = new Date();
          const formattedDate = currentDate.toISOString();
          formData.append('releasedDate', formattedDate);
          formData.append('name', this.gameForm.get('name')!.value);
              formData.append('price', this.gameForm.get('price')!.value);
             
              formData.append('description', this.gameForm.get('description')!.value);

             
              console.log(formData);

          this.gamesService.AddNewProduct( formData).subscribe({
            next:()=>{
              this.router.navigate(['/dashboard/games']);
            }
            ,
            error:(err)=>{console.log(err)}
          });
     } 
    else{
      console.log("engzzzzzzzzz")
    }
  }
}
