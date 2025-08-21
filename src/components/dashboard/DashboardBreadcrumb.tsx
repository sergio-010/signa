import Link from "next/link";
import {
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    Breadcrumb,
} from "@/components/ui/breadcrumb";
import { Home as HomeIcon } from "lucide-react";

export default function DashboardBreadcrumb() {
    return (
        <div className="mb-6">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/" className="flex items-center gap-2">
                                <HomeIcon className="h-4 w-4" />
                                Inicio
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}
