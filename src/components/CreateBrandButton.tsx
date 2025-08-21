'use client';

import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

import { Button } from './ui/button';

export const CreateBrandButton = () => {
    const router = useRouter();

    return (
        <Button
            className="bg-slate-700 hover:bg-slate-800 flex items-center gap-2"
            onClick={() => router.push('/records/create')}
        >
            <Plus className="w-4 h-4" />
            Nueva Marca
        </Button>
    )
}
