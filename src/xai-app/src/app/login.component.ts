import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AmplifyService } from '@flowaccount/aws-amplify-angular';
import { Auth } from 'aws-amplify';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'xai-login',
  template: `
    <div *ngIf="error$ | async as error" class="error">
      {{ error }}
    </div>
    <p>Sign in with your email and password</p>

    <div class="login">
      <form [formGroup]="loginForm" (ngSubmit)="onSubmitLogin(loginForm.value)">
        <mat-form-field appearance="outline" style="width:100%">
          <mat-label>Email</mat-label>
          <input matInput type="email" formControlName="email" />
        </mat-form-field>

        <mat-form-field appearance="outline" style="width:100%">
          <mat-label>Password</mat-label>
          <input matInput type="password" formControlName="password" />
        </mat-form-field>

        <button
          *ngIf="!loading"
          class="submit-button"
          color="primary"
          style="width:100%"
          mat-flat-button
          type="submit"
        >
          Sign In
        </button>
        <div *ngIf="loading" class="spinner-container">
          <mat-spinner [diameter]="30"></mat-spinner>
        </div>
      </form>
      <span>Need an account?</span>&nbsp;<a routerLink="/signup">Sign up</a>
    </div>
  `,
  styles: [
    `
      :host {
        display: grid;
        height: 100%;
        justify-content: center;
        align-content: center;
      }

      .login {
        width: 300px;
      }

      .submit-button {
        margin: 20px 0px 10px 0px;
      }

      .spinner-container {
        width: 100%;
        display: flex;
      }

      .spinner-container mat-spinner {
        margin: auto;
      }

      .error {
        color: #721c24;
        background-color: #f8d7da;
        border-color: #f5c6cb;
        padding: 0.75rem 1.25rem;
        border-radius: 0.25rem;
        width: 260px;
      }
    `,
  ],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  loading = false;

  error$ = new BehaviorSubject<string>('');

  constructor(
    private amplify: AmplifyService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.amplify.authStateChange$.subscribe((authState) => {
      if (authState.state === 'signedIn') {
        this.router.navigate(['/home']);
      }
    });
  }

  onSubmitLogin(value: any) {
    this.loading = true;
    this.error$.next('');
    Auth.signIn(value.email, value.password).then(
      () => this.router.navigate(['/home']),
      (err) => {
        this.loading = false;
        this.error$.next(err.message);
      }
    );
  }
}
