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
    console.log(this.username)
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(
      data => {
        console.log('looking at data', data)
        if (data['success']===true) {
          console.log('successful data')
          this.authService.storeUserData(data['token'], data['user']);
          this.flashMessage.show("You are now logged in, " + data['msg'], {cssClass: 'alert-success', timeout: 5000})
          this.router.navigate(['dashboard'])
          
        } else {
          console.log('failed data')
        this.flashMessage.show(data['msg'] + " For testing purpusese, try JB, 123456", {cssClass: 'alert-danger', timeout: 10000})
        this.router.navigate(['login'])
        }
        
      }
    )

  }
}
