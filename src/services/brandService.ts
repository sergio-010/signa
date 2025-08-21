// Configuración de la API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Tipos para las marcas
export interface Brand {
  id: number;
  brandName: string;
  trademarkOwner: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BrandCreateRequest {
  brandName: string;
  trademarkOwner: string;
  status: boolean;
}

export interface BrandUpdateRequest {
  brandName?: string;
  trademarkOwner?: string;
  status?: boolean;
}

export interface BrandsResponse {
  brands: Brand[];
  totalPages: number;
  currentPage: number;
  total: number;
  error: string | null;
}

export interface BrandResponse {
  brand: Brand | null;
  error: string | null;
}

export interface DeleteResponse {
  success: boolean;
  error: string | null;
}

// Función auxiliar para manejar respuestas de la API
async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ error: "Error desconocido" }));
    throw new Error(errorData.error || `Error HTTP: ${response.status}`);
  }
  return response.json();
}

// Servicios para manejar las marcas
export const brandService = {
  // Obtener todas las marcas con paginación
  async getBrands(
    page: number = 1,
    perPage: number = 6
  ): Promise<BrandsResponse> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/brands/?page=${page}&per_page=${perPage}`
      );
      return await handleApiResponse<BrandsResponse>(response);
    } catch (error) {
      return {
        brands: [],
        totalPages: 1,
        currentPage: page,
        total: 0,
        error:
          error instanceof Error
            ? error.message
            : "Error al obtener las marcas",
      };
    }
  },

  // Obtener una marca específica
  async getBrand(id: number): Promise<BrandResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/brands/${id}/`);
      return await handleApiResponse<BrandResponse>(response);
    } catch (error) {
      return {
        brand: null,
        error:
          error instanceof Error ? error.message : "Error al obtener la marca",
      };
    }
  },

  // Crear una nueva marca
  async createBrand(brandData: BrandCreateRequest): Promise<BrandResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/brands/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(brandData),
      });
      
      return await handleApiResponse<BrandResponse>(response);
    } catch (error) {
      console.error('Create brand error:', error);
      return {
        brand: null,
        error:
          error instanceof Error ? error.message : "Error al crear la marca",
      };
    }
  },

  // Actualizar una marca existente
  async updateBrand(
    id: number,
    brandData: BrandUpdateRequest
  ): Promise<BrandResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/brands/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(brandData),
      });
      return await handleApiResponse<BrandResponse>(response);
    } catch (error) {
      return {
        brand: null,
        error:
          error instanceof Error
            ? error.message
            : "Error al actualizar la marca",
      };
    }
  },

  // Eliminar una marca
  async deleteBrand(id: number): Promise<DeleteResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/brands/${id}/`, {
        method: "DELETE",
      });
      return await handleApiResponse<DeleteResponse>(response);
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Error al eliminar la marca",
      };
    }
  },

  // Verificar el estado de la API
  async healthCheck(): Promise<{ status: string; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return await handleApiResponse<{ status: string; message: string }>(
        response
      );
    } catch (error) {
      throw new Error("Backend no disponible");
    }
  },
};
