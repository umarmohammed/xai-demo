import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>

    <a
      style="position: absolute; left: 0; bottom: 0; z-index: 1;"
      href="https://www.netlify.com"
    >
      <img
        src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg"
        alt="Deploys by Netlify"
      />
    </a>`,
})
export class AppComponent {}
