import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { switchMap } from 'rxjs';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/users.service';
// import { GamesService } from 'src/app/services/games.service';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  public chart: any;
  user: any;
  orders: any;
  tags: any[] = [];
  tagCount: any[] = [];
  constructor(private userService: UserService, private orderService: OrdersService) { }

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'pie', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.tags,
        datasets: [
          // {
          //   label: "Sales",
          //   data: ['467','576', '57'],
          //   backgroundColor: 'blue'
          // },
          {
            // label: "Favorite genres",
            data: this.tagCount,
            backgroundColor: [
              '#26d9ac',
              'lightgray',
              '#60709f',
              'rgba(112, 192, 219, 0.527)',
              'rgb(160, 160, 119)',
              'rgb(135, 96, 96)'
            ],
            // hoverOffset: 4
          }],
      },
      options: { //forsize of chart
        aspectRatio: 2.5,
        plugins: {
          legend: {
            labels: {
              color: 'white'
            }
          }
        }
      }

    });
  }
  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    const userObservable = this.userService.getCurrentUser(); //get current user
    if (userObservable) {
      userObservable.pipe(
        switchMap((userData) => { //to switch to the orders Observable inside the user Observable subscription
          this.user = userData;
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
          this.getTags();
          this.createChart();

          // console.log( this.orders)
          // console.log(this.tags)
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    }
  }
  getTags() {
    this.orders.forEach((order: any) => { //looping user orders
      order.gameItems.forEach((game: any) => { // looping games included in each order
        if (game.GameTags) {
          game.GameTags.forEach((tag: string) => { //looping tags of each game
            // if (!this.tags.includes(tag))
            //   this.tags.push(tag)
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
    })
  }

}
