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

interface AuthResponse {
  user: any;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  private token = localStorage.getItem('auth-token') || '';

  /**
   * Create new user and get user data and access token
   * @param user Customer registration data
   */
  public signup(user: UserSignUp) {
    return this.getAuthData('/auth/signup', user);
  }

  /**
   * Get user data and access token
   * @param user Object with username and password
   */
  public login(user: UserLogin): Observable<any> {
    return this.getAuthData('/auth/login', {
      username: user.login,
      password: user.password,
    });
  }

  public facebookAuth(user: any): Observable<any> {
    return this.getAuthData('/auth/facebook', user);
  }

  public setToken(token: string) {
    this.token = token;
  }

  public getToken() {
    return this.token;
  }

  public isAuth() {
    return !!this.token;
  }

  public async logout() {
    this.setToken('');
    localStorage.clear();
    await this.router.navigate(['login']);
  }

  private getAuthData(url: string, user: any) {
    return this.http.post<AuthResponse>(url, user).pipe(
      tap(({ token }) => {
        localStorage.setItem('auth-token', token);
        this.setToken(token);
      }),
    );
  }
}
