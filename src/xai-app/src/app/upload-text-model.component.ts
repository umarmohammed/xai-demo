import { Component } from '@angular/core';

@Component({
  selector: 'xai-upload-text-model',
  template: `
    <mat-dialog-content>
      <div>
        <label for="model-file">Model file: </label>
        <input id="model-file" type="file" #modelFileInput type="file" />
      </div>
      <div>
        <label for="data-file">Data file: </label>
        <input id="data-file" type="file" #dataFileInput type="file" />
      </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button mat-dialog-close>Ok</button>
    </mat-dialog-actions>
  `,
})
export class UploadTextModelComponent {}
