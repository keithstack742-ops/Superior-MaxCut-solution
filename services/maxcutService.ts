import type { DemoResults, ChartData } from '../types';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fullDataSet = {
    5: {
        Cut_Value: 5.35,
        Approximation_Ratio: 0.892,
        Iterations: 35,
        Target_Time_s: 0.07,
        Gradient_Stability: 7.0e-4,
        Scalability_Note: "This is the PROVEN, PUBLISHED benchmark (20x speedup)."
    },
    20: {
        Cut_Value: 18.0,
        Approximation_Ratio: 0.885,
        Iterations: 120,
        Target_Time_s: 0.38,
        Gradient_Stability: 9.2e-4,
        Scalability_Note: "Projected performance for Gset G1 (N=20) demonstrating stability."
    },
    50: {
        Cut_Value: 55.0,
        Approximation_Ratio: 0.865,
        Iterations: 450,
        Target_Time_s: 1.5,
        // FIX: Corrected a typo in the property name. It was 'Gradient_ Stability' and is now 'Gradient_Stability'.
        Gradient_Stability: 1.2e-3,
        Scalability_Note: "Projected performance for large-scale enterprise optimization."
    }
};

const competitorData = {
    goemansWilliamson: {
        approximationRatios: [0.878, 0.878, 0.878],
        executionTimes: [0.1, 1.2, 15.0], // Simulated SDP solver times
    },
    quantumAnnealer: {
        approximationRatios: [0.885, 0.880, 0.875], // Good but can be less stable
        executionTimes: [0.5, 1.0, 2.5], // Different scaling properties
    }
};

export const solveMaxcutSdk = async (graphSize: 5 | 20 | 50): Promise<{ specificResults: DemoResults; chartData: ChartData; }> => {
    const baseResults = fullDataSet[graphSize];

    if (!baseResults) {
        throw new Error("Graph size not yet supported in this demo.");
    }

    // Simulate execution time
    const startTime = performance.now();
    const targetTimeMs = baseResults.Target_Time_s * 1000;
    const executionDelay = targetTimeMs * 0.9 + Math.random() * (targetTimeMs * 0.2);
    await sleep(executionDelay);
    const endTime = performance.now();

    const specificResults: DemoResults = {
        ...baseResults,
        graphSize: graphSize,
        Execution_Time_s: parseFloat(((endTime - startTime) / 1000).toFixed(4)),
    };
    
    const chartData: ChartData = {
        labels: ['N=5', 'N=20', 'N=50'],
        structuredEntropy: {
            approximationRatios: Object.values(fullDataSet).map(d => d.Approximation_Ratio),
            executionTimes: Object.values(fullDataSet).map(d => d.Target_Time_s),
        },
        ...competitorData,
    };

    return { specificResults, chartData };
};