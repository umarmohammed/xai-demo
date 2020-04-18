import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModelService {
  private modelSubject = new BehaviorSubject<FormData>(null);

  model$ = this.modelSubject.asObservable();

  loadModel(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    this.modelSubject.next(formData);
  }
}
