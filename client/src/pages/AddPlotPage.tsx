import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { MapContainer, TileLayer, Polygon, useMapEvents } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import { toast } from 'sonner';

function DrawControl({ positions, onChange }: { positions: [number, number][]; onChange: (p: [number, number][]) => void }) {
  useMapEvents({
    click(e) {
      onChange([...positions, [e.latlng.lat, e.latlng.lng]]);
    },
  });

  return positions.length >= 3 ? (
    <Polygon positions={positions as LatLngExpression[]} pathOptions={{ color: 'hsl(152, 45%, 28%)', fillOpacity: 0.3 }} />
  ) : null;
}

export default function AddPlotPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [farmer, setFarmer] = useState('');
  const [crop, setCrop] = useState('');
  const [credit, setCredit] = useState('');
  const [positions, setPositions] = useState<[number, number][]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ riskScore: number; ndvi: number; ndmi: number; bsi: number } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (positions.length < 3) {
      toast.error('Draw at least 3 points on the map');
      return;
    }
    setSubmitting(true);
    // Replace with: fetch('/api/plots', { method: 'POST', body: JSON.stringify({ name, farmer, crop, credit, coordinates: positions }) })
    setTimeout(() => {
      setResult({ riskScore: Math.round(Math.random() * 80 + 10), ndvi: +(Math.random() * 0.6 + 0.2).toFixed(2), ndmi: +(Math.random() * 0.5 + 0.1).toFixed(2), bsi: +(Math.random() * 0.5 + 0.1).toFixed(2) });
      setSubmitting(false);
      toast.success('Plot submitted for risk assessment');
    }, 1000);
  };

  return (
    <AppLayout>
      <div className="p-4 md:p-6 space-y-6 max-w-4xl">
        <div>
          <h2 className="text-xl font-bold">Add New Plot</h2>
          <p className="text-sm text-muted-foreground">Draw polygon on map and submit for risk scoring</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Plot Name</Label>
              <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. North Field" required />
            </div>
            <div className="space-y-2">
              <Label>Farmer Name</Label>
              <Input value={farmer} onChange={e => setFarmer(e.target.value)} placeholder="e.g. Amina Osei" required />
            </div>
            <div className="space-y-2">
              <Label>Crop</Label>
              <Select value={crop} onValueChange={setCrop}>
                <SelectTrigger><SelectValue placeholder="Select crop" /></SelectTrigger>
                <SelectContent>
                  {['Maize', 'Wheat', 'Sorghum', 'Rice', 'Beans', 'Cassava'].map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Credit Amount (KES)</Label>
              <Input type="number" value={credit} onChange={e => setCredit(e.target.value)} placeholder="e.g. 50000" required />
            </div>
          </div>

          {/* Map */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-sm">Draw Plot Boundary</h3>
                <p className="text-xs text-muted-foreground">Click on the map to add polygon points ({positions.length} points)</p>
              </div>
              {positions.length > 0 && (
                <Button type="button" variant="outline" size="sm" onClick={() => setPositions([])}>
                  Clear
                </Button>
              )}
            </div>
            <MapContainer center={[-1.29, 36.82] as LatLngExpression} zoom={12} className="h-[350px]">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <DrawControl positions={positions} onChange={setPositions} />
            </MapContainer>
          </div>

          <Button type="submit" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit for Risk Assessment'}
          </Button>
        </form>

        {result && (
          <div className="bg-card border border-border rounded-lg p-5 space-y-3">
            <h3 className="font-semibold">Risk Assessment Result</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Risk Score</p>
                <p className="text-2xl font-bold">{result.riskScore}<span className="text-sm font-normal text-muted-foreground">/100</span></p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">NDVI</p>
                <p className="text-lg font-semibold">{result.ndvi}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">NDMI</p>
                <p className="text-lg font-semibold">{result.ndmi}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">BSI</p>
                <p className="text-lg font-semibold">{result.bsi}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
