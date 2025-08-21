"use server";

import { revalidatePath } from "next/cache";
import { brandService } from "@/services/brandService";

type TEditBrand = {
  brandName: string;
  trademarkOwner: string;
  status: boolean;
};

export const updateBrand = async (id: number, brand: TEditBrand) => {
  try {
    const result = await brandService.updateBrand(id, brand);

    if (result.brand) {
      // Revalidar las rutas para que se actualicen los datos
      revalidatePath("/");
      revalidatePath("/records");
      revalidatePath(`/records/edit/${id}`);
    }

    return result;
  } catch (error) {
    return {
      brand: null,
      error: error instanceof Error ? error.message : "Ups ocurrió un error",
    };
  }
};
