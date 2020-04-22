import { Injectable } from '@angular/core';
import { ModelService } from './model.service';
import { switchMap, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {
  TabularModelData,
  TextModelItem,
  ModelType,
  TextModelData,
  createTextModelData,
} from './model-data';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  private uploadUrl = `${environment.baseUrl}api/upload`;
  private textDataSubject = new BehaviorSubject<TextModelData>(null);

  data$ = this.modelService.model$.pipe(
    switchMap((model) =>
      model.modelType === ModelType.Tabular
        ? this.http.post<TabularModelData>(this.uploadUrl, model.formData)
        : this.textDataSubject
    ),
    shareReplay()
  );

  constructor(private modelService: ModelService, private http: HttpClient) {}

  loadTextData(data: TextModelItem[]) {
    this.textDataSubject.next(createTextModelData(data));
  }
}
