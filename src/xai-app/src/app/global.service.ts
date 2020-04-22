import { Injectable } from '@angular/core';
import { ModelService } from './model.service';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, filter, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GlobalService {
  private infoUrl = `${environment.baseUrl}api/global/feature-info`;
  private importanceUrl = `${environment.baseUrl}api/global/feature-importance`;

  private globalInfoLoadingSubject = new BehaviorSubject<boolean>(false);
  globalInfoLoading$ = this.globalInfoLoadingSubject.asObservable();

  private globalImportanceLoadingSubject = new BehaviorSubject<boolean>(false);
  globalImportanceLoading$ = this.globalImportanceLoadingSubject.asObservable();

  globalInfo$ = this.modelService.tabularModel$.pipe(
    tap(() => this.globalInfoLoadingSubject.next(true)),
    switchMap((model) => this.http.post(this.infoUrl, model)),
    shareReplay(),
    tap(() => this.globalInfoLoadingSubject.next(false))
  );

  globalImportance$ = this.modelService.tabularModel$.pipe(
    tap(() => this.globalImportanceLoadingSubject.next(true)),
    switchMap((model) => this.http.post<any>(this.importanceUrl, model)),
    filter((res) => res && res.data[0]),
    map((res) => ({
      x: this.reverse(res.data[0].x),
      y: this.reverse(res.data[0].y),
    })),
    map((data) =>
      data.x.map((value: any, i: number) => ({ value, name: data.y[i] }))
    ),
    shareReplay(),
    tap(() => this.globalImportanceLoadingSubject.next(false))
  );

  constructor(private modelService: ModelService, private http: HttpClient) {}

  private reverse(arr: any[]) {
    return arr.slice(0).reverse();
  }
}
