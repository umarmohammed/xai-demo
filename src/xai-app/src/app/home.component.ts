import { Component } from '@angular/core';
import { ModelService } from './model.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UploadTextModelComponent } from './upload-text-model.component';

@Component({
  selector: 'xai-home',
  template: `
    <mat-toolbar>
      <mat-toolbar-row>
        <span>XAI Demo</span>
        <span class="example-spacer"></span>
        <xai-log-out></xai-log-out>
      </mat-toolbar-row>
    </mat-toolbar>
    <div class="grid-container">
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
          accept=".joblib"
        />
      </div>
      <div class="button-container">
        <button (click)="openDialog()" color="primary" mat-stroked-button>
          Upload Text Model
        </button>
      </div>
    </div>
  `,
  styleUrls: ['home.component.scss'],
})
export class HomeComponent {
  constructor(
    private model: ModelService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  fileUploaded(file: File) {
    this.model.loadTabularModel(file);
    this.router.navigate(['local']);
  }

  openDialog() {
    const dialogRef = this.dialog.open(UploadTextModelComponent, {
      width: '500px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['local']);
      }
    });
  }
}
