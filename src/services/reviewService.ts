import api from "./api"; // Menggunakan instance axios dari api.ts milikmu

// Fungsi untuk mengambil semua data review dari database
export const getReviews = async () => {
  try {
    const response = await api.get("/reviews"); // Sesuaikan dengan endpoint route di backend Express/Nest-mu
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

// Fungsi opsional jika backend kamu butuh filter berdasarkan ID Tenant tertentu
export const getReviewsByTenant = async (tenantId: number) => {
  return await api.get(`/reviews/tenant/${tenantId}`);
};