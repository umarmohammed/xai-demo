import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'xai-shell',
  template: `
    <mat-toolbar>
      <mat-toolbar-row>
        <button mat-icon-button (click)="onMenuClicked(sidenav)">
          <mat-icon>menu</mat-icon>
        </button>
        <a mat-button routerLink="/home">XAI Demo</a>
        <span class="example-spacer"></span>
        <xai-log-out></xai-log-out>
      </mat-toolbar-row>
    </mat-toolbar>
    <mat-sidenav-container>
      <mat-sidenav #sidenav mode="side" opened>
        <mat-nav-list>
          <a mat-list-item routerLink="/local" routerLinkActive="active"
            >Local</a
          >
          <a mat-list-item routerLink="/global" routerLinkActive="active"
            >Global</a
          >
        </mat-nav-list>
      </mat-sidenav>
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

      .active {
        background: #f5f5f5;
      }

      mat-sidenav {
        width: 200px;
      }
    `,
  ],
})
export class ShellComponent {
  onMenuClicked(sidenav: MatSidenav) {
    sidenav.toggle();
    this.triggerWindowChangeForCharts();
  }

  triggerWindowChangeForCharts() {
    window.dispatchEvent(new Event('resize'));
  }
}
