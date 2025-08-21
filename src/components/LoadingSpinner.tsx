export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
    const sizeClass = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8"
    }[size];

    return (
        <div className={`${sizeClass} border-2 border-slate-200 border-t-slate-600 rounded-full animate-spin`} />
    );
}

export function PageLoading() {
    return (
        <div className="min-h-screen page-gradient flex items-center justify-center">
            <div className="text-center">
                <LoadingSpinner size="lg" />
                <p className="mt-4 text-slate-600">Cargando...</p>
            </div>
        </div>
    );
}
