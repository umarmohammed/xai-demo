import { Injectable } from '@angular/core';
import { ModelService } from './model.service';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GlobalService {
  private url = 'http://localhost:5000/api/global/selector';

  global$ = this.modelService.model$.pipe(
    switchMap((model) => this.http.post(this.url, model))
  );

  constructor(private modelService: ModelService, private http: HttpClient) {}
}
