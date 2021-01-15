import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  FacebookLoginProvider,
  SocialAuthService,
} from 'angularx-social-login';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private authFBService: SocialAuthService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit = () => {
    this.form.disable();
    this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/']),
      (err) => {
        alert(err.error.message);
        this.form.enable();
      },
    );
  };

  async signInWithFB() {
    this.form.disable();
    const res = await this.authFBService.signIn(
      FacebookLoginProvider.PROVIDER_ID,
    );
    this.auth.facebookAuth({ email: res.email }).subscribe(
      () => this.router.navigate(['/']),
      (err) => {
        alert(err.error.message);
        this.form.enable();
      },
    );
  }
}
