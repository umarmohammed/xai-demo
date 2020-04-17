import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { switchMap } from 'rxjs/operators';
import { ModelData } from './model-data';

@Injectable({ providedIn: 'root' })
export class ModelService {
  private uploadUrl = 'http://localhost:5000/api/upload';

  private fileSubject = new BehaviorSubject<FormData>(null);

  model$ = this.fileSubject.pipe(
    switchMap((file) => this.http.post<ModelData>(this.uploadUrl, file))
  );

  constructor(private http: HttpClient) {}

  upload(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    this.fileSubject.next(formData);
  }
}
