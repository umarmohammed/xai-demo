import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { AgGridEvent } from 'ag-grid-community';

@Injectable({ providedIn: 'root' })
export class DataGridService {
  grid$ = this.dataService.data$.pipe(
    map((data) => ({
      rowData: data.items,
      columnDefs: data.featureNames.map(this.featureNameToColumnDef),
    }))
  );

  private selectedRowId = new BehaviorSubject<number>(null);
  selectedRowId$ = this.selectedRowId.asObservable();

  constructor(private dataService: DataService) {}

  rowSelected(event: AgGridEvent) {
    this.selectedRowId.next(+event.api.getSelectedNodes()[0]['id']);
  }

  private featureNameToColumnDef(featureName: string) {
    return { headerName: featureName, field: featureName };
  }
}
