export interface FeatureShapingResponse {
  data: FeatureShapingData[];
  layout: FeatureShapingLayout;
}

export interface FeatureShapingData {
  type: string;
  x: (number | string)[];
  xaxis: string;
  y: number[];
  yaxis: string;
  name: string;
}

export interface FeatureShapingLayout {
  title: FeatureShapingLayoutTitle;
  yaxis: FeatureShapingLayoutAxis;
  yaxis2: FeatureShapingLayoutAxis;
}

export interface FeatureShapingLayoutTitle {
  text: string;
}

export interface FeatureShapingLayoutAxis {
  title: FeatureShapingLayoutTitle;
  range?: [number, number];
}
