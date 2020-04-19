import { SingleChartResult } from './single-chart-result';

export interface LimeResponse {
  exp: [[string, number]];
  predictProbabilities: SingleChartResult[];
}
