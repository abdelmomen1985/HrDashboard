import Axios, { AxiosRequestConfig } from "axios";

const GetBranches = async (url: string, config: AxiosRequestConfig) => {
  const { data } = await Axios(url, config);
  return data;
};

const DeleteBranch = async (url: string, config: AxiosRequestConfig) => {
  const { data } = await Axios.delete(url, config);
  return data;
};

export { GetBranches, DeleteBranch };
