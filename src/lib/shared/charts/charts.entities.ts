export interface Point<T> {
  x: T;
  y: T;
}

export interface AxisDetails {
  label: string;
  unit?: string;
}

export interface Trace<T> {
  x: T[];
  y: T[];
}

export interface ChartData<T> {
  data: Trace<T> | Trace<T>[];
  details: {
    name: string;
    xAxis: AxisDetails;
    yAxis: AxisDetails;
  };
}
