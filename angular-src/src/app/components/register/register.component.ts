import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;


  constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Required Fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show("Please fill in all the fields", {cssClass: 'alert-danger', timeout: 3000})
      return false
    }
    if (!this.validateService.validateEmail(this.email)) {
            this.flashMessage.show("Please fill in a valid email", {cssClass: 'alert-danger', timeout: 3000})
      return false
    }
    console.log(user)
    this.authService.registerUser(user).subscribe(data => {
      if (data['success'] === true) {
        this.flashMessage.show("you are now registered and can log in", { cssClass: 'alert-success', timeout: 3000 })
        this.router.navigate(['/login'])
      } else {
        this.flashMessage.show("Uh-oh, something went wrong. Please try again", {cssClass: 'alert-danger', timeout: 3000})
      }
    })
  }



}
