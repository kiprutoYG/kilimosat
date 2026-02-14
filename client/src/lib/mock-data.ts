import type { Plot, PlotTimeSeries, Flag, PortfolioStats, RiskDistribution } from '../types';

export const mockPlots: Plot[] = [
  {
    id: 'p1', name: 'Sunrise Maize Field', farmerId: 'f1', farmerName: 'Amina Osei',
    coordinates: [[-1.28, 36.82], [-1.28, 36.84], [-1.30, 36.84], [-1.30, 36.82]],
    center: [-1.29, 36.83], area: 12.5, crop: 'Maize', riskScore: 22,
    riskLevel: 'low', ndvi: 0.72, ndmi: 0.45, bsi: 0.15, creditAmount: 85000, createdAt: '2025-11-01',
  },
  {
    id: 'p2', name: 'River Valley Wheat', farmerId: 'f2', farmerName: 'Kofi Mensah',
    coordinates: [[-1.25, 36.78], [-1.25, 36.80], [-1.27, 36.80], [-1.27, 36.78]],
    center: [-1.26, 36.79], area: 8.3, crop: 'Wheat', riskScore: 55,
    riskLevel: 'medium', ndvi: 0.48, ndmi: 0.30, bsi: 0.32, creditAmount: 62000, createdAt: '2025-10-15',
  },
  {
    id: 'p3', name: 'Highland Sorghum', farmerId: 'f3', farmerName: 'Fatima Wanjiku',
    coordinates: [[-1.32, 36.86], [-1.32, 36.88], [-1.34, 36.88], [-1.34, 36.86]],
    center: [-1.33, 36.87], area: 15.0, crop: 'Sorghum', riskScore: 78,
    riskLevel: 'high', ndvi: 0.31, ndmi: 0.18, bsi: 0.48, creditAmount: 120000, createdAt: '2025-09-20',
  },
  {
    id: 'p4', name: 'Lakeside Rice Paddy', farmerId: 'f4', farmerName: 'Juma Otieno',
    coordinates: [[-1.22, 36.90], [-1.22, 36.92], [-1.24, 36.92], [-1.24, 36.90]],
    center: [-1.23, 36.91], area: 6.2, crop: 'Rice', riskScore: 92,
    riskLevel: 'critical', ndvi: 0.18, ndmi: 0.10, bsi: 0.62, creditAmount: 45000, createdAt: '2025-08-10',
  },
  {
    id: 'p5', name: 'Savanna Beans Plot', farmerId: 'f5', farmerName: 'Grace Achieng',
    coordinates: [[-1.35, 36.75], [-1.35, 36.77], [-1.37, 36.77], [-1.37, 36.75]],
    center: [-1.36, 36.76], area: 10.1, crop: 'Beans', riskScore: 35,
    riskLevel: 'low', ndvi: 0.65, ndmi: 0.40, bsi: 0.20, creditAmount: 73000, createdAt: '2025-12-01',
  },
  {
    id: 'p6', name: 'Hilltop Cassava', farmerId: 'f6', farmerName: 'Peter Kamau',
    coordinates: [[-1.30, 36.72], [-1.30, 36.74], [-1.32, 36.74], [-1.32, 36.72]],
    center: [-1.31, 36.73], area: 9.8, crop: 'Cassava', riskScore: 61,
    riskLevel: 'medium', ndvi: 0.42, ndmi: 0.28, bsi: 0.35, creditAmount: 55000, createdAt: '2025-11-15',
  },
];

export function generateTimeSeries(plotId: string): PlotTimeSeries[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const seed = plotId.charCodeAt(1);
  return months.map((m, i) => ({
    date: m,
    ndvi: Math.max(0.1, Math.min(0.9, 0.5 + Math.sin((i + seed) * 0.5) * 0.25)),
    ndmi: Math.max(0.05, Math.min(0.7, 0.35 + Math.sin((i + seed) * 0.6) * 0.2)),
    bsi: Math.max(0.05, Math.min(0.7, 0.3 + Math.cos((i + seed) * 0.4) * 0.2)),
    rainfall: Math.max(0, 80 + Math.sin((i + seed) * 0.8) * 60),
    temperature: 22 + Math.sin((i + seed) * 0.3) * 6,
  }));
}

export const mockFlags: Flag[] = [
  { id: 'fl1', plotId: 'p3', plotName: 'Highland Sorghum', farmerName: 'Fatima Wanjiku', type: 'ndvi_drop', severity: 'warning', message: 'NDVI dropped 30% in last 4 weeks', detectedAt: '2026-02-10', resolved: false },
  { id: 'fl2', plotId: 'p4', plotName: 'Lakeside Rice Paddy', farmerName: 'Juma Otieno', type: 'drought', severity: 'critical', message: 'No rainfall detected for 45 days', detectedAt: '2026-02-08', resolved: false },
  { id: 'fl3', plotId: 'p4', plotName: 'Lakeside Rice Paddy', farmerName: 'Juma Otieno', type: 'high_risk', severity: 'critical', message: 'Risk score exceeded 90 threshold', detectedAt: '2026-02-05', resolved: false },
  { id: 'fl4', plotId: 'p2', plotName: 'River Valley Wheat', farmerName: 'Kofi Mensah', type: 'soil_degradation', severity: 'warning', message: 'BSI trending upward over 3 months', detectedAt: '2026-01-28', resolved: false },
  { id: 'fl5', plotId: 'p6', plotName: 'Hilltop Cassava', farmerName: 'Peter Kamau', type: 'ndvi_drop', severity: 'warning', message: 'NDVI below seasonal average', detectedAt: '2026-01-20', resolved: true },
];

export const mockStats: PortfolioStats = {
  totalPlots: 6, totalArea: 61.9, totalCredit: 440000, avgRiskScore: 57.2, flaggedPlots: 3,
};

export const mockRiskDistribution: RiskDistribution[] = [
  { level: 'Low', count: 2, percentage: 33 },
  { level: 'Medium', count: 2, percentage: 33 },
  { level: 'High', count: 1, percentage: 17 },
  { level: 'Critical', count: 1, percentage: 17 },
];
