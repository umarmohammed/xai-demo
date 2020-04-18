import { Component } from '@angular/core';
import { LocalService } from './local.service';

@Component({
  selector: 'xai-local',
  template: `
    <ag-grid-angular
      *ngIf="grid$ | async as grid"
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [rowData]="grid.rowData"
      [columnDefs]="grid.columnDefs"
    >
    </ag-grid-angular>
  `,
})
export class LocalComponent {
  grid$ = this.local.grid$;

  constructor(private local: LocalService) {}
}
