import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Model, ModelType } from './model-data';
import { filter, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ModelService {
  private modelSubject = new BehaviorSubject<Model>(null);

  model$ = this.modelSubject.asObservable();

  tabularModel$ = this.model$.pipe(
    filter((model) => model.modelType === ModelType.Tabular),
    map((model) => model.formData)
  );

  loadTabularModel = this.loadModel(ModelType.Tabular);
  loadTextModel = this.loadModel(ModelType.Text);

  private loadModel(modelType: ModelType) {
    return (file: File) => {
      const formData = this.fileToFormData(file);
      this.modelSubject.next({ formData, modelType });
    };
  }

  private fileToFormData(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return formData;
  }
}
