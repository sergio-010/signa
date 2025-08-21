import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Brand } from "@/services/brandService";

interface BrandCardProps {
  brand: Brand;
}

export default function BrandCard({ brand }: BrandCardProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover-lift smooth-transition">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="brand-avatar">
            {brand.brandName.charAt(0).toUpperCase()}
          </div>
          <div className={`status-indicator ${brand.status ? 'bg-green-500' : 'bg-red-500'}`} />
        </div>
        <div>
          <div className="font-semibold text-slate-800 text-lg">{brand.brandName}</div>
          <p className="text-sm text-slate-600">{brand.trademarkOwner}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            brand.status
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
  );
}
