export interface Plot {
  id: string;
  name: string;
  farmerId: string;
  farmerName: string;
  coordinates: [number, number][];
  center: [number, number];
  area: number; // hectares
  crop: string;
  riskScore: number; // 0-100
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  ndvi: number;
  ndmi: number;
  bsi: number;
  creditAmount: number;
  createdAt: string;
}

export interface PlotTimeSeries {
  date: string;
  ndvi: number;
  ndmi: number;
  bsi: number;
  rainfall: number;
  temperature: number;
}

export interface RiskDistribution {
  level: string;
  count: number;
  percentage: number;
}

export interface PortfolioStats {
  totalPlots: number;
  totalArea: number;
  totalCredit: number;
  avgRiskScore: number;
  flaggedPlots: number;
}

export interface Flag {
  id: string;
  plotId: string;
  plotName: string;
  farmerName: string;
  type: 'ndvi_drop' | 'drought' | 'high_risk' | 'soil_degradation';
  severity: 'warning' | 'critical';
  message: string;
  detectedAt: string;
  resolved: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'analyst' | 'admin';
}
