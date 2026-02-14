import { useParams, Link } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import RiskBadge from '../components/RiskBadge';
import { usePlot, usePlotTimeSeries } from '../hooks/use-api';
import { Skeleton } from '../components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

export default function PlotDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: plot, isLoading } = usePlot(id || '');
  const { data: timeSeries } = usePlotTimeSeries(id || '');

  if (isLoading) {
    return (
      <AppLayout>
        <div className="p-6 space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-64" />
        </div>
      </AppLayout>
    );
  }

  if (!plot) {
    return (
      <AppLayout>
        <div className="p-6">
          <p className="text-muted-foreground">Plot not found.</p>
          <Link to="/dashboard" className="text-primary text-sm mt-2 inline-block">← Back to Dashboard</Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <Link to="/dashboard" className="text-sm text-muted-foreground flex items-center gap-1 mb-2 hover:text-foreground">
            <ArrowLeft className="w-3 h-3" /> Back
          </Link>
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-xl font-bold">{plot.name}</h2>
            <RiskBadge level={plot.riskLevel} score={plot.riskScore} />
          </div>
          <p className="text-sm text-muted-foreground">{plot.farmerName} · {plot.crop} · {plot.area} ha · KES {plot.creditAmount.toLocaleString()}</p>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'NDVI', value: plot.ndvi, desc: 'Vegetation health' },
            { label: 'NDMI', value: plot.ndmi, desc: 'Moisture index' },
            { label: 'BSI', value: plot.bsi, desc: 'Bare soil index' },
          ].map(m => (
            <div key={m.label} className="bg-card border border-border rounded-lg p-4">
              <p className="text-xs text-muted-foreground">{m.label}</p>
              <p className="text-2xl font-bold">{m.value.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">{m.desc}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        {timeSeries && (
          <>
            <ChartCard title="Vegetation & Soil Indices">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={timeSeries}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="ndvi" stroke="hsl(152, 60%, 40%)" name="NDVI" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="ndmi" stroke="hsl(200, 60%, 50%)" name="NDMI" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="bsi" stroke="hsl(30, 60%, 45%)" name="BSI" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ChartCard title="Rainfall (mm)">
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={timeSeries}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="rainfall" stroke="hsl(210, 70%, 55%)" name="Rainfall" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Temperature (°C)">
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={timeSeries}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="temperature" stroke="hsl(15, 75%, 50%)" name="Temp" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-sm">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
