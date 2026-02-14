import AppLayout from '../components/AppLayout';
import PortfolioMap from '../components/PortfolioMap';
import StatCard from '../components/StatCard';
import RiskBadge from '../components/RiskBadge';
import { usePlots, usePortfolioStats } from '../hooks/use-api';
import { MapPin, DollarSign, AlertTriangle, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skeleton } from '../components/ui/skeleton';

export default function DashboardPage() {
  const { data: plots, isLoading: plotsLoading } = usePlots();
  const { data: stats, isLoading: statsLoading } = usePortfolioStats();

  return (
    <AppLayout>
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold">Dashboard</h2>
          <p className="text-sm text-muted-foreground">Portfolio overview and risk map</p>
        </div>

        {/* Stats */}
        {statsLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-24 rounded-lg" />)}
          </div>
        ) : stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Plots" value={stats.totalPlots} icon={MapPin} subtitle={`${stats.totalArea} ha`} />
            <StatCard label="Total Credit" value={`KES ${(stats.totalCredit / 1000).toFixed(0)}K`} icon={DollarSign} />
            <StatCard label="Avg Risk Score" value={stats.avgRiskScore.toFixed(1)} icon={BarChart3} />
            <StatCard label="Flagged Plots" value={stats.flaggedPlots} icon={AlertTriangle} subtitle="Needs attention" />
          </div>
        )}

        {/* Map */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-sm">Portfolio Map</h3>
            <p className="text-xs text-muted-foreground">Click a plot to view details</p>
          </div>
          {plotsLoading ? (
            <Skeleton className="h-[400px]" />
          ) : (
            <PortfolioMap plots={plots || []} className="h-[400px]" />
          )}
        </div>

        {/* Plot list */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-sm">All Plots</h3>
          </div>
          <div className="divide-y divide-border">
            {plots?.map(plot => (
              <Link key={plot.id} to={`/plots/${plot.id}`} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                <div>
                  <p className="font-medium text-sm">{plot.name}</p>
                  <p className="text-xs text-muted-foreground">{plot.farmerName} · {plot.crop} · {plot.area} ha</p>
                </div>
                <RiskBadge level={plot.riskLevel} score={plot.riskScore} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
