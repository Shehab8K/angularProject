import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Chart from 'chart.js/auto';
import { switchMap } from 'rxjs';
// import { UserUpdateService } from 'src/app/services/emitters.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit{
  public chart: any;
  // @Input() tags: any[] = [];
  // @Input() tagCount: any[] = [];
  // @Output() chartCreated: EventEmitter<void> = new EventEmitter<void>();
  // constructor(private cdr: ChangeDetectorRef) { }

  tags: any[] = [];
  tagCount: any[] = [];
  user: any;
  orders: any[] = [];

  constructor(private userService: UserService, private orderService: OrdersService) { }

  ngOnInit(): void {
    console.log("in child");
    this.fetchData()
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
'pink','#70879c',
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
    // this.chartCreated.emit();
    // this.cdr.detectChanges();

  }
}
