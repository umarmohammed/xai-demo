import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  FeatureShapingData,
  FeatureShapingResponse,
} from './feature-shaping-response';
import {
  map,
  shareReplay,
  withLatestFrom,
  switchMap,
  tap,
} from 'rxjs/operators';
import { zip } from './array-utils';
import { environment } from 'src/environments/environment';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { ModelService } from './model.service';

@Injectable({ providedIn: 'root' })
export class GlobalFeatureShapingService {
  private url = (feature: string) =>
    `${environment.baseUrl}api/global/feature-shaping/${feature}`;

  features$ = this.globalService.globalInfo$.pipe(
    map((info: any[]) =>
      info.map((i) => i.Name).filter((name: string) => !name.includes('_'))
    )
  );

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private selectedFeatureSubject = new BehaviorSubject<string>(null);

  selectedFeature$ = this.selectedFeatureSubject.pipe(
    withLatestFrom(this.features$),
    map(([selectedFeature, features]) => selectedFeature || features[0])
  );

  // Oh dear! Will probably use ngrx so cba
  // with a proper scan implementation
  cachedCalls: { [key: string]: Observable<FeatureShapingResponse> } = {};

  globalFeatureShapingResponse$ = this.selectedFeature$.pipe(
    tap(() => this.loadingSubject.next(true)),
    withLatestFrom(this.modelService.model$),
    switchMap(([feature, model]) => {
      if (!this.cachedCalls[feature]) {
        this.cachedCalls[feature] = this.http
          .post<FeatureShapingResponse>(this.url(feature), model)
          .pipe(shareReplay());
      }
      return this.cachedCalls[feature];
    }),
    tap(() => this.loadingSubject.next(false))
  );

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

  constructor(
    private globalService: GlobalService,
    private http: HttpClient,
    private modelService: ModelService
  ) {}

  selectFeature(value: string) {
    this.selectedFeatureSubject.next(value);
  }

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
