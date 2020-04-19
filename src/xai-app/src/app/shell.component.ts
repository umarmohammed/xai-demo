import { Component } from '@angular/core';

@Component({
  selector: 'xai-shell',
  template: `
    <mat-toolbar>
      <mat-toolbar-row>
        <button mat-icon-button (click)="sidenav.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <span>XAI Demo</span>
      </mat-toolbar-row>
    </mat-toolbar>
    <mat-sidenav-container>
      <mat-sidenav #sidenav mode="side" opened>Drawer content</mat-sidenav>
      <mat-sidenav-content>
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      :host {
        display: grid;
        grid-template-rows: 64px 1fr;
        height: 100%;
      }
    `,
  ],
})
export class ShellComponent {}
