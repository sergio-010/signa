'use client'

import { useContext, useEffect } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ContextUI } from "@/context/ui/ContextUI";

import { useScreenSize } from "@/hooks";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { Menu, NotebookPenIcon, Home, Building2, X } from "lucide-react";

function SideBar() {
    const { toggleSidebar, handleToggleSidebar } = useContext(ContextUI);
    const pathname = usePathname();

    const { width } = useScreenSize();

    useEffect(() => {
        if (width < 1024 && toggleSidebar) {
            handleToggleSidebar(false);
        }

        if (width >= 1024 && !toggleSidebar) {
            handleToggleSidebar(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width]);

    const menuItems = [
        {
            href: "/",
            icon: Home,
            label: "Inicio",
        },
        {
            href: "/records",
            icon: NotebookPenIcon,
            label: "Registro de Marcas",
        },
    ];

    return (
        <>
            {/* Overlay for mobile */}
            {toggleSidebar && width < 1024 && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => handleToggleSidebar(false)}
                />
            )}

            <div
                className={`
                    fixed top-0 h-full max-w-72 bg-white shadow-2xl transition-all
                    ease-in-out duration-300 z-50 lg:static lg:shadow-lg border-r border-slate-200
                    ${toggleSidebar ? 'left-0 w-72' : '-left-72 lg:w-20'}
                `}
            >
                {/* Header */}
                <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-700 to-slate-800">
                    <div className={`flex items-center ${toggleSidebar ? 'justify-between' : 'justify-center'}`}>
                        <div className={`transition-all duration-300 ${toggleSidebar ? 'block' : 'hidden lg:hidden'}`}>
                            <h4 className="text-2xl font-bold text-white">DashBoard</h4>
                            <p className="text-slate-300 text-sm">Sistema de Marcas</p>
                        </div>

                        {/* Toggle button for desktop */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="hidden lg:flex text-white hover:bg-white/10"
                            onClick={() => handleToggleSidebar(!toggleSidebar)}
                            aria-label={toggleSidebar ? "Contraer barra lateral" : "Expandir barra lateral"}
                        >
                            <Menu size={20} />
                        </Button>

                        {/* Close button for mobile */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="lg:hidden text-white hover:bg-white/10"
                            onClick={() => handleToggleSidebar(false)}
                            aria-label="Cerrar menú"
                        >
                            <X size={20} />
                        </Button>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="p-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || (item.href === "/records" && pathname.startsWith("/records"));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => width < 1024 && handleToggleSidebar(false)}
                                className={`
                                    flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200
                                    group hover:bg-slate-100 
                                    ${isActive
                                        ? 'bg-slate-100 text-slate-900 shadow-sm border border-slate-200'
                                        : 'text-slate-600 hover:text-slate-900'
                                    }
                                    ${!toggleSidebar ? 'justify-center lg:px-2' : ''}
                                `}
                            >
                                <Icon
                                    size={20}
                                    className={`
                                        flex-shrink-0 transition-colors duration-200
                                        ${isActive ? 'text-slate-700' : 'text-slate-500 group-hover:text-slate-700'}
                                    `}
                                />
                                <span
                                    className={`
                                        font-medium transition-all duration-300 whitespace-nowrap
                                        ${toggleSidebar ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden lg:opacity-0 lg:w-0'}
                                    `}
                                >
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                <Separator className="mx-4" />

                {/* Footer */}
                <div className="p-4 mt-auto">
                    <div
                        className={`
                            transition-all duration-300
                            ${toggleSidebar ? 'opacity-100' : 'opacity-0 lg:opacity-0'}
                        `}
                    >
                        <div className="text-xs text-slate-500 text-center">
                            <p>© 2024 Sistema de Marcas</p>
                            <p>Versión 1.0</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar