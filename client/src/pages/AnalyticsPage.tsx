import AppLayout from '@/components/AppLayout';
import { useRiskDistribution, usePlots } from '@/hooks/use-api';
import { Skeleton } from '@/components/ui/skeleton';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';

const RISK_COLORS = ['#3d9960', '#d4a226', '#d06030', '#c43030'];

export default function AnalyticsPage() {
  const { data: distribution, isLoading: distLoading } = useRiskDistribution();
  const { data: plots } = usePlots();

  const cropData = plots
    ? Object.entries(
        plots.reduce<Record<string, { crop: string; count: number; avgRisk: number; totalRisk: number }>>((acc, p) => {
          if (!acc[p.crop]) acc[p.crop] = { crop: p.crop, count: 0, avgRisk: 0, totalRisk: 0 };
          acc[p.crop].count++;
          acc[p.crop].totalRisk += p.riskScore;
          acc[p.crop].avgRisk = acc[p.crop].totalRisk / acc[p.crop].count;
          return acc;
        }, {})
      ).map(([, v]) => v)
    : [];

  return (
    <AppLayout>
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold">Analytics</h2>
          <p className="text-sm text-muted-foreground">Portfolio-level risk analysis</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Risk Distribution Pie */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-sm">Risk Distribution</h3>
            </div>
            <div className="p-4">
              {distLoading ? <Skeleton className="h-[250px]" /> : (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={distribution} dataKey="count" nameKey="level" cx="50%" cy="50%" outerRadius={90} label={({ level, percentage }) => `${level} ${percentage}%`}>
                      {distribution?.map((_, i) => <Cell key={i} fill={RISK_COLORS[i]} />)}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Risk by Crop */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-sm">Avg Risk Score by Crop</h3>
            </div>
            <div className="p-4">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={cropData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="crop" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="avgRisk" fill="hsl(152, 45%, 28%)" radius={[4, 4, 0, 0]} name="Avg Risk" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Credit exposure */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-sm">Credit Exposure by Plot</h3>
          </div>
          <div className="p-4">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={plots} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={130} />
                <Tooltip formatter={(v: number) => `KES ${v.toLocaleString()}`} />
                <Bar dataKey="creditAmount" fill="hsl(42, 80%, 55%)" radius={[0, 4, 4, 0]} name="Credit (KES)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
