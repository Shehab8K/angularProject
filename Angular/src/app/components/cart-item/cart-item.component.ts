import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GamesService } from 'src/app/services/products.service';
// import { FiltersService } from 'src/app/services/filters.service';
import { UserService } from 'src/app/services/users.service';
@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  // tags: string[] = [];
  // types: string[] = [];
  // games: any
  // rawData: any
  // isFavorite: boolean = false;
  // isAdded: boolean = false;
  // priceRange: FormGroup;
  // os: FormGroup;
  // filteredGames: any[] = [];
  // gameTags: any[] = [];
  // user: any;
  // constructor(private gamesService: GamesService, private formBuilder: FormBuilder, userService: UserService) {
  //   this.priceRange = this.formBuilder.group({
  //     range1: false,
  //     range2: false,
  //     range3: false,
  //     range4: false,
  //     range5: false,
  //     range6: false
  //   });
  //   this.os = this.formBuilder.group({
  //     mac: false,
  //     windows: false,
  //     linux: false
  //   });
  //   const userObservable = userService.getCurrentUser()
  //   if (userObservable) {
  //     userObservable.subscribe({
  //       next: (data) => {
  //         this.user = data;
  //         // console.log(this.user)
  //       },
  //       error: (err) => {
  //         console.log(err)
  //       }
  //     })
  //   }
  // }
  // removeItem(g: any) {
  //   if (this.user.cart.length > 0) {
  //     const index = this.user.cart.findIndex((item: any) => item.id === g.id);
  //     if (index != -1) {
  //       this.user.cart.splice(index, 1);
  //       //{update actual user cart in db}
  //     }
  //   }

  // }
}
