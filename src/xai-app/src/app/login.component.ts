import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AmplifyService } from '@flowaccount/aws-amplify-angular';
import { Auth } from 'aws-amplify';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'xai-login',
  template: `<p>login</p>
    <div class="login">
      <form [formGroup]="loginForm" (ngSubmit)="onSubmitLogin(loginForm.value)">
        <p>
          <label>Email: </label>
          <input type="email" formControlName="email" />
        </p>
        <p>
          <label>Password: </label>
          <input type="password" formControlName="password" />
        </p>
        <button type="submit">Login</button>
      </form>
    </div>`,
  styles: [
    `
      :host {
        display: grid;
        height: 100%;
        justify-content: center;
        align-content: center;
      }
    `,
  ],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

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
    Auth.signIn(value.email, value.password).then(() =>
      this.router.navigate(['/home'])
    );
  }
}
