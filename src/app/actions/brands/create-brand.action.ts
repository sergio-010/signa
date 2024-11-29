"use server";

import prisma from "@/lib/prisma";

type TCreateBrand = {
  brandName: string;
  trademarkOwner: string;
  status: boolean;
};

export const createBrand = async (brand: TCreateBrand) => {
  try {
    const res = await prisma.brand.create({
      data: brand,
    });

    return { brand: res, error: null };
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : "Ups ocurrio un error";
    return { brand: null, error: errMsg };
  }
};
