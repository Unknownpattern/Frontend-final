import { registerStart } from './../state/auth.actions';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getUser } from '../state/auth.selector';
import { setLoadingSpinner } from 'src/app/shared/state/shared.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  registerForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {}
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get name() {
    return this.registerForm.get('name');
  }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      name: ['', Validators.required],
    });

    this.store.select(getUser).subscribe((user) => {
      if (user != null) {
        this.router.navigateByUrl('');
      }
    });
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
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(registerStart(this.registerForm.value));
  }
}
