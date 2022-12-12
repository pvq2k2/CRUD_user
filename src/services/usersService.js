import instance from "./instance";

export const getUsers = async () => {
  try {
    const { data } = await instance.get(`/users`);
    return data;
  } catch (error) {
    return error;
  }
};

export const readUser = async (id) => {
  try {
    const { data } = await instance.get(`/users/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const removeUser = async (id) => {
  try {
    const { data } = await instance.delete(`/users/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const updateUser = async (user) => {
  try {
    const { data } = await instance.put(`/users/${user.id}`, user);
    return data;
  } catch (error) {
    return error;
  }
};

export const createUser = async (user) => {
  try {
    const { data } = await instance.post(`/users`, user);
    return data;
  } catch (error) {
    return error;
  }
};
