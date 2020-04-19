import { Injectable } from '@angular/core';
import { ModelService } from './model.service';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GlobalService {
  private infoUrl = 'http://umarmohammed.io:8083/api/global/feature-info';
  private importanceUrl =
    'http://umarmohammed.io:8083/api/global/feature-importance';

  globalInfo$ = this.modelService.model$.pipe(
    switchMap((model) => this.http.post(this.infoUrl, model))
  );

  globalImportance$ = this.modelService.model$.pipe(
    switchMap((model) => this.http.post<any>(this.importanceUrl, model)),
    filter((res) => res && res.data[0]),
    map((res) => res.data[0]),
    map((data) =>
      data.x.map((value: any, i: number) => ({ value, name: data.y[i] }))
    )
  );

  constructor(private modelService: ModelService, private http: HttpClient) {}
}
