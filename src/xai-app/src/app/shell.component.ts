import { Component } from '@angular/core';

@Component({
  selector: 'xai-shell',
  template: `<mat-toolbar>
      <mat-toolbar-row>
        <span>XAI Demo</span>
      </mat-toolbar-row>
    </mat-toolbar>
    <div>
      <router-outlet></router-outlet>
    </div>`,
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
