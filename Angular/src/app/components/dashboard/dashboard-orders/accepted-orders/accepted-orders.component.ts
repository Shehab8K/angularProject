import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-accepted-orders',
  templateUrl: './accepted-orders.component.html',
  styleUrls: ['./accepted-orders.component.css']
})
export class AcceptedOrdersComponent {
  displayedColumns: string[] = ['column1', 'column2', 'column3'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    // Initialize your table data array
    const tableData = [
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Value 1', column2: 'Value 2', column3: 'Value 3' },
      { column1: 'Va5gd', column2: 'Value 2', column3: 'Value 3' },
      
      // Other table data objects
    ];

    // Create a MatTableDataSource with your data array
    this.dataSource = new MatTableDataSource(tableData);
  }

  ngAfterViewInit() {
    // Associate the paginator with the data source
    this.dataSource.paginator = this.paginator;
  }
}
