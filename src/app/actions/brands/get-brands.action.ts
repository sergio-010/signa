"use server";

import { brandService, BrandsResponse } from "@/services/brandService";

interface GetBrandsProps {
  take?: number;
  skip?: number;
}

export const getBrands = async ({
  take = 6,
  skip = 1,
}: GetBrandsProps): Promise<BrandsResponse> => {
  try {
    const result = await brandService.getBrands(skip, take);
    return result;
  } catch (error) {
    return {
      brands: [],
      totalPages: 1,
      currentPage: 1,
      total: 0,
      error: error instanceof Error ? error.message : "Ups ocurrió un error",
    };
  }
};

export const getBrand = async (id: number) => {
  try {
    const result = await brandService.getBrand(id);
    return result;
  } catch (error) {
    return {
      brand: null,
      error: error instanceof Error ? error.message : "Ups ocurrió un error",
    };
  }
};
