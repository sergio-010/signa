"use server";

import prisma from "@/lib/prisma";

type TEditBrand = {
  brandName: string;
  trademarkOwner: string;
  status: boolean;
};

export const updateBrand = async (id: number, brand: TEditBrand) => {
  try {
    const res = await prisma.brand.update({
      where: { id },
      data: brand,
    });

    return { brand: res, error: null };
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : "Ups ocurrio un error";
    return { brand: null, error: errMsg };
  }
};
