import { Component } from '@angular/core';
import { ModelService } from './model.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UploadTextModelComponent } from './upload-text-model.component';

@Component({
  selector: 'xai-home',
  template: `<div class="grid-container">
    <div class="button-container">
      <button (click)="fileInput.click()" color="primary" mat-stroked-button>
        Upload Tabular Model
      </button>
      <input
        hidden
        type="file"
        #fileInput
        type="file"
        (change)="fileUploaded(fileInput.files[0])"
      />
    </div>
    <div class="button-container">
      <button (click)="openDialog()" color="primary" mat-stroked-button>
        Upload Text Model
      </button>
    </div>
  </div> `,
  styleUrls: ['home.component.scss'],
})
export class HomeComponent {
  constructor(
    private model: ModelService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  fileUploaded(file: File) {
    this.model.loadModel(file);
    this.router.navigate(['local']);
  }

  openDialog() {
    this.dialog.open(UploadTextModelComponent, {
      width: '500px',
      autoFocus: false,
    });
  }
}
