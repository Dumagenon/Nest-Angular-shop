import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthResponse, UserLogin, UserSignUp } from '../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  private token = localStorage.getItem('auth-token') || '';
  private user = JSON.parse(localStorage.getItem('user-data') || 'null');

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

  public setUser(user: any) {
    this.user = user;
  }

  public getUser() {
    return this.user;
  }

  public isAuth() {
    return !!this.token;
  }

  public async logout() {
    this.setToken('');
    this.setUser(null);
    localStorage.clear();
    await this.router.navigate(['login']);
  }

  public verifyAuth(): Observable<any> {
    return this.http.get('/auth/verify');
  }

  private getAuthData(url: string, user: any) {
    return this.http.post<AuthResponse>(url, user).pipe(
      tap(({ user, token }) => {
        localStorage.setItem('auth-token', token);
        localStorage.setItem('user-data', JSON.stringify(user));
        this.setToken(token);
        this.setUser(user);
      }),
    );
  }
}
