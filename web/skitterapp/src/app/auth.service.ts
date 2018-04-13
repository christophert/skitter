import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { conf } from './app.config';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>(conf.appUrl + '/auth/login', { username: username, password: password })
        .map(user => {
            //if login successful and JWT present
            if(user && user.token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
            
            return user;
        });
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
