import { MapContainer, TileLayer, Polygon, Tooltip } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import type { Plot } from '@/types';
import type { LatLngExpression } from 'leaflet';

const riskColors: Record<string, string> = {
  low: '#3d9960',
  medium: '#d4a226',
  high: '#d06030',
  critical: '#c43030',
};

interface PortfolioMapProps {
  plots: Plot[];
  className?: string;
}

export default function PortfolioMap({ plots, className }: PortfolioMapProps) {
  const navigate = useNavigate();
  const center: LatLngExpression = [-1.29, 36.82];

  return (
    <div className={className}>
      <MapContainer
        center={center}
        zoom={11}
        className="w-full h-full rounded-lg"
        style={{ minHeight: 400 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {plots.map(plot => (
          <Polygon
            key={plot.id}
            positions={plot.coordinates as LatLngExpression[]}
            pathOptions={{
              color: riskColors[plot.riskLevel],
              fillColor: riskColors[plot.riskLevel],
              fillOpacity: 0.4,
              weight: 2,
            }}
            eventHandlers={{
              click: () => navigate(`/plots/${plot.id}`),
            }}
          >
            <Tooltip>
              <div className="text-sm">
                <p className="font-semibold">{plot.name}</p>
                <p>{plot.farmerName} · {plot.crop}</p>
                <p>Risk: {plot.riskScore}/100</p>
              </div>
            </Tooltip>
          </Polygon>
        ))}
      </MapContainer>
    </div>
  );
}
