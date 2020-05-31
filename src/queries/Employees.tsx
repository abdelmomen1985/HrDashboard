import Axios, { AxiosRequestConfig } from "axios";

const GetEmployees = async (url: string, config: AxiosRequestConfig) => {
  const { data } = await Axios(url, config);
  return data;
};

export { GetEmployees };
