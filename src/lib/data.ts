export interface BenchmarkPoint {
  name: string;
  price: number;
  performance: number;
  latency?: number; // Added latency (ms)
  highlight?: boolean;
}

export interface CategoryData {
  category: string;
  count: number;
  benchmarks: BenchmarkPoint[];
}

// Data extracted from the CSV provided + Latency update
export const benchmarkData: BenchmarkPoint[] = [
  { name: "Alchemyst", price: 0.06, performance: 0.761, latency: 170, highlight: true },
  { name: "Hindsight GPT OSS 120B", price: 0.36, performance: 0.907, latency: 450 },
  { name: "Supermemory", price: 6.333, performance: 0.833, latency: 820 },
  { name: "Zep", price: 12.5, performance: 0.723, latency: 1150 }
];

export const detailedCategories: CategoryData[] = [
  {
    category: "Single Session Preference",
    count: 30,
    benchmarks: [
      { name: "Supermemory", price: 6.333, performance: 0.7 },
      { name: "Zep", price: 12.5, performance: 0.567 },
      { name: "Hindsight GPT OSS 120B", price: 0.36, performance: 0.867 },
      { name: "Alchemyst", price: 0.06, performance: 0.6, highlight: true }
    ]
  },
  {
    category: "Single Session User",
    count: 68,
    benchmarks: [
      { name: "Supermemory", price: 6.333, performance: 0.971 },
      { name: "Zep", price: 12.5, performance: 0.929 },
      { name: "Hindsight GPT", price: 0.36, performance: 1 },
      { name: "Alchemyst", price: 0.06, performance: 0.9559, highlight: true }
    ]
  },
  {
    category: "Knowledge Update",
    count: 75,
    benchmarks: [
      { name: "Supermemory", price: 6.333, performance: 0.884 },
      { name: "Zep", price: 12.5, performance: 0.833 },
      { name: "Hindsight GPT", price: 0.36, performance: 0.923 },
      { name: "Alchemyst", price: 0.06, performance: 0.56, highlight: true }
    ]
  },
  {
    category: "Single Session Assistant",
    count: 55,
    benchmarks: [
      { name: "Supermemory", price: 6.333, performance: 0.964 },
      { name: "Zep", price: 12.5, performance: 0.804 },
      { name: "Hindsight GPT", price: 0.36, performance: 0.982 },
      { name: "Alchemyst", price: 0.06, performance: 0.9636, highlight: true }
    ]
  },
  {
    category: "Temporal Reasoning",
    count: 131,
    benchmarks: [
      { name: "Supermemory", price: 6.333, performance: 0.767 },
      { name: "Zep", price: 12.5, performance: 0.624 },
      { name: "Hindsight GPT", price: 0.36, performance: 0.857 },
      { name: "Alchemyst", price: 0.06, performance: 0.7557, highlight: true }
    ]
  },
  {
    category: "Multi Session",
    count: 133,
    benchmarks: [
      { name: "Supermemory", price: 6.333, performance: 0.714 },
      { name: "Zep", price: 12.5, performance: 0.579 },
      { name: "Hindsight GPT", price: 0.36, performance: 0.812 },
      { name: "Alchemyst", price: 0.06, performance: 0.7293, highlight: true }
    ]
  }
];
