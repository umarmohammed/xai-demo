import { Component } from '@angular/core';
import { ModelService } from './model.service';
import { Router } from '@angular/router';

@Component({
  selector: 'xai-home',
  template: ` <button
      (click)="fileInput.click()"
      color="primary"
      mat-stroked-button
    >
      Upload Model
    </button>
    <input
      hidden
      type="file"
      #fileInput
      type="file"
      (change)="this.fileUploaded(fileInput.files[0])"
    />`,
  styleUrls: ['home.component.scss'],
})
export class HomeComponent {
  constructor(private model: ModelService, private router: Router) {}

  fileUploaded(file: File) {
    this.model.upload(file);
    this.router.navigate(['local']);
  }
}
