import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, Form  } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from 'src/app/services/products.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent  {

  game: any;
  createdGame: string = "New Game";
  gameForm!: FormGroup;
  selectedImages:string[] = [];
  selectedTags:string[] = [];
  selectedType:string[] = [];
  selectedOs:string[] = [];

  updateMood: boolean = false;
  price: Number | undefined;
  name: String | undefined;
  description: String | undefined;

  formData = new FormData();

  constructor(public gamesService: GamesService,
     private formBuilder: FormBuilder,
     private route: ActivatedRoute
     ) {}


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

    this.route.params.subscribe(params => {
      const id = params?.['id']; // Use optional chaining operator
      if (id) {
        this.gamesService.GetGameByID(id).subscribe({
          next:(res)=>{
            this.game = res;
            this.createdGame = this.game.name

            // Assigning comming data to the form data
            // const formData = new FormData();
            // this.gameForm.patchValue(res);

            // this.formData.append('imageURL', this.game.imageURL);

            // //////

            // this.formData.append('tag', this.game.tag);

            // //////

            // this.formData.append('type', this.game.type);

            // ///////

            // this.formData.append('os', this.game.os);

            // this.formData.append('name', this.game.name);
            // this.formData.append('price', this.game.price);
            // this.formData.append('description', this.game.description);
            this.updatingInputFromComingGame(res)
            this.updateMood = true;
          },
          error:(err)=>{
            // Error wrong id default send to error 404 / OR Return back with alert
          }
        })
      }
    });
  }

  updatingInputFromComingGame(game:any)
  {
    this.name = game.name;
    this.price = game.price
    this.description = game.description

    for (let i = 0; i < game.os.length; i++) {
      this.selectedOs.push(game.os[i]);
    }
    for (let i = 0; i < game.tag.length; i++) {
      this.selectedTags.push(game.tag[i]);
    }
    for (let i = 0; i < game.type.length; i++) {
      this.selectedType.push(game.type[i]);
    }


    console.log("Asmaaaaa");
    console.log(this.selectedTags);
    console.log(this.selectedType);
    console.log(this.selectedOs);
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
        // console.log('in function')
        if (this.gameForm.valid) {
          for(let image of this.selectedImages){
            this.formData.append('imageURL', image);
          }
          //////
          for(let tag of this.selectedTags){
            this.formData.append('tag', tag);
          }
          //////
          for(let type of this.selectedType){
            this.formData.append('type', type);
          }
          ///////
          for(let os of this.selectedOs){
            this.formData.append('os', os);
          }
          const currentDate = new Date();
          const formattedDate = currentDate.toISOString();

          this.formData.append('releasedDate', formattedDate);
          this.formData.append('name', this.gameForm.get('name')!.value);
          this.formData.append('price', this.gameForm.get('price')!.value);
          this.formData.append('description', this.gameForm.get('description')!.value);



          // console.log(formData);

          if(this.updateMood)
          {
            this.gamesService.UpdateProduct(this.formData,this.game._id).subscribe({
              next:()=>{this.gameForm.reset();},
              error:(err)=>{console.log(err)}
            })
          }else{
            this.gamesService.AddNewProduct( this.formData).subscribe({
              next:()=>{console.log("donee"); this.gameForm.reset()},
              error:(err)=>{console.log(err)}
            });
          }
     }
    else{
      console.log("engzzzzzzzzz")
    }
  }
}

/////////////// Karakeeb asmaa ///////////////

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
              // for (const entry of formData.entries()) {
              //   console.log(entry);
              // }
              // formData.append('tag', this.gameForm.get('tag')!.value);
              // formData.append('type', this.gameForm.get('type')!.value);
              // formData.append('os', this.gameForm.get('os')!.value);
              // console.log(formattedDate)
