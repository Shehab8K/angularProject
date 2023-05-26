import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/users.service';



@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  userTitle: string="Users";
  displayedColumns: string[] = ['name', 'username', 'email'];
  dataSource!: MatTableDataSource<any>;
  users:any[]=[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private usersService: UserService) {
    // Initialize your table data array
    // Create a MatTableDataSource with your data array
    // this.dataSource = new MatTableDataSource(tableData);
  }

  ngOnInit() {
    this.usersService.getAllUsers().subscribe(
   {
       next:(data: Object) => {
        this.users = data as any[];
        this.dataSource = new MatTableDataSource(data as any[]);
        this.dataSource.paginator = this.paginator;
      },
      error:(error) => {
        console.log(error);
      }}
    );
  }

}
