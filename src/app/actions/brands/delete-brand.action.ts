"use server";

import prisma from "@/lib/prisma";

export const deleteBrand = async (id: number) => {
  try {
    await prisma.brand.delete({
      where: { id },
    });

    return { success: true, error: null };
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : "Ups, ocurrió un error";
    return { success: false, error: errMsg };
  }
};
