import { Directive, Input, OnDestroy } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[xaiSelected]',
})
export class DataGridSelectedDirective implements OnDestroy {
  private destroySubject = new Subject();

  @Input('xaiSelected') selectedRow: number;

  constructor(grid: AgGridAngular) {
    grid.gridReady.pipe(takeUntil(this.destroySubject)).subscribe(() => {
      grid.gridOptions.api.forEachNode((node) =>
        node.rowIndex === this.selectedRow ? node.setSelected(true) : 0
      );
    });
  }

  ngOnDestroy() {
    this.destroySubject.next(true);
  }
}
