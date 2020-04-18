import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'xai-local',
  template: `
    <ul *ngIf="data$ | async as model">
      <li *ngFor="let item of model.items">
        {{ item | json }}
      </li>
    </ul>
  `,
})
export class LocalComponent {
  data$ = this.dataService.data$;

  constructor(private dataService: DataService) {}
}
