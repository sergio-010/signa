import Link from "next/link";
import { Brand } from "@/services/brandService";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { DeleteBrandButtton } from "@/components/DeleteBrandButtton";

interface BrandRowProps {
    brand: Brand;
}

export default function BrandRow({ brand }: BrandRowProps) {
    return (
        <tr className="border-b border-slate-200 hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="brand-avatar-small">
                            {brand.brandName.charAt(0).toUpperCase()}
                        </div>
                        <div
                            className={`status-indicator-small ${brand.status ? "bg-green-500" : "bg-red-500"
                                }`}
                        />
                    </div>
                    <div className="font-medium text-slate-800">{brand.brandName}</div>
                </div>
            </td>
            <td className="px-6 py-4 text-slate-600">{brand.trademarkOwner}</td>
            <td className="px-6 py-4">
                <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${brand.status
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                >
                    {brand.status ? "Activa" : "Inactiva"}
                </span>
            </td>
            <td className="px-6 py-4">
                <div className="text-sm text-slate-500">
                    {new Date(brand.createdAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })}
                </div>
            </td>
            <td className="px-6 py-4">
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
    );
}
