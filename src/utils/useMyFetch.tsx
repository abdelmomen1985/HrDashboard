import axios, { AxiosRequestConfig } from "axios";
import React from "react";

export const useMyFetch = (apiUrl: string, reqConfig: AxiosRequestConfig) => {
  const [data, setData] = React.useState([]);
  const [url] = React.useState(apiUrl);
  const [config] = React.useState(reqConfig);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios(url, config);
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [url, config]);
  return { data, error, loading };
};
