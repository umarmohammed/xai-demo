import { Component, Injectable } from '@angular/core';
import { DataGridService } from './data-grid.service';
import { ModelService } from './model.service';
import { withLatestFrom, switchMap, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LimeService {
  private url = (id: string) => `http://localhost:5000/api/lime/${id}`;

  lime$ = this.gridService.selectedRowId$.pipe(
    filter((id) => !!id),
    withLatestFrom(this.modelService.model$),
    switchMap(([id, model]) => this.http.post(this.url(id), model))
  );

  constructor(
    private gridService: DataGridService,
    private modelService: ModelService,
    private http: HttpClient
  ) {}
}
