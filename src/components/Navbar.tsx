'use client'

import { Menu, User } from "lucide-react";
import { useContext } from "react";
import { usePathname } from "next/navigation";
import { ContextUI } from "@/context/ui/ContextUI";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    const { toggleSidebar, handleToggleSidebar } = useContext(ContextUI);
    const pathname = usePathname();

    // Function to get page title based on pathname
    const getPageTitle = () => {
        if (pathname === "/") return "Dashboard";
        if (pathname === "/records") return "Registro de Marcas";
        if (pathname.startsWith("/records/create")) return "Nueva Marca";
        if (pathname.startsWith("/records/edit")) return "Editar Marca";
        return "Sistema de Marcas";
    };

    return (
        <nav className="h-16 flex items-center justify-between px-4 md:px-6 bg-white border-b border-slate-200 shadow-sm">
            {/* Left section */}
            <div className="flex items-center gap-4">
                {/* Mobile menu button */}
                <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    onClick={() => handleToggleSidebar(!toggleSidebar)}
                    aria-label="Abrir menú de navegación"
                >
                    <Menu size={20} />
                </Button>

                {/* Page title */}
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-800">
                        {getPageTitle()}
                    </h1>
                    <p className="text-sm text-slate-500 hidden sm:block">
                        {pathname === "/" && "Bienvenido al sistema de gestión de marcas"}
                        {pathname === "/records" && "Administra todas las marcas registradas"}
                        {pathname.startsWith("/records/create") && "Registra una nueva marca en el sistema"}
                        {pathname.startsWith("/records/edit") && "Modifica los datos de la marca"}
                    </p>
                </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-2 md:gap-4">
                {/* User menu */}
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    aria-label="Menú de usuario"
                >
                    <User size={18} />
                    <span className="hidden sm:inline ml-2 text-sm font-medium">Admin</span>
                </Button>
            </div>
        </nav>
    )
}
