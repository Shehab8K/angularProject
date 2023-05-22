// import { Component } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  // @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  someMethod() {
    this.trigger.openMenu();
  }
}
