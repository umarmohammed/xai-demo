import { Component } from '@angular/core';
import { DataGridService } from './data-grid.service';
import { AgGridEvent } from 'ag-grid-community';

@Component({
  selector: 'xai-data-grid',
  template: ` <ag-grid-angular
    *ngIf="grid$ | async as grid"
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [rowData]="grid.rowData"
    [columnDefs]="grid.columnDefs"
    rowSelection="single"
    (selectionChanged)="onSelectionChanged($event)"
    (gridSizeChanged)="onGridSizeChanged($event)"
    [xaiSelected]="selectedRowId$ | async"
  >
  </ag-grid-angular>`,
})
export class DataGridComponent {
  grid$ = this.dataGrid.grid$;
  selectedRowId$ = this.dataGrid.selectedRowId$;

  constructor(private dataGrid: DataGridService) {}

  onSelectionChanged(event: AgGridEvent) {
    this.dataGrid.rowSelected(event);
  }

  onGridSizeChanged(params: AgGridEvent) {
    params.api.sizeColumnsToFit();
  }
}
