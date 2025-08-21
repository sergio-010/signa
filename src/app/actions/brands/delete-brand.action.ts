"use server";

import { revalidatePath } from "next/cache";
import { brandService } from "@/services/brandService";

export const deleteBrand = async (id: number) => {
  try {
    const result = await brandService.deleteBrand(id);
    
    if (result.success) {
      // Revalidar las rutas para que se actualicen los datos
      revalidatePath("/");
      revalidatePath("/records");
    }
    
    return result;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Ups, ocurrió un error",
    };
  }
};
