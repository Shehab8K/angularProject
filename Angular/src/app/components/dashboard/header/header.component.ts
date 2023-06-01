// import { Component } from '@angular/core';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { UserService } from 'src/app/services/users.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  constructor(private userService: UserService){}

  @Output() loggedOut: EventEmitter<void> = new EventEmitter<void>();

  someMethod() {
    this.trigger.openMenu();
  }

  logout() {
    this.userService.logout();
    this.loggedOut.emit();
  }
}
