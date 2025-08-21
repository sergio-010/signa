'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";

import {
    PaginationContent,
    PaginationItem,
    PaginationLink,
    Pagination,
    PaginationEllipsis,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
    page: number;
    totalPages: number;
}

export function CustomPagination({
    page,
    totalPages,
}: Props) {
    const pathname = usePathname();

    // Generate page numbers to show
    const getPageNumbers = () => {
        const delta = 2; // Number of pages to show on each side of current page
        const range = [];
        const rangeWithDots = [];

        for (let i = Math.max(2, page - delta); i <= Math.min(totalPages - 1, page + delta); i++) {
            range.push(i);
        }

        if (page - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (page + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        } else {
            if (totalPages > 1) {
                rangeWithDots.push(totalPages);
            }
        }

        return rangeWithDots;
    };

    if (totalPages <= 1) return null;

    const pageNumbers = getPageNumbers();

    return (
        <Pagination>
            <PaginationContent className="flex flex-wrap gap-1">
                {/* Previous button */}
                <PaginationItem>
                    <PaginationPrevious
                        href={page === 1 ? '#' : (page === 2 ? pathname : `${pathname}?page=${page - 1}`)}
                        className={page === 1 ? 'pointer-events-none opacity-50' : 'hover:bg-slate-100'}
                    />
                </PaginationItem>

                {/* Page numbers */}
                {pageNumbers.map((pageNum, index) => (
                    <PaginationItem key={index}>
                        {pageNum === '...' ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink
                                href={pageNum === 1 ? pathname : `${pathname}?page=${pageNum}`}
                                isActive={pageNum === page}
                                className={`
                                    ${pageNum === page
                                        ? 'bg-slate-700 text-white hover:bg-slate-800'
                                        : 'hover:bg-slate-100'
                                    }
                                `}
                            >
                                {pageNum}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                {/* Next button */}
                <PaginationItem>
                    <PaginationNext
                        href={page === totalPages ? '#' : `${pathname}?page=${page + 1}`}
                        className={page === totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-slate-100'}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
