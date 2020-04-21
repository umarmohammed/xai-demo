import { Component, OnInit } from '@angular/core';
import { DataGridService } from './data-grid.service';
import { AgGridEvent } from 'ag-grid-community';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'xai-data-grid',
  template: `
    <div
      class="grid-container"
      *ngIf="grid$ | async as grid"
      [class.highlight]="highlight$ | async"
    >
      <div>
        <mat-slide-toggle
          (change)="onHighlightChange($event)"
          [checked]="highlight$ | async"
          >Highlight</mat-slide-toggle
        >
      </div>
      <ag-grid-angular
        style="width: 100%; flex: 1;"
        class="ag-theme-alpine"
        [rowData]="grid.rowData"
        [columnDefs]="grid.columnDefs"
        rowSelection="single"
        (selectionChanged)="onSelectionChanged($event)"
        (gridSizeChanged)="onGridSizeChanged($event)"
        [xaiSelected]="selectedRowId$ | async"
        [rowClassRules]="rowClassRules"
      >
      </ag-grid-angular>
    </div>
    <mat-spinner class="spinner" [class.show]="loading$ | async"></mat-spinner>
  `,
  styles: [
    `
      .grid-container {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
    `,
  ],
})
export class DataGridComponent implements OnInit {
  grid$ = this.dataGrid.grid$;
  selectedRowId$ = this.dataGrid.selectedRowId$;
  loading$ = this.dataGrid.loading$;
  highlight$ = this.dataGrid.highlight$;

  rowClassRules = {
    'correct-prediction': (params) =>
      params.data.label === params.data.predicted,
    'wrong-prediction': (params) => params.data.label !== params.data.predicted,
  };

  constructor(private dataGrid: DataGridService) {}

  ngOnInit(): void {
    this.dataGrid.startLoading();
  }

  onHighlightChange(event: MatSlideToggleChange) {
    this.dataGrid.toggleHighlight(event.checked);
  }

  onSelectionChanged(event: AgGridEvent) {
    this.dataGrid.rowSelected(event);
  }

  onGridSizeChanged(params: AgGridEvent) {
    params.api.sizeColumnsToFit();
  }
}
