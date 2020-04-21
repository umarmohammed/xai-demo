import { Injectable } from '@angular/core';
import { foo } from './foo';
import { of } from 'rxjs';
import { FeatureShapingData } from './feature-shaping-response';
import { map, shareReplay } from 'rxjs/operators';
import { zip } from './array-utils';

@Injectable({ providedIn: 'root' })
export class GlobalFeatureShapingService {
  globalFeatureShapingResponse$ = of(foo).pipe(shareReplay());

  featureShapingLine$ = this.globalFeatureShapingResponse$.pipe(
    map((reponse) => ({
      results: this.featureShapingDataToNgxLineChart(reponse.data),
      yScaleMin: reponse.layout.yaxis.range[0],
      yScaleMax: reponse.layout.yaxis.range[1],
      yAxisLabel: reponse.layout.yaxis.title.text,
    }))
  );

  featureShapingBar$ = this.globalFeatureShapingResponse$.pipe(
    map((response) => ({
      results: this.featureShapingDataToNgxBarChart(response.data),
      yAxisLabel: response.layout.yaxis2.title.text,
    }))
  );

  private featureShapingDataToNgxBarChart(data: FeatureShapingData[]) {
    const barData = data.find(this.isBarChart);

    return barData.y.map((value, i) => ({ value, name: barData.x[i] }));
  }

  private featureShapingDataToNgxLineChart(data: FeatureShapingData[]) {
    return [
      {
        name: 'Main',
        series: zip(
          data.find(this.islineChart).x.map((v) => ({ name: v })),
          ...data.filter(this.islineChart).map(this.getLineChartValues)
        ),
      },
    ];
  }

  private isChartType = (type: string) => (data: FeatureShapingData) =>
    data.type === type;

  private islineChart = this.isChartType('scatter');
  private isBarChart = this.isChartType('bar');

  private getLineChartValues(data: FeatureShapingData) {
    const fs2NgxChartsMap = {
      'Lower Bound': 'min',
      'Upper Bound': 'max',
      Main: 'value',
    };
    return data.y.map((v) => ({ [fs2NgxChartsMap[data.name]]: v }));
  }
}
