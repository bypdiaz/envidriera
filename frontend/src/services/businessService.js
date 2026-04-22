import API from "./api";

export const createBusiness = async (data) => {
  const response = await API.post("/businesses", data);
  return response.data;
};

export const getMyBusinesses = async () => {
  const response = await API.get("/businesses"); 
  return response.data;
};