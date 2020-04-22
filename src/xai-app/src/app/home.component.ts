import { Component } from '@angular/core';
import { ModelService } from './model.service';
import { Router } from '@angular/router';

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
      <button (click)="fileInput.click()" color="primary" mat-stroked-button>
        Upload Text Model
      </button>
    </div>
  </div> `,
  styleUrls: ['home.component.scss'],
})
export class HomeComponent {
  constructor(private model: ModelService, private router: Router) {}

  fileUploaded(file: File) {
    this.model.loadModel(file);
    this.router.navigate(['local']);
  }
}
