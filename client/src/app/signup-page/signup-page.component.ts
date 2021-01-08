import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mustMatch } from '../utils/must-mutch.validator';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        login: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: mustMatch('password', 'confirmPassword'),
      },
    );
  }

  get f() {
    return this.form.controls;
  }

  onSubmit = () => {
    const { confirmPassword, ...user } = this.form.value;

    this.form.disable();
    this.auth.signup(user).subscribe(
      () => this.router.navigate(['/']),
      (err) => {
        alert(err.error.message);
        this.form.enable();
      },
    );
  };
}
