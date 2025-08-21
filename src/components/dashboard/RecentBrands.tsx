import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight } from "lucide-react";
import { Brand } from "@/services/brandService";
import BrandCard from "./BrandCard";

interface RecentBrandsProps {
    brands: Brand[];
}

export default function RecentBrands({ brands }: RecentBrandsProps) {
    return (
        <Card className="glass-card">
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <CardTitle className="text-2xl font-bold text-slate-800">
                            Marcas Recientes
                        </CardTitle>
                        <CardDescription className="text-slate-600 mt-1">
                            Las últimas marcas registradas en el sistema
                        </CardDescription>
                    </div>
                    <Button asChild variant="outline">
                        <Link href="/records" className="flex items-center gap-2">
                            Ver Todas
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {brands.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="max-w-md mx-auto">
                            <h2 className="text-xl font-semibold text-slate-600 mb-2">
                                No hay marcas registradas
                            </h2>
                            <p className="text-slate-500 mb-6">
                                Comienza registrando tu primera marca en el sistema para empezar a gestionar tu portafolio de marcas.
                            </p>
                            <Button asChild className="bg-slate-700 hover:bg-slate-800">
                                <Link href="/records/create" className="flex items-center gap-2">
                                    <Plus className="w-4 h-4" />
                                    Registrar Primera Marca
                                </Link>
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {brands.slice(0, 5).map((brand: Brand) => (
                            <BrandCard key={brand.id} brand={brand} />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
