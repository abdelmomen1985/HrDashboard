import Axios, { AxiosRequestConfig } from "axios";

const Get = async (url: string, config: AxiosRequestConfig) => {
    const { data } = await Axios(url, config);
    return data;
};

const Post = async (url: string, payload: object, config: AxiosRequestConfig) => {
    const { data } = await Axios.post(url, payload, config);
    return data;
};

const Put = async (url: string, payload: object, config: AxiosRequestConfig) => {
    const { data } = await Axios.put(url, payload, config);
    return data;
}

const Delete = async (url: string, config: AxiosRequestConfig) => {
    const { data } = await Axios.delete(url, config);
    return data;
};

export { Get, Delete, Post, Put };