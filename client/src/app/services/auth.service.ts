import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

interface UserLogin {
  login: string;
  password?: string;
}

interface UserSignUp {
  login: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  private token = localStorage.getItem('auth-token') || '';

  signup(user: UserSignUp) {
    return this.http
      .post<{ user: any; token: string }>('/auth/signup', user)
      .pipe(
        tap(({ token }) => {
          localStorage.setItem('auth-token', token);
          this.setToken(token);
        }),
      );
  }

  /**
   *
   * @param user
   */
  login(user: UserLogin): Observable<any> {
    return this.http
      .post<{ user: any; token: string }>('/auth/login', {
        username: user.login,
        password: user.password,
      })
      .pipe(
        tap(({ token }) => {
          localStorage.setItem('auth-token', token);
          this.setToken(token);
        }),
      );
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  isAuth() {
    return !!this.token;
  }

  logout() {
    this.setToken('');
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
