import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'xai-signup',
  template: ` <div>
    <p>Sign up with a new account</p>

    <div class="signup" *ngIf="!successfullySignup">
      <form
        [formGroup]="signupForm"
        (ngSubmit)="onSubmitSignup(signupForm.value)"
      >
        <mat-form-field appearance="outline" style="width:100%">
          <mat-label>Email</mat-label>
          <input matInput type="email" formControlName="email" />
        </mat-form-field>

        <mat-form-field appearance="outline" style="width:100%">
          <mat-label>Password</mat-label>
          <input matInput type="password" formControlName="password" />
        </mat-form-field>
        <button
          class="submit-button"
          color="primary"
          style="width:100%"
          mat-flat-button
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>

    <div class="confirmation" *ngIf="successfullySignup">
      <form
        [formGroup]="confirmationForm"
        (ngSubmit)="onSubmitConfirmation(confirmationForm.value)"
      >
        <p>
          <label>Email: </label>
          <input type="email" formControlName="email" />
        </p>
        <p>
          <label>Confirmation Code: </label>
          <input type="text" formControlName="confirmationCode" />
        </p>
        <button type="submit">Confirm</button>
      </form>
    </div>
    <span>Already have an account?</span>&nbsp;<a routerLink="/login"
      >Sign in</a
    >
  </div>`,
  styles: [
    `
      :host {
        display: grid;
        align-items: center;
        justify-items: center;
        height: 100%;
      }

      .signup {
        width: 300px;
      }

      .submit-button {
        margin: 20px 0px 10px 0px;
      }
    `,
  ],
})
export class SignupComponent {
  public signupForm: FormGroup;
  public confirmationForm: FormGroup;
  public successfullySignup: boolean;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.confirmationForm = this.fb.group({
      email: ['', Validators.required],
      confirmationCode: ['', Validators.required],
    });
  }

  onSubmitSignup(value: any) {
    const email = value.email,
      password = value.password;
    Auth.signUp(email, password).then(
      (result) => {
        this.successfullySignup = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmitConfirmation(value: any) {
    const email = value.email,
      confirmationCode = value.confirmationCode;
    Auth.confirmSignUp(email, confirmationCode).then(
      (result) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
