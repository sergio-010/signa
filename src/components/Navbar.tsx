'use client'

import { Menu } from "lucide-react";
import { useContext } from "react";
import { ContextUI } from "@/context/ui/ContextUI";


export default function Navbar() {
    const { toggleSidebar, handleToggleSidebar } = useContext(ContextUI)
    return (
        <nav className="h-16 flex items-center justify-between px-4 text-white bg-slate-700">
            <h3 className="font-bold text-3xl">Registros</h3>
            <div className="flex items-center gap-4 ">
                <Menu
                    className="lg:hidden text-[#ECDFCC] cursor-pointer"
                    onClick={() => handleToggleSidebar(!toggleSidebar)}
                />
            </div>
        </nav>
    )
}
