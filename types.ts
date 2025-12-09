export interface DemoResults {
  graphSize: number;
  Cut_Value: number;
  Approximation_Ratio: number;
  Iterations: number;
  Target_Time_s: number;
  Gradient_Stability: number;
  Scalability_Note: string;
  Execution_Time_s: number;
}


export interface ChartData {
  labels: string[];
  structuredEntropy: {
    approximationRatios: number[];
    executionTimes: number[];
  };
  goemansWilliamson: {
    approximationRatios: number[];
    executionTimes: number[];
  };
  quantumAnnealer: {
    approximationRatios: number[];
    executionTimes: number[];
  };
}
