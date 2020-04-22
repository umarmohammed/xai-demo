import { Injectable } from '@angular/core';
import { DataGridService } from './data-grid.service';
import { ModelService } from './model.service';
import {
  withLatestFrom,
  switchMap,
  filter,
  map,
  shareReplay,
  tap,
} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { createChartResult } from './single-chart-result';
import { LimeResponse } from './lime-response';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { ModelType } from './model-data';

@Injectable({
  providedIn: 'root',
})
export class LimeService {
  private limeTabularUrl = (id: number) =>
    `${environment.baseUrl}api/lime/${id}`;
  private limeTextUrl = `${environment.baseUrl}api/lime-text`;
  private limeUrl = (id: number, modelType: ModelType) =>
    modelType === ModelType.Tabular
      ? this.limeTabularUrl(id)
      : this.limeTextUrl;

  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$ = combineLatest([
    this.gridService.selectedRowId$,
    this.loadingSubject,
  ]).pipe(
    map(
      ([selectedRowId, loading]) =>
        selectedRowId !== null && selectedRowId !== undefined && loading
    )
  );

  // Oh dear! Will probably use ngrx so cba
  // with a proper scan implementation
  cachedCalls = {};

  results$ = this.gridService.selectedRowId$.pipe(
    filter((id) => id !== null && id !== undefined),
    withLatestFrom(this.modelService.model$, this.gridService.grid$),
    switchMap(([id, model, grid]) => {
      if (!this.cachedCalls[id]) {
        this.loadingSubject.next(true);

        const uploadModel =
          model.modelType === ModelType.Tabular
            ? model.formData
            : this.createTextUploadModel(model.formData, grid.rowData[id]);
        this.cachedCalls[id] = this.http
          .post<LimeResponse>(this.limeUrl(id, model.modelType), uploadModel)
          .pipe(
            map((res) => ({
              ...res,
              exp: res.exp.map(createChartResult),
            })),
            shareReplay()
          );
      }

      return this.cachedCalls[id];
    }),
    tap(() => this.loadingSubject.next(false))
  );

  constructor(
    private gridService: DataGridService,
    private modelService: ModelService,
    private http: HttpClient
  ) {}

  private createTextUploadModel(model: FormData, rowData: any) {
    model.set('data', rowData.value);
    return model;
  }
}
