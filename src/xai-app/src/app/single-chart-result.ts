export interface SingleChartResult {
  name: string;
  value: number;
}

export function createChartResult(value: [string, number]): SingleChartResult {
  return {
    name: value[0],
    value: value[1],
  };
}
