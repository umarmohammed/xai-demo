import { Injectable } from '@angular/core';
import { DataGridService } from './data-grid.service';
import { ModelService } from './model.service';
import {
  withLatestFrom,
  switchMap,
  filter,
  map,
  shareReplay,
} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { createChartResult } from './single-chart-result';
import { LimeResponse } from './lime-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LimeService {
  private url = (id: number) => `${environment.baseUrl}api/lime/${id}`;

  // Oh dear! Will probably use ngrx so cba
  // with a proper scan implementation
  cachedCalls = {};

  results$ = this.gridService.selectedRowId$.pipe(
    filter((id) => !!id),
    withLatestFrom(this.modelService.model$),
    switchMap(([id, model]) => {
      if (!this.cachedCalls[id]) {
        this.cachedCalls[id] = this.http
          .post<LimeResponse>(this.url(id), model)
          .pipe(
            map((res) => ({ ...res, exp: res.exp.map(createChartResult) })),
            shareReplay()
          );
      }

      return this.cachedCalls[id];
    })
  );

  constructor(
    private gridService: DataGridService,
    private modelService: ModelService,
    private http: HttpClient
  ) {}
}
