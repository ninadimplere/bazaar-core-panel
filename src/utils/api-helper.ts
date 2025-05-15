import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

axios.interceptors.request.use((config) => {
  return config;
});

export const bazaarApi = axios.create({
  baseURL: API_URL,
});

export async function bazaarApiGet(url: string, params?: any) {
  return await bazaarApi.get(url, { ...params }).then((res) => res.data);
}

export async function bazaarApiPost(url: string, data: any, params?: any) {
  return await bazaarApi.post(url, data, { ...params }).then((res) => {
    return res.data;
  });
}

export async function bazaarApiPut(url: string, data: any, params?: any) {
  return await bazaarApi.put(url, data, { ...params }).then((res) => {
    return res.data;
  });
}

export async function bazaarApiDelete(url: string, params?: any) {
  return await bazaarApi.delete(url, { ...params }).then((res) => {
    return res.data;
  });
}
