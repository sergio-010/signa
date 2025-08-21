import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function Loading() {
    return (
        <div className="page-gradient min-h-full flex items-center justify-center">
            <div className="text-center">
                <LoadingSpinner size="lg" />
                <p className="mt-4 text-slate-600 font-medium">Cargando registros...</p>
            </div>
        </div>
    );
}
