import { Component } from '@angular/core';
import { SideNavService } from './side-nav.service';

@Component({
  selector: 'xai-explainability',
  template: `<mat-sidenav-container>
    <mat-sidenav #sidenav mode="side" [opened]="sideNavOpen$ | async">
      <mat-nav-list>
        <a mat-list-item routerLink="local" routerLinkActive="active">Local</a>
        <a mat-list-item routerLink="global" routerLinkActive="active"
          >Global</a
        >
      </mat-nav-list>
    </mat-sidenav>
    <mat-sidenav-content>
      <router-outlet></router-outlet>
    </mat-sidenav-content>
  </mat-sidenav-container>`,
  styles: [
    `
      mat-sidenav-container {
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
export class ExplainabilityComponent {
  sideNavOpen$ = this.sideNavService.sideNavOpen$;

  constructor(private sideNavService: SideNavService) {}
}
