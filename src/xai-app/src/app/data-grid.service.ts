import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { AgGridEvent } from 'ag-grid-community';

@Injectable({ providedIn: 'root' })
export class DataGridService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  // TODO: should move loading subject to dataService
  // and just expose that service from here to the component
  grid$ = this.dataService.data$.pipe(
    tap(() => this.loadingSubject.next(false)),
    map((data) => ({
      rowData: data.items,
      columnDefs: data.featureNames.map(this.featureNameToColumnDef),
    }))
  );

  private selectedRowId = new BehaviorSubject<number>(null);
  selectedRowId$ = this.selectedRowId.asObservable();

  constructor(private dataService: DataService) {}

  startLoading() {
    this.loadingSubject.next(true);
  }

  rowSelected(event: AgGridEvent) {
    this.selectedRowId.next(+event.api.getSelectedNodes()[0]['id']);
  }

  private featureNameToColumnDef(featureName: string) {
    return { headerName: featureName, field: featureName };
  }
}
