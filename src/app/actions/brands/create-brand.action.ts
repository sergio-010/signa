"use server";

import { revalidatePath } from "next/cache";
import { brandService } from "@/services/brandService";

type TCreateBrand = {
  brandName: string;
  trademarkOwner: string;
  status: boolean;
};

export const createBrand = async (brand: TCreateBrand) => {
  try {
    const result = await brandService.createBrand(brand);

    if (result.brand) {
      // Revalidar las rutas para que se actualicen los datos
      revalidatePath("/");
      revalidatePath("/records");
    }

    return result;
  } catch (error) {
    return {
      brand: null,
      error: error instanceof Error ? error.message : "Ups ocurrió un error",
    };
  }
};
