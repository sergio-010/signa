import { Brand } from "@/services/brandService";
import BrandRow from "./BrandRow";

interface BrandsTableProps {
    brands: Brand[];
}

export default function BrandsTable({ brands }: BrandsTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b-2 border-slate-200">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                            Marca
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                            Propietario
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                            Estado
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                            Fecha de Registro
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {brands.map((brand) => (
                        <BrandRow key={brand.id} brand={brand} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
