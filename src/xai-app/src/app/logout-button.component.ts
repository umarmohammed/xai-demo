import { Component } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

@Component({
  selector: 'xai-log-out',
  template: `
    <button mat-button (click)="logout()">
      Logout
    </button>
  `,
})
export class LogOutButton {
  constructor(private router: Router) {}

  logout() {
    Auth.signOut().then(() => this.router.navigate(['/login']));
  }
}
