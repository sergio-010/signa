import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, TrendingUp, Users } from "lucide-react";

interface StatsCardsProps {
  totalBrands: number;
  activeBrands: number;
  inactiveBrands: number;
}

export default function StatsCards({ totalBrands, activeBrands, inactiveBrands }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-700">
            <Building2 className="w-5 h-5 text-blue-600" />
            Total de Marcas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-slate-800">{totalBrands}</div>
          <p className="text-sm text-slate-600 mt-1">Marcas registradas en el sistema</p>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-700">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Marcas Activas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600">{activeBrands}</div>
          <p className="text-sm text-slate-600 mt-1">Marcas actualmente activas</p>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-700">
            <Users className="w-5 h-5 text-orange-600" />
            Marcas Inactivas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-orange-600">{inactiveBrands}</div>
          <p className="text-sm text-slate-600 mt-1">Marcas actualmente inactivas</p>
        </CardContent>
      </Card>
    </div>
  );
}
