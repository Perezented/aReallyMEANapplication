import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(
      data => {
        if (data['success']===true) {
          this.authService.storeUserData(data['token'], data['user']);
          this.flashMessage.show("You are now logged in, " + data['msg'], {cssClass: 'alert-success', timeout: 5000})
          this.router.navigateByUrl('/dashboard');
        } else {
        this.flashMessage.show(data['msg'] + " For testing purposes, try admin, password", {cssClass: 'alert-danger', timeout: 10000})
        this.router.navigate(['login'])
        }
        
      }
    )

  }
}
