import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LocalService {
  grid$ = this.dataService.data$.pipe(
    map((data) => ({
      rowData: data.items,
      columnDefs: data.featureNames.map(this.featureNameToColumnDef),
    }))
  );

  constructor(private dataService: DataService) {}

  private featureNameToColumnDef(featureName: string) {
    return { headerName: featureName, field: featureName };
  }
}
