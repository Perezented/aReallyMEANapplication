import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }

  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('users/register', user, { headers: headers })
    .pipe(map((res)=> res)
    );
    
  }
  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('users/login', user, { headers: headers })
    .pipe(map((res)=> res)
    );
  }
  
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('bearer_token', 'bearer ' + token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loggedIn() {
    if (localStorage['id_token']) {
      return true
    }else return false
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  // gets profile page, sending token to authorize it
  getProfile() {
    this.loadBearerToken();
    let headers = new HttpHeaders({
      'Authorization': this.authToken,
      'Content-Type': 'application/json'
    });
    return this.http.get('users/profile',  { headers: headers })
    .pipe(map((res)=> res)
    );
  }

  // Fetches from local storage
  loadBearerToken() {
    const token = localStorage.getItem("bearer_token");
    this.authToken = token;
  }

}
