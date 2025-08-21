"use server";

import { brandService } from "@/services/brandService";

export const deleteBrand = async (id: number) => {
  try {
    const result = await brandService.deleteBrand(id);
    return result;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Ups, ocurrió un error",
    };
  }
};
