import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, Form  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { GamesService } from 'src/app/services/products.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {

  game: any;
  createdGame: string = "New Game";
  gameForm!: FormGroup;
  selectedImages:string[] = [];
  selectedTags:string[] = [];
  selectedType:string[] = [];
  selectedOs:string[] = [];

  updateMood: boolean = false;

  gameName: string = "";
  gamePrice: Number | undefined
  gameDesc: string = ""
  formData = new FormData();

  constructor(public gamesService: GamesService,  private formBuilder: FormBuilder, private route: ActivatedRoute) {}


  ngOnInit(): void {
//
  // //   const gameId = this.route.snapshot.queryParams['gameId'];
  // // const game = history.state.game;

  // // Use the gameId and game object in your form
  // console.log(gameId, game);

    this.gameForm = this.formBuilder.group({
      name: new FormControl(null),
      price: new FormControl(null),
      tag: new FormControl([]),
      type: new FormControl([]),
      os: new FormControl([]),
      description: new FormControl(null),
      imageURL: this.formBuilder.array([]),
    });

    this.route.params.subscribe(params => {
      const id = params?.['id']; // Use optional chaining operator
      if (id) {
        this.gamesService.GetGameByID(id).subscribe({
          next:(res)=>{
            this.game = res;
            this.createdGame = this.game.name

            this.gameName = this.game.name;
            this.gamePrice = this.game.price;
            this.gameDesc = this.game.description
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
            // this.updatingInputFromComingGame(res)
            this.updateMood = true;
          },
          error:(err)=>{
            // Error wrong id default send to error 404 / OR Return back with alert
          }
        })
      }
    });
  }

  // updatingInputFromComingGame(game:any)
  // {
  //   this.name = game.name;
  //   this.price = game.price
  //   this.description = game.description

  //   for (let i = 0; i < game.os.length; i++) {
  //     this.selectedOs.push(game.os[i]);
  //   }
  //   for (let i = 0; i < game.tag.length; i++) {
  //     this.selectedTags.push(game.tag[i]);
  //   }
  //   for (let i = 0; i < game.type.length; i++) {
  //     this.selectedType.push(game.type[i]);
  //   }


  //   console.log("Asmaaaaa");
  //   console.log(this.selectedTags);
  //   console.log(this.selectedType);
  //   console.log(this.selectedOs);
  // }

  onChangeFile(event: any) {
    const files = event.target.files;
    this.selectedImages = [];
    const imagesControl = this.gameForm.get('imageURL') as FormArray;
    for (let i = 0; i < files.length; i++) {
      this.selectedImages.push(files[i]);
      imagesControl.push(this.formBuilder.control(files[i]));
    }
  }


  add(){
        // console.log('in function')
        if (this.gameForm.valid) {
          console.log("valid");
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


              console.log("in update typescript")

            this.gamesService.UpdateProduct(this.formData,this.game._id).subscribe({
              next:()=>{this.gameForm.reset();},
              error:(err)=>{console.log(err)}
            })
     }
    else{
      console.log(this.gameForm.valid);
      console.log("engzzzzzzzzz")
    }
  }
}
