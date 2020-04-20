import { Injectable } from '@angular/core';
import { ModelService } from './model.service';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, filter, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class GlobalService {
  private infoUrl = `${environment.baseUrl}api/global/feature-info`;
  private importanceUrl = `${environment.baseUrl}api/global/feature-importance`;

  globalInfo$ = this.modelService.model$.pipe(
    switchMap((model) => this.http.post(this.infoUrl, model)),
    shareReplay()
  );

  globalImportance$ = this.modelService.model$.pipe(
    switchMap((model) => this.http.post<any>(this.importanceUrl, model)),
    filter((res) => res && res.data[0]),
    map((res) => res.data[0]),
    map((data) =>
      data.x.map((value: any, i: number) => ({ value, name: data.y[i] }))
    ),
    shareReplay()
  );

  constructor(private modelService: ModelService, private http: HttpClient) {}
}
