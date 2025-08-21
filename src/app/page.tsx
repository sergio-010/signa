
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BreadcrumbSeparator,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  Breadcrumb,
} from "@/components/ui/breadcrumb";
import {
  Building2,
  Plus,
  TrendingUp,
  Users,
  FileText,
  Home as HomeIcon,
  ArrowRight
} from "lucide-react";
import { getBrands } from "./actions";

export default async function Home() {
  const { brands } = await getBrands({ take: 5, skip: 1 });
  const totalBrands = brands.length;
  const activeBrands = brands.filter(brand => brand.status).length;
  const inactiveBrands = totalBrands - activeBrands;

  return (
    <div className="min-h-screen page-gradient p-4 md:p-6 lg:p-8">
      <div className="container-optimized space-y-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="flex items-center gap-2">
                    <HomeIcon className="h-4 w-4" />
                    Inicio
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800">
            Sistema de Gestión de Marcas
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            Administra y gestiona todas las marcas registradas de manera eficiente y organizada
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild size="lg" className="bg-slate-700 hover:bg-slate-800">
              <Link href="/records/create" className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Registrar Nueva Marca
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/records" className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Ver Todas las Marcas
              </Link>
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
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

        {/* Recent Brands */}
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
                {brands.slice(0, 5).map((brand) => (
                  <div key={brand.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover-lift smooth-transition">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="brand-avatar">
                          {brand.brandName.charAt(0).toUpperCase()}
                        </div>
                        <div className={`status-indicator ${brand.status ? 'bg-green-500' : 'bg-red-500'
                          }`} />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 text-lg">{brand.brandName}</div>
                        <p className="text-sm text-slate-600">{brand.trademarkOwner}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${brand.status
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                          }`}
                      >
                        {brand.status ? 'Activa' : 'Inactiva'}
                      </span>
                      <Button asChild size="sm" variant="outline" className="hover:bg-slate-50">
                        <Link href={`/records/edit/${brand.id}`}>
                          Editar
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
