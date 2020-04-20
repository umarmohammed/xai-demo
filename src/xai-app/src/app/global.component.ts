import { Component } from '@angular/core';

@Component({
  selector: 'xai-global',
  template: `<nav mat-tab-nav-bar>
      <a
        mat-tab-link
        routerLink="feature-info"
        routerLinkActive
        #rla="routerLinkActive"
        [active]="rla.isActive"
      >
        Feature Info
      </a>
      <a
        mat-tab-link
        routerLink="feature-importance"
        routerLinkActive
        #rla1="routerLinkActive"
        [active]="rla1.isActive"
      >
        Feature Importance
      </a>
    </nav>
    <div style="height: calc(100% - 49px)">
      <router-outlet></router-outlet>
    </div> `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
    `,
  ],
})
export class GlobalComponent {}
