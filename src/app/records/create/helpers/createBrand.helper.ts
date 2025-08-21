import { z } from "zod";

export const INITIAL_VALUES: BrandFormData = {
  brand: "",
  trademarkOwner: "",
  status: "activo",
};

export const brandSchema = z.object({
  brand: z.string().min(1, "El nombre de la marca es obligatorio"),
  trademarkOwner: z.string().min(1, "El titular de la marca es obligatorio"),
  status: z.enum(["activo", "inactivo"], {
    message: "Selecciona un estado válido",
  }),
});

export type BrandFormData = z.infer<typeof brandSchema>;
