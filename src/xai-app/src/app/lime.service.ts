import { Injectable } from '@angular/core';
import { DataGridService } from './data-grid.service';
import { ModelService } from './model.service';
import { withLatestFrom, switchMap, filter, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { createChartResult } from './single-chart-result';
import { LimeResponse } from './lime-response';

@Injectable({
  providedIn: 'root',
})
export class LimeService {
  private url = (id: string) => `http://umarmohammed.io:8083/api/lime/${id}`;

  results$ = this.gridService.selectedRowId$.pipe(
    filter((id) => !!id),
    withLatestFrom(this.modelService.model$),
    switchMap(([id, model]) =>
      this.http
        .post<LimeResponse>(this.url(id), model)
        .pipe(map((res) => ({ ...res, exp: res.exp.map(createChartResult) })))
    )
  );

  constructor(
    private gridService: DataGridService,
    private modelService: ModelService,
    private http: HttpClient
  ) {}
}
