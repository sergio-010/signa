'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Brand } from "@prisma/client";
import toast from "react-hot-toast";

import { brandSchema, type BrandFormData, INITIAL_VALUES } from '../helpers/createBrand.helper';
import {
    BreadcrumbSeparator,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    Breadcrumb,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateBrand } from "@/app/actions/brands/update-brand.action";
import { createBrand } from "@/app/actions/brands/create-brand.action";
import { ChevronLeft, ChevronRight, Check, Home } from "lucide-react";
import Link from "next/link";


interface Props {
    isEditing?: boolean;
    brandData?: Brand | null;
}

export default function StepsForm({ isEditing = false, brandData = null }: Props) {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const form = useForm<BrandFormData>({
        resolver: zodResolver(brandSchema),
        defaultValues: INITIAL_VALUES,
    });

    useEffect(() => {
        if (brandData) {
            form.reset({
                brand: brandData.brandName,
                trademarkOwner: brandData.trademarkOwner,
                status: brandData.status ? "activo" : "inactivo",
            });
        }
    }, [brandData, form]);

    const onSubmit = async (values: BrandFormData) => {
        setLoading(true);
        try {
            console.log("Form values:", values);

            if (isEditing) {
                const { brand: updatedBrand, error } = await updateBrand(Number(brandData?.id), {
                    brandName: values.brand,
                    trademarkOwner: values.trademarkOwner,
                    status: values.status === "activo"
                });

                if (!updatedBrand) {
                    throw new Error(error);
                }

                // Toast específico para edición
                const statusText = values.status === "activo" ? "activada" : "desactivada";
                toast.success(`Marca "${values.brand}" actualizada y ${statusText} correctamente`);
            } else {
                const { brand: newBrand, error } = await createBrand({
                    brandName: values.brand,
                    trademarkOwner: values.trademarkOwner,
                    status: values.status === "activo"
                });

                if (!newBrand) {
                    throw new Error(error);
                }

                // Toast específico para creación
                const statusText = values.status === "activo" ? "activa" : "inactiva";
                toast.success(`Marca "${values.brand}" registrada exitosamente como ${statusText}`);
            }
            router.push("/records");
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : "Ups ocurrió un error al procesar la marca";
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    const handleNext = async () => {
        let fieldsToValidate: (keyof BrandFormData)[] = [];

        if (currentStep === 1) {
            fieldsToValidate = ['brand'];
        } else if (currentStep === 2) {
            fieldsToValidate = ['trademarkOwner', 'status'];
        }

        const isStepValid = await form.trigger(fieldsToValidate);

        if (isStepValid) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => setCurrentStep(currentStep - 1);

    return (
        <div className="min-h-screen page-gradient p-4 md:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Navigation Breadcrumb */}
                <div className="mb-6">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/" className="flex items-center gap-2">
                                        <Home className="h-4 w-4" />
                                        Inicio
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/records">Registros</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <span className="text-slate-600">
                                    {isEditing ? "Editar Marca" : "Nueva Marca"}
                                </span>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                <Card className="w-full glass-card">
                    <CardHeader className="text-center pb-6">
                        <CardTitle className="text-2xl md:text-3xl font-bold text-slate-800">
                            {isEditing ? "Editar Marca" : "Registrar Nueva Marca"}
                        </CardTitle>
                        <CardDescription className="text-slate-600 mt-2">
                            {isEditing
                                ? "Modifica los datos de la marca existente"
                                : "Completa el proceso de registro en 3 sencillos pasos"
                            }
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="px-6 md:px-8 lg:px-12">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                {/* Progress Steps */}
                                <div className="mb-8">
                                    <div className="flex items-center justify-between mb-4">
                                        {[1, 2, 3].map((step) => (
                                            <div key={step} className="flex items-center">
                                                <div
                                                    className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-2 transition-all duration-300 ${currentStep === step
                                                            ? "bg-slate-700 border-slate-700 text-white"
                                                            : currentStep > step
                                                                ? "bg-green-500 border-green-500 text-white"
                                                                : "border-gray-300 text-gray-300"
                                                        }`}
                                                >
                                                    {currentStep > step ? (
                                                        <Check className="w-4 h-4 md:w-5 md:h-5" />
                                                    ) : (
                                                        <span className="text-sm md:text-base font-semibold">{step}</span>
                                                    )}
                                                </div>
                                                {step < 3 && (
                                                    <div
                                                        className={`flex-1 h-0.5 mx-2 md:mx-4 transition-all duration-300 ${currentStep > step ? "bg-green-500" : "bg-gray-300"
                                                            }`}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="text-center">
                                        <h2 className="text-lg md:text-xl font-semibold text-slate-700">
                                            {currentStep === 1
                                                ? "Nombre de la Marca"
                                                : currentStep === 2
                                                    ? "Información del Titular"
                                                    : "Confirmación de Datos"}
                                        </h2>
                                        <p className="text-sm text-slate-500 mt-1">
                                            Paso {currentStep} de 3
                                        </p>
                                    </div>
                                </div>

                                {/* Step 1: Brand Name */}
                                {currentStep === 1 && (
                                    <div className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="brand"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-medium text-slate-700">
                                                        Nombre de la Marca *
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Ingresa el nombre de la marca"
                                                            {...field}
                                                            className="transition-all duration-200"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}

                                {/* Step 2: Trademark Owner and Status */}
                                {currentStep === 2 && (
                                    <div className="space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="trademarkOwner"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-medium text-slate-700">
                                                        Titular de la Marca *
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Ingresa el nombre del titular"
                                                            {...field}
                                                            className="transition-all duration-200"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-medium text-slate-700">
                                                        Estado de la Marca *
                                                    </FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="transition-all duration-200">
                                                                <SelectValue placeholder="Selecciona el estado" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="activo">Activo</SelectItem>
                                                            <SelectItem value="inactivo">Inactivo</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}

                                {/* Step 3: Confirmation */}
                                {currentStep === 3 && (
                                    <div className="space-y-6">
                                        <div className="bg-slate-50 rounded-lg p-6 space-y-4">
                                            <h3 className="text-lg font-semibold text-slate-800 mb-4">
                                                Resumen de la Información
                                            </h3>
                                            <div className="grid gap-4">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                    <span className="font-medium text-slate-600 min-w-32">Nombre de la marca:</span>
                                                    <span className="text-slate-800 font-semibold">{form.watch('brand')}</span>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                    <span className="font-medium text-slate-600 min-w-32">Titular de la marca:</span>
                                                    <span className="text-slate-800 font-semibold">{form.watch('trademarkOwner')}</span>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                    <span className="font-medium text-slate-600 min-w-32">Estado:</span>
                                                    <span
                                                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${form.watch('status') === "activo"
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-red-100 text-red-800"
                                                            }`}
                                                    >
                                                        {form.watch('status') === "activo" ? "Activo" : "Inactivo"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Navigation Buttons */}
                                <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t">
                                    <div className="flex gap-2">
                                        {currentStep > 1 && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={handleBack}
                                                className="flex items-center gap-2 hover:bg-slate-50"
                                            >
                                                <ChevronLeft className="w-4 h-4" />
                                                Anterior
                                            </Button>
                                        )}
                                    </div>

                                    <div className="flex gap-2 sm:ml-auto">
                                        {currentStep < 3 && (
                                            <Button
                                                type="button"
                                                onClick={handleNext}
                                                className="flex items-center gap-2 bg-slate-700 hover:bg-slate-800"
                                            >
                                                Siguiente
                                                <ChevronRight className="w-4 h-4" />
                                            </Button>
                                        )}

                                        {currentStep === 3 && (
                                            <Button
                                                type="submit"
                                                disabled={loading}
                                                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50"
                                            >
                                                {loading ? (
                                                    <>
                                                        <LoadingSpinner size="sm" />
                                                        <span className="ml-2">Procesando...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Check className="w-4 h-4" />
                                                        {isEditing ? "Actualizar Marca" : "Registrar Marca"}
                                                    </>
                                                )}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
