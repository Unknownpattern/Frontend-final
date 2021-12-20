import { setLoadingSpinner } from './../../shared/state/shared.actions';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loginStart } from '../state/auth.actions';
import { getUser } from '../state/auth.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.store.select(getUser).subscribe((user) => {
      if (user != null) {
        this.router.navigateByUrl('');
      }
    });
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  emailError() {
    if (
      !this.email?.valid &&
      this.email?.touched &&
      this.email?.errors?.required
    ) {
      return 'Email is required';
    }
    if (
      !this.email?.valid &&
      this.email?.touched &&
      this.email?.errors?.email
    ) {
      return 'Please enter a proper email';
    }
    return '';
  }

  onSubmit() {
    this.store.dispatch(loginStart(this.loginForm.value));
    this.store.dispatch(setLoadingSpinner({ status: true }));
  }
}
