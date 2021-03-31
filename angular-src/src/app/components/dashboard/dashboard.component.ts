import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: Object;
  user: Object;

  constructor(
    private authService: AuthService
) { }

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe(profileData => {
          this.users = profileData['users']
    },
      err => {
        console.log(err);
        return false;
          })
    
    this.authService.getProfile().subscribe(profileData => {
      this.user = profileData['user']
    },
      err => {
        console.log(err);
        return false;
      })
  }

}
