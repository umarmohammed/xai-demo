import { Injectable } from '@angular/core';
import { ModelService } from './model.service';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ModelData } from './model-data';

@Injectable({ providedIn: 'root' })
export class DataService {
  private uploadUrl = 'http://umarmohammed.io:8083/api/upload';

  data$ = this.modelService.model$.pipe(
    switchMap((model) => this.http.post<ModelData>(this.uploadUrl, model))
  );

  constructor(private modelService: ModelService, private http: HttpClient) {}
}
