import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AmplifyService } from '@flowaccount/aws-amplify-angular';
import { Auth } from 'aws-amplify';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'xai-login',
  template: `<p>Sign in with your email and password</p>
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
    </div> `,
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
    Auth.signIn(value.email, value.password).then(() =>
      this.router.navigate(['/home'])
    );
  }
}
