import API from "./api";

export const getProducts = async () => {
  try {
    const response = await API.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos", error);
    return [];
  }
};

export const createProduct = async (formData) => {
  const response = await API.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return response.data;
};