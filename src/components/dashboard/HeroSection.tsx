import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";

export default function HeroSection() {
  return (
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
  );
}
