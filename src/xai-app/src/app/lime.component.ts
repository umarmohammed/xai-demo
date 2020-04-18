import { Component } from '@angular/core';
import { LimeService } from './lime.service';

@Component({
  selector: 'xai-lime',
  template: `<ngx-charts-bar-horizontal [results]="limeService.lime$ | async">
  </ngx-charts-bar-horizontal>`,
})
export class LimeComponent {
  constructor(public limeService: LimeService) {}
}
