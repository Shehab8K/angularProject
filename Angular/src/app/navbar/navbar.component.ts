import { Component, HostListener } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 50;
  }

  onMenuClick() {
    const navTrigger = document.querySelector('.navTrigger');
    const mainListDiv = document.querySelector('#mainListDiv') as HTMLElement | null;
    if (navTrigger && mainListDiv) {
      navTrigger.classList.toggle('active');
      console.log('Clicked menu');
      mainListDiv.classList.toggle('show_list');
      $(mainListDiv).fadeIn();
    }
  }

  ngOnInit() {
    $(document).ready(function () {
      $('.navTrigger').click(function () {
        $(this).toggleClass('active');
        console.log("Clicked menu");
        $("#mainListDiv").toggleClass("show_list");
        $("#mainListDiv").fadeIn();
      });
    });
  }
}