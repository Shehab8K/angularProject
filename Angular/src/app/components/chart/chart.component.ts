import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
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
      options: { //forspacing of bottom
        aspectRatio:2.5
      }

    });
  }
  ngOnInit(): void {
    this.createChart();
  }
}
