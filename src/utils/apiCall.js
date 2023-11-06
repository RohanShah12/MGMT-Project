import axios from "axios";

export const getMethod = async (url, params = {}) => {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postMethod = async (url, data = {}) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const putMethod = async (url, data = {}) => {
  try {
    const response = await axios.put(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteMethod = async (url, data = {}) => {
  try {
    const response = await axios.delete(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
