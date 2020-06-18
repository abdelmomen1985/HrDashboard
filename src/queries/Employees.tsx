import Axios, { AxiosRequestConfig } from "axios";
import { Get } from './helpers';
import { useQuery } from "react-query";

const url = process.env.REACT_APP_API_URL;

const GetEmployees = () => {
  return useQuery("GetEmployees", async () => {
    return await Get(url + 'employees', {})
  })
}

export { GetEmployees };
