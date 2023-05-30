import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from 'src/app/services/products.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  updatedGameName: string = "Update Game";
  gameForm!: FormGroup;
  selectedImages:string[] = [];
  updatedDescription!:string;
  updatedName!:string;
  updatedPrice!:number;
  game:any;
  updatedProductId!:string;
  updatedValues!:any
  updatedTags:string[]=[];
  updatedTypes:string[]=[];
  updatedOs:string[]=[];
  updatedImages:string[]=[];

  tagsList = ['Action', 'funny', 'sports','adventure','horror'];
  typesList = ['multiplayer', 'singleplayer'];
  osList = ['Linux', 'MacOs', 'Windows'];

  constructor(
    public gamesService: GamesService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
        this.gameForm = this.formBuilder.group({
          name: new FormControl(),
          price: new FormControl(),
          tag: new FormControl(),
          type: new FormControl(),
          os: new FormControl(),
          description: new FormControl(),
          imageURL: this.formBuilder.array([]),
        });

        this.updatedProductId = this.route.snapshot.params["id"];

  this.gamesService.GetGameByID(this.updatedProductId).subscribe({
    next: (data: any) => {
      this.game = data;
    },
    error: (err) => {
      console.log(err);
    }
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

  // populateFormFields() {
  //   this.gameForm.patchValue({
  //     name: this.game.name,
  //     price: this.game.price,
  //     description: this.game.description
  //   });
  
  //   this.setFormArrayValues('tag', this.game.tag);
  //   this.setFormArrayValues('type', this.game.type);
  //   this.setFormArrayValues('os', this.game.os);
  //   this.setFormArrayValues('imageURL', this.game.images);
  //   console.log(this.gameForm.value); // Print form values to the console
  // }


  // setFormArrayValues(formArrayName: string, values: any[]) {
  //   const formArray = this.gameForm.get(formArrayName) as FormArray;
  //   formArray.clear();
  //   if (values) {
  //     values.forEach(value => {
  //       formArray.push(new FormControl(value));
  //     });
  //   }
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

  // getUpdatedTags(): string[] {
  //   const tagFormArray = this.gameForm.get('tag') as FormArray;
  //   console.log(tagFormArray)
  //   return tagFormArray.value;
  // }

  // saveUpdates() {
  //   this.updatedTags = this.getUpdatedTags();
  //   // const updatedTypes = this.getUpdatedTypes();
  //   // const updatedOs = this.getUpdatedOs();
  
  //   // Do something with the updated values (e.g., send them to the server)
  // }

  update(){
    const formData = new FormData();
    if(this.gameForm.valid){
       this.updatedValues =this.gameForm.value;
       console.log(this.game)

        this.gameForm.value.name==this.game.name || this.gameForm.value.name ==null ? this.updatedName=this.game.name :this.updatedName=this.gameForm.value.name;
        this.gameForm.value.price==this.game.price || this.gameForm.value.price ==null ? this.updatedPrice=this.game.price :this.updatedPrice=this.gameForm.value.price;
        this.gameForm.value.description==this.game.description || this.gameForm.value.description ==null ? this.updatedDescription=this.game.description :this.updatedDescription=this.gameForm.value.description;
        formData.append('name',this.updatedName);
        formData.append('description',this.updatedDescription);
        formData.append('price', this.updatedPrice.toString());

        
          
        if(this.updatedTypes.length==0 )
         this.updatedTypes=  this.game.type
         
        else
         { this.updatedTypes=this.gameForm.value.type
        }

 for(let type of this.updatedTypes){
            formData.append('type', type);
          }
        if(this.updatedTags.length==0 )
         this.updatedTags=  this.game.tag
        else
        {
          this.updatedTags=this.gameForm.value.tag
          
         
        }
           for(let tag of this.updatedTags){
            formData.append('tag', tag);
          }
        if(this.updatedOs.length==0 )
         this.updatedOs=  this.game.os
        else
        {  this.updatedOs=this.gameForm.value.os
          
          
        }
for(let os of this.updatedOs){
            formData.append('os', os);
          }
        if(this.selectedImages.length==0 )
         this.updatedImages=  this.game.images
        else
        {  this.updatedImages=this.gameForm.value.imageURL
          
          
        }
for(let images of this.selectedImages){
            formData.append('imageURL', images);
          }
           formData.forEach((value, key) => {
          console.log(key + ": " + value);
        });
          

        this.gamesService.updateProduct(this.updatedProductId,formData).subscribe({
          next:()=>{
            console.log('doneeeeeeeee')
          },
          error:(err)=>{
            console.log(err)
          }
        })
// console.log(this.updatedTags)
// console.log(this.updatedTypes)
// console.log(this.updatedDescription)
// console.log(this.updatedOs)
// console.log(this.updatedImages)
// // console.log(this.game.images)
//       // console.log(this.updatedPrice)
//       console.log(this.updatedValues)
      // console.log(this.updatedName)
    }
}

}
