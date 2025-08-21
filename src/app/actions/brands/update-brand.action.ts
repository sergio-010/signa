"use server";

import { brandService } from "@/services/brandService";

type TEditBrand = {
  brandName: string;
  trademarkOwner: string;
  status: boolean;
};

export const updateBrand = async (id: number, brand: TEditBrand) => {
  try {
    const result = await brandService.updateBrand(id, brand);
    return result;
  } catch (error) {
    return {
      brand: null,
      error: error instanceof Error ? error.message : "Ups ocurrió un error",
    };
  }
};
