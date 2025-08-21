"use server";

import { brandService } from "@/services/brandService";

type TCreateBrand = {
  brandName: string;
  trademarkOwner: string;
  status: boolean;
};

export const createBrand = async (brand: TCreateBrand) => {
  try {
    const result = await brandService.createBrand(brand);
    return result;
  } catch (error) {
    return {
      brand: null,
      error: error instanceof Error ? error.message : "Ups ocurrió un error",
    };
  }
};
