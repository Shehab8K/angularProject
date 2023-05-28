import { AfterViewInit, ChangeDetectorRef, Component, HostListener, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit {
  isScrolled = false;
  isLoggedIn: boolean = false;
  @Output() navigateToSection: EventEmitter<string> = new EventEmitter<string>();

  constructor(private authService: AuthService,
               private cdr: ChangeDetectorRef,
               private userService: UserService
               ) { }
  ngAfterViewInit() {
  }
  scrollToSection() {
    this.navigateToSection.emit('about');
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 50;
  }
  refresh() {
    this.cdr.detectChanges();
  }
  isloggedIn() {
    this.isLoggedIn = this.authService.isLoggedIn()
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
    this.isloggedIn()
    $(document).ready(function () {
      $('.navTrigger').click(function () {
        $(this).toggleClass('active');
        console.log("Clicked menu");
        $("#mainListDiv").toggleClass("show_list");
        $("#mainListDiv").fadeIn();
      });
    });
    this.userService.value$.subscribe((value:any)=>{
      this.isLoggedIn = value;
    })
  }
}
