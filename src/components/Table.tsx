import Link from 'next/link';

import { Brand } from '@/services/brandService';

import { Pencil, Plus } from 'lucide-react';
import { CreateBrandButton } from './CreateBrandButton';
import { DeleteBrandButtton } from './DeleteBrandButtton';
import { CustomPagination } from './CustomPagination';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import {
    BreadcrumbSeparator,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    Breadcrumb,
} from './ui/breadcrumb';
import { Home } from 'lucide-react';

interface Props {
    brands: Brand[];
    page: number;
    totalPages: number;
}

export default function Table({ brands, page, totalPages }: Props) {
    return (
        <div className="min-h-screen page-gradient p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Breadcrumb Navigation */}
                <div className="mb-6">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/" className="flex items-center gap-2">
                                        <Home className="h-4 w-4" />
                                        Inicio
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <span className="text-slate-600">Registros de Marcas</span>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                <Card className="glass-card">
                    <CardHeader className="pb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <CardTitle className="text-2xl md:text-3xl font-bold text-slate-800">
                                    Registro de Marcas
                                </CardTitle>
                                <CardDescription className="text-slate-600 mt-2">
                                    Gestiona y administra todas las marcas registradas en el sistema
                                </CardDescription>
                            </div>
                            <Button asChild className="bg-slate-700 hover:bg-slate-800 self-start sm:self-center">
                                <Link href="/records/create" className="flex items-center gap-2">
                                    <Plus className="w-4 h-4" />
                                    Nueva Marca
                                </Link>
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent className="px-6 md:px-8">
                        {/* Mobile Cards View */}
                        <div className="block md:hidden space-y-4">
                            {brands.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="max-w-md mx-auto">
                                        <p className="text-slate-500 text-lg mb-4">No hay marcas registradas</p>
                                        <p className="text-slate-400 text-sm mb-6">
                                            Comienza registrando tu primera marca para gestionar tu portafolio.
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
                                brands.map((brand) => (
                                    <Card key={brand.id} className="border border-slate-200 hover-lift smooth-transition">
                                        <CardContent className="p-4">
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative">
                                                            <div className="brand-avatar">
                                                                {brand.brandName.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div className={`status-indicator ${brand.status ? 'bg-green-500' : 'bg-red-500'
                                                                }`} />
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-slate-800 text-lg">
                                                                {brand.brandName}
                                                            </div>
                                                            <p className="text-slate-600">ID: #{brand.id}</p>
                                                        </div>
                                                    </div>
                                                    <span
                                                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${brand.status
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-red-100 text-red-800"
                                                            }`}
                                                    >
                                                        {brand.status ? 'Activo' : 'Inactivo'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-slate-600">
                                                        <span className="font-medium">Titular:</span> {brand.trademarkOwner}
                                                    </p>
                                                </div>
                                                <div className="flex gap-2 pt-2">
                                                    <Button asChild size="sm" variant="outline" className="flex-1">
                                                        <Link href={`/records/edit/${brand.id}`} className="flex items-center justify-center gap-1">
                                                            <Pencil className="w-3 h-3" />
                                                            Editar
                                                        </Link>
                                                    </Button>
                                                    <DeleteBrandButtton brandId={brand.id} brandName={brand.brandName} />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden md:block">
                            <div className="overflow-x-auto rounded-lg border border-slate-200">
                                <table className="w-full">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                ID
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                Marca
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                Titular
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                Estado
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-slate-200">
                                        {brands.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-12 text-center">
                                                    <div className="space-y-4">
                                                        <p className="text-slate-500 text-lg">No hay marcas registradas</p>
                                                        <Button asChild className="bg-slate-700 hover:bg-slate-800">
                                                            <Link href="/records/create" className="flex items-center gap-2">
                                                                <Plus className="w-4 h-4" />
                                                                Registrar Primera Marca
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            brands.map((brand, index) => (
                                                <tr
                                                    key={brand.id}
                                                    className={`hover:bg-slate-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                                                        }`}
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                                                        #{brand.id}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-slate-900">{brand.brandName}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-slate-900">{brand.trademarkOwner}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${brand.status
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-red-100 text-red-800"
                                                                }`}
                                                        >
                                                            {brand.status ? 'Activo' : 'Inactivo'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex items-center gap-2">
                                                            <Button asChild size="sm" variant="outline" className="hover:bg-slate-50">
                                                                <Link href={`/records/edit/${brand.id}`} className="flex items-center gap-1">
                                                                    <Pencil className="w-3 h-3" />
                                                                    Editar
                                                                </Link>
                                                            </Button>
                                                            <DeleteBrandButtton brandId={brand.id} brandName={brand.brandName} />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Pagination */}
                        {brands.length > 0 && (
                            <div className="mt-6 flex justify-center">
                                <CustomPagination page={page} totalPages={totalPages} />
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
