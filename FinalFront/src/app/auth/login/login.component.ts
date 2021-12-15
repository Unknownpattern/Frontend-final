import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm!: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
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
      return 'Email field needs to contain email format';
    }
    return '';
  }

  onSubmit() {
    this.loading = true;
    console.log(this.loginForm.value);
  }
}
