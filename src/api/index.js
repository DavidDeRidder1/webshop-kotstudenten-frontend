import axiosRoot from 'axios';

const baseUrl = import.meta.env.VITE_API_URL;

export const axios = axiosRoot.create({
  baseURL: baseUrl,
});

export const setAuthToken = (token) => {
  if(token) {
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;  
  }
  else {
    delete axios.defaults.headers["Authorization"];
  }
};


export const post = async (url, {arg}) => {
  const {
    data,
  } = await axios.post(url, arg);

  return data;
}

export async function getAll(url) { 
  const {
    data,
  } = await axios.get(`${url}`); 

  return data.items;
}

export async function getById(url) { 
  const {
    data,
  } = await axios.get(`${url}`); 

  return data;
}

export const deleteById = async (url, { arg: id }) => { 
  await axios.delete(`${url}/${id}`); 
};

export const save = async (url, { arg: body }) => {
  const { id, ...values } = body;
  await axios({
    method: id ? 'PUT' : 'POST',
    url: `${url}/${id ?? ''}`,
    data: values,
  });
};

export async function getSavedProducts(url) {
  const {
    data,
  } = await axios.get(`${url}`)
  console.log(data.items);
  return data.items
}

export const getProductsPerCategory = async (url) => {
  const {
    data,
  } = await axios.get(`${url}`)
  console.log(data.items);
  return data.items
};

export const buyProduct = async (url, {arg: id}) => {
  await axios.put(`${url}/${id}`);
};

export const addProductToWishlist = async (url, {arg : id}) => {
  await axios.post(`${url}/${id}`);
};

export const removeProductFromWishlist = async (url, {arg: id}) => {
  await axios.delete(`${url}/${id}`);
};

export const addCategory = async (url, { arg: body }) => {
  await axios({
    method: 'POST',
    url: url,
    data: body,
  });
};




