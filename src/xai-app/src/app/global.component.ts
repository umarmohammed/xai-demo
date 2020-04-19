import { Component } from '@angular/core';
import { GlobalService } from './global.service';

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
    </nav>
    <div>
      <router-outlet></router-outlet>
    </div> `,
  styles: [
    `
      :host {
        display: grid;
        grid-template-rows: 48px 1fr;
        height: 100%;
      }
    `,
  ],
})
export class GlobalComponent {}
