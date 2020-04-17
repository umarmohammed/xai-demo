import { Component } from '@angular/core';
import { ModelService } from './model.service';

@Component({
  selector: 'xai-local',
  template: `
    <ul *ngIf="model$ | async as model">
      <li *ngFor="let item of model.items">
        {{ item | json }}
      </li>
    </ul>
  `,
})
export class LocalComponent {
  model$ = this.modelService.model$;

  constructor(public modelService: ModelService) {}
}
