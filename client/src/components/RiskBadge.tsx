import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const riskStyles: Record<string, string> = {
  low: 'risk-badge-low',
  medium: 'risk-badge-medium',
  high: 'risk-badge-high',
  critical: 'risk-badge-critical',
};

export default function RiskBadge({ level, score }: { level: string; score?: number }) {
  return (
    <Badge className={cn('text-xs font-semibold', riskStyles[level] || riskStyles.low)}>
      {level.charAt(0).toUpperCase() + level.slice(1)}
      {score !== undefined && ` (${score})`}
    </Badge>
  );
}
