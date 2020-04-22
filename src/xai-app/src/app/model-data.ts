export interface Model {
  modelType: ModelType;
  formData: FormData;
}

export enum ModelType {
  Text = 'Text',
  Tabular = 'Tabular',
}

export interface TabularModelData {
  items: any[];
  featureNames: string[];
}

export interface TextModelData {
  items: any[];
  featureNames: string[];
}

export interface TextModelItem {
  value: string;
  target: string;
}

export function createTextModelData(items: TextModelItem[]): TextModelData {
  return {
    items,
    featureNames: ['value', 'target'],
  };
}
