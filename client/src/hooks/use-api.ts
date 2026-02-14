import { useQuery } from '@tanstack/react-query';
import { mockPlots, generateTimeSeries, mockFlags, mockStats, mockRiskDistribution } from '../lib/mock-data';
import type { Plot, PlotTimeSeries, Flag, PortfolioStats, RiskDistribution } from '../types';

// Simulated API delay
const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

// These hooks are wired to mock data but structured for easy backend swap.
// Replace the queryFn with actual fetch calls to /api/* endpoints.

export function usePlots() {
  return useQuery<Plot[]>({
    queryKey: ['plots'],
    queryFn: async () => {
      await delay(400);
      // Replace with: fetch('/api/plots').then(r => r.json())
      return mockPlots;
    },
  });
}

export function usePlot(id: string) {
  return useQuery<Plot | undefined>({
    queryKey: ['plot', id],
    queryFn: async () => {
      await delay(300);
      return mockPlots.find(p => p.id === id);
    },
  });
}

export function usePlotTimeSeries(id: string) {
  return useQuery<PlotTimeSeries[]>({
    queryKey: ['plot-timeseries', id],
    queryFn: async () => {
      await delay(500);
      return generateTimeSeries(id);
    },
  });
}

export function useFlags() {
  return useQuery<Flag[]>({
    queryKey: ['flags'],
    queryFn: async () => {
      await delay(400);
      return mockFlags;
    },
  });
}

export function usePortfolioStats() {
  return useQuery<PortfolioStats>({
    queryKey: ['portfolio-stats'],
    queryFn: async () => {
      await delay(300);
      return mockStats;
    },
  });
}

export function useRiskDistribution() {
  return useQuery<RiskDistribution[]>({
    queryKey: ['risk-distribution'],
    queryFn: async () => {
      await delay(300);
      return mockRiskDistribution;
    },
  });
}
