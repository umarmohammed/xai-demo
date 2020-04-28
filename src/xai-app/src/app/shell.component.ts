import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SideNavService } from './side-nav.service';

@Component({
  selector: 'xai-shell',
  template: `
    <mat-toolbar>
      <mat-toolbar-row>
        <button mat-icon-button (click)="onMenuClicked()">
          <mat-icon>menu</mat-icon>
        </button>
        <a mat-button routerLink="/home">XAI Demo</a>
        <a mat-button routerLinkActive="active" routerLink="/fairness"
          >Fairness</a
        >
        <a mat-button routerLinkActive="active" routerLink="/explain"
          >Explain</a
        >
        <span class="example-spacer"></span>
        <xai-log-out></xai-log-out>
      </mat-toolbar-row>
    </mat-toolbar>
    <div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      :host {
        display: grid;
        grid-template-rows: 64px 1fr;
        height: 100%;
      }

      a.active {
        background: hsla(0, 0%, 100%, 0.65);
      }
    `,
  ],
})
export class ShellComponent {
  constructor(private sideNavService: SideNavService) {}

  onMenuClicked() {
    this.sideNavService.toggle();
    this.triggerWindowChangeForCharts();
  }

  triggerWindowChangeForCharts() {
    window.dispatchEvent(new Event('resize'));
  }
}
