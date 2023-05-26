import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  public chart: any;
  @Input() tags: any[] = [];
  @Input() tagCount: any[] = [];
  @Output() chartCreated: EventEmitter<void> = new EventEmitter<void>();
  // constructor(private cdr: ChangeDetectorRef) { }


  ngOnInit(): void {
    console.log("in child");
    this.createChart();
    // this.cdr.detectChanges();

    // console.log(this.tags)
    // console.log(this.tagCount)
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
              'lightgray',
              '#60709f',
              'rgba(112, 192, 219)',
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
    this.chartCreated.emit();
    // this.cdr.detectChanges();

  }
}
