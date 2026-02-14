import AppLayout from '../components/AppLayout';
import { useFlags } from '../hooks/use-api';
import { Skeleton } from '../components/ui/skeleton';
import { Badge } from '../components/ui/badge';
import { Link } from 'react-router-dom';
import { AlertTriangle, Droplets, TrendingDown, Mountain } from 'lucide-react';

const flagIcons: Record<string, typeof AlertTriangle> = {
  ndvi_drop: TrendingDown,
  drought: Droplets,
  high_risk: AlertTriangle,
  soil_degradation: Mountain,
};

const flagLabels: Record<string, string> = {
  ndvi_drop: 'NDVI Drop',
  drought: 'Drought',
  high_risk: 'High Risk',
  soil_degradation: 'Soil Degradation',
};

export default function FlagsPage() {
  const { data: flags, isLoading } = useFlags();
  const activeFlags = flags?.filter(f => !f.resolved) || [];
  const resolvedFlags = flags?.filter(f => f.resolved) || [];

  return (
    <AppLayout>
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold">Flags</h2>
          <p className="text-sm text-muted-foreground">Underperforming plots requiring attention</p>
        </div>

        {isLoading ? (
          <div className="space-y-3">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-20" />)}</div>
        ) : (
          <>
            {activeFlags.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Active ({activeFlags.length})</h3>
                {activeFlags.map(flag => {
                  const Icon = flagIcons[flag.type] || AlertTriangle;
                  return (
                    <Link key={flag.id} to={`/plots/${flag.plotId}`} className="block bg-card border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${flag.severity === 'critical' ? 'bg-destructive/10' : 'bg-accent/20'}`}>
                          <Icon className={`w-4 h-4 ${flag.severity === 'critical' ? 'text-destructive' : 'text-accent-foreground'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-medium text-sm">{flag.plotName}</p>
                            <Badge variant={flag.severity === 'critical' ? 'destructive' : 'secondary'} className="text-xs">
                              {flag.severity}
                            </Badge>
                            <Badge variant="outline" className="text-xs">{flagLabels[flag.type]}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{flag.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{flag.farmerName} · {flag.detectedAt}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {resolvedFlags.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Resolved ({resolvedFlags.length})</h3>
                {resolvedFlags.map(flag => (
                  <div key={flag.id} className="bg-card border border-border rounded-lg p-4 opacity-60">
                    <p className="text-sm font-medium">{flag.plotName}</p>
                    <p className="text-xs text-muted-foreground">{flag.message}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </AppLayout>
  );
}
