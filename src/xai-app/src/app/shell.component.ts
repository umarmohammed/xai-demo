import { Component } from '@angular/core';

@Component({
  selector: 'xai-shell',
  template: `
    <mat-toolbar>
      <mat-toolbar-row>
        <span>XAI Demo</span>
      </mat-toolbar-row>
    </mat-toolbar>
    <mat-drawer-container>
      <mat-drawer mode="side" opened>Drawer content</mat-drawer>
      <mat-drawer-content>
        <router-outlet></router-outlet>
      </mat-drawer-content>
    </mat-drawer-container>
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
