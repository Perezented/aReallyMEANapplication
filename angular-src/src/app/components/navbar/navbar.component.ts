import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: Object;
  constructor(
    public authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    if (this.authService.loggedIn()) {
      this.user = localStorage['user']
    } else this.user = null;
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show("You have successfully logged out", { cssClass: 'alert-success', timeout: 3000 });
    this.router.navigateByUrl('/login');
    this.user = null;
    this.ngOnInit();
    return false;
  }

}
