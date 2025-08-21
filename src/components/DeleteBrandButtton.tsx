'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';

import { Trash2, AlertTriangle } from 'lucide-react';

import { Modal } from './modal/Modal';
import { Button } from './ui/button';
import { deleteBrand } from '@/app/actions/brands/delete-brand.action';

interface Props {
    brandId?: number;
    brandName?: string;
}

export const DeleteBrandButtton = ({ brandId, brandName }: Props) => {
    const router = useRouter();

    const [confirmModal, setConfirmModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!brandId) return;

        try {
            setLoading(true);

            const result = await deleteBrand(brandId);

            if (!result.success) {
                throw new Error(result.error || "Ups ocurrió un error al eliminar la marca");
            }

            const displayName = brandName || 'la marca';
            toast.success(`Marca "${displayName}" eliminada correctamente`);
            router.refresh();
        } catch (error) {
            const errMesg = error instanceof Error ? error.message : "Ups ocurrió un error al eliminar la marca";
            toast.error(errMesg);
        } finally {
            setLoading(false);
            setConfirmModal(false);
        }
    };

    return (
        <>
            <Button
                variant="outline"
                size="sm"
                onClick={() => setConfirmModal(true)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300"
            >
                <Trash2 className="w-3 h-3" />
                <span className="hidden sm:inline ml-1">Eliminar</span>
            </Button>

            <Modal
                isOpen={confirmModal}
                showCloseButton={false}
                onClose={() => setConfirmModal(false)}
            >
                <div className='flex flex-col gap-6 p-2'>
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                        <div className='text-lg font-semibold text-slate-800 mb-2'>
                            Confirmar Eliminación
                        </div>
                        <p className="text-sm text-slate-600">
                            ¿Estás seguro de que deseas eliminar esta marca? Esta acción no se puede deshacer.
                        </p>
                    </div>

                    <div className='flex flex-col sm:flex-row justify-center gap-3'>
                        <Button
                            onClick={() => handleDelete()}
                            disabled={loading}
                            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-md disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                    Eliminando...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Eliminar
                                </>
                            )}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setConfirmModal(false)}
                            className="font-semibold px-6 py-2 rounded-md"
                        >
                            Cancelar
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
