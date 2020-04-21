import { Directive, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[xaiRowVisible]',
})
export class DataGridRowVisibleDirective {
  @Input('xaiRowVisible') selectedRow: number;

  private destroySubject = new Subject();

  constructor(grid: AgGridAngular) {
    grid.gridReady.pipe(takeUntil(this.destroySubject)).subscribe(() => {
      if (this.selectedRow) {
        grid.api.ensureIndexVisible(this.selectedRow, 'middle');
      }
    });
  }

  ngOnDestroy() {
    this.destroySubject.next(true);
  }
}
