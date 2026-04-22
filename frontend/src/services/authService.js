import API from "./api";

export const login = async (email, password) => {
  const response = await API.post("/users/login", {
    email,
    password
  });

  return response.data;
};