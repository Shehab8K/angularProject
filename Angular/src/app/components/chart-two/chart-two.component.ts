import {Component,OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-chart-two',
  templateUrl: './chart-two.component.html',
  styleUrls: ['./chart-two.component.css']
})
export class ChartTwoComponent implements OnInit{
  public chart: any;

  tags: any[] = [];
  tagCount: any[] = [];
  user: any;
  orders: any[] = [];

  constructor(private userService: UserService, private orderService: OrdersService) { }

  ngOnInit(): void {
    this.fetchData()
  }
  fetchData() {
    const ordersObservable = this.orderService.getAllOrders(); //get current user
    if (ordersObservable) {
      ordersObservable.subscribe({
        next: (data: any) => {
          this.orders = data;
          this.getTags()
          this.createChart();
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    }
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
  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'pie',

      data: {// values on X-Axis
        labels: this.tags,
        datasets: [
          {
            data: this.tagCount,
            backgroundColor: [
              '#26d9ac',
              '#60709f',
              'rgba(112, 192, 219)',
              'rgb(160, 160, 119)',
              'rgb(135, 96, 96)',
              'lightgray',

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
}
