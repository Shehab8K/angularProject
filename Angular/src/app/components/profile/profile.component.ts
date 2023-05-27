import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users.service';
import { switchMap } from 'rxjs';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  games: any[] = [];
  orders: any;
  tags: any[] = [];
  tagCount: any[] = [];
  editMode: boolean = false
  bgcolor: any;
  default: any;
  updatedName: any;
  updatedDiscord: any;
  updatedPreferences: any[] = [];
  newPreferences: any[] = [];
  inputs: any[] = []

  constructor(private userService: UserService, private orderService: OrdersService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fetchData()
  }
  setValues() {
    this.bgcolor = this.user.bgColor
    this.default = this.user.bgColor
    this.updatedName = this.user.username
    this.updatedDiscord = this.user.discord
    this.updatedPreferences = this.user.preferences.filter((value: string[]) => value.length > 0);
  }
  getData() {
    if (this.newPreferences.length > 0)
      this.updatedPreferences = Array.from(new Set(this.updatedPreferences.concat(this.newPreferences)));
    this.updatedPreferences.filter(value => value.length > 0);
    const updatedUser = {
      "username": this.updatedName,
      "discord": this.updatedDiscord,
      "preferences": this.updatedPreferences,
      "bgColor": this.bgcolor
    }
    console.log(updatedUser)
    this.userService.updateUser(this.user._id, updatedUser).subscribe({
      next: () => {
        this.fetchData()
        this.toggleEditMode()
        this.refresh()
        this.user.preferences = this.user.preferences.filter((value: String) => value.length > 0);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  toggleEditMode() {
    this.editMode = !this.editMode
  }
  getTags() {
    this.orders.forEach((order: any) => { //looping user orders
      if (order.status == 'accepted') {
        order.gameItems.forEach((game: any) => { // looping games included in each order
          if (game.tag) {
            game.tag.forEach((tag: string) => { //looping tags of each game
              if (this.tags.length > 0) {
                const index = this.tags.findIndex((item: any) => item === tag);
                if (index === -1) {
                  this.tags.push(tag);
                  this.tagCount[this.tags.length - 1] = 1;
                } else {
                  this.tagCount[index]++;
                }
              }
              else
                this.tags.push(tag);
              this.tagCount[0] = 1;
            });
          }
        });
      }
    })
  }
  getGames() {
    this.orders.forEach((order: any) => {
      if (order.status == 'accepted') {
        order.gameItems.forEach((game: any) => {
          if (this.games.length > 0) {
            if (!this.games.some((obj: any) => obj._id === game._id))
              this.games.push(game)
          } else {
            this.games.push(game)
          }
        })
      }
    })
  }
  fetchData() {
    const userObservable = this.userService.getCurrentUser(); //get current user
    if (userObservable) {
      userObservable.pipe(
        switchMap((userData) => { //to switch to the orders Observable inside the user Observable subscription
          this.user = userData;
          this.user.preferences = this.user.preferences.filter((value: String) => value.length > 0);
          this.setValues()
          // Fetch user orders
          const ordersObservable = this.orderService.GetUserOrders(this.user._id);
          if (ordersObservable) {
            return ordersObservable;
          } else {
            throw new Error('Failed to fetch user orders');
          }
        })
      ).subscribe({
        next: (data: any) => {
          this.orders = data;
          this.getTags()
          this.getGames()
          // console.log(this.games)
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    }
  }
  refresh() {
    console.log("refreshing")
    this.cdr.detectChanges();
  }
  setDefault() {
    this.bgcolor = this.default
  }
  addInput() {
    this.inputs.push("")
  }
}
