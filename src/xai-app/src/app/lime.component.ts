import { Component } from '@angular/core';
import { LimeService } from './lime.service';

@Component({
  selector: 'xai-lime',
  template: `{{ limeService.lime$ | async | json }}`,
})
export class LimeComponent {
  constructor(public limeService: LimeService) {}
}
