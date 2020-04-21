import { Injectable } from '@angular/core';
import { foo } from './foo';
import { of } from 'rxjs';
import { FeatureShapingData } from './feature-shaping-response';
import { map } from 'rxjs/operators';
import { zip } from './array-utils';

@Injectable({ providedIn: 'root' })
export class GlobalFeatureShapingService {
  globalFeatureShaping$ = of(foo);

  featureShaping$ = this.globalFeatureShaping$.pipe(
    map((fs) => ({
      results: this.featureShapingDataToNgxChartsSeries(fs.data),
      title: fs.layout.title.text,
      yScaleMin: fs.layout.yaxis.range[0],
      yScaleMax: fs.layout.yaxis.range[1],
      yAxisLabel: fs.layout.yaxis.title.text,
    }))
  );

  private featureShapingDataToNgxChartsSeries(data: FeatureShapingData[]) {
    return [
      {
        name: data[1].name,
        series: zip(
          data.find(this.islineChart).x.map((v) => ({ name: v })),
          ...data.filter(this.islineChart).map(this.getValues)
        ),
      },
    ];
  }

  private islineChart(data: FeatureShapingData) {
    return data.type === 'scatter';
  }

  private getValues(data: FeatureShapingData) {
    const fs2NgxChartsMap = {
      'Lower Bound': 'min',
      'Upper Bound': 'max',
      Main: 'value',
    };
    return data.y.map((v) => ({ [fs2NgxChartsMap[data.name]]: v }));
  }
}
