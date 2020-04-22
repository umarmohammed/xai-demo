import { Component } from '@angular/core';
import { ModelService } from './model.service';
import { DataService } from './data.service';
import { TextModelItem } from './model-data';

@Component({
  selector: 'xai-upload-text-model',
  template: `
    <mat-dialog-content>
      <div>
        <label for="model-file">Model file: </label>
        <input
          (change)="onModelInputChange(modelFileInput.files[0])"
          id="model-file"
          type="file"
          #modelFileInput
          type="file"
          accept=".joblib"
        />
      </div>
      <div>
        <label for="data-file">Data file: </label>
        <input
          (change)="onDataInputChange(dataFileInput.files[0])"
          id="data-file"
          type="file"
          #dataFileInput
          type="file"
          accept=".json"
        />
      </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancel</button>
      <button
        [disabled]="!modelFileInput.files[0] || !dataFileInput.files[0]"
        mat-button
        [mat-dialog-close]="true"
      >
        Ok
      </button>
    </mat-dialog-actions>
  `,
})
export class UploadTextModelComponent {
  constructor(private model: ModelService, private data: DataService) {}

  onModelInputChange(file: File) {
    this.model.loadTextModel(file);
  }

  onDataInputChange(file: File) {
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = () => this.loadTextData(fileReader.result as string);
  }

  private loadTextData(value: string) {
    const textData: TextModelItem[] = JSON.parse(value);
    this.data.loadTextData(textData);
  }
}
