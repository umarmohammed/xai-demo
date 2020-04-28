import { Component, OnInit } from '@angular/core';
import { ModelService } from './model.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UploadTextModelComponent } from './upload-text-model.component';
import { LimeService } from './lime.service';

@Component({
  selector: 'xai-home',
  template: `
    <mat-toolbar>
      <mat-toolbar-row>
        <a mat-button routerLink="/home">XAI Demo</a>
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
export class HomeComponent implements OnInit {
  constructor(
    private model: ModelService,
    private router: Router,
    public dialog: MatDialog,
    private lime: LimeService
  ) {}

  ngOnInit(): void {
    this.model.clearModel();
    this.lime.clearCache();
  }

  fileUploaded(file: File) {
    this.model.loadTabularModel(file);
    this.router.navigate(['/']);
  }

  openDialog() {
    const dialogRef = this.dialog.open(UploadTextModelComponent, {
      width: '500px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['/']);
      }
    });
  }
}
