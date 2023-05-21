import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
// import { GamesService } from 'src/app/services/games.service';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  games: any
  // constructor(gamesService: GamesService) {
  //   console.log(gamesService.GetAllGames())
  //   gamesService.GetAllGames().subscribe({
  //     next: (data) => {
  //       this.games = data
  //     },
  //     error: (err) => { }
  //   })
  // }
  public chart: any;
  createChart(){

    this.chart = new Chart("MyChart", {
      type: 'pie', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Action','Adventure',
								 'War','fantasy'],
	       datasets: [
          // {
          //   label: "Sales",
          //   data: ['467','576', '57'],
          //   backgroundColor: 'blue'
          // },
          {
            label: "Profit",
            data: ['300', '400', '536'],
            backgroundColor: [
              'red',
              'gray',
              'green',
            ],
            // hoverOffset: 4
          }],
      },
      options: { //forsize of chart
        aspectRatio:2.5
      }

    });
  }
  ngOnInit(): void {
    this.createChart();
  }
}
