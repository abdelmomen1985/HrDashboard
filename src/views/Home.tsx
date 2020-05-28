import React from "react";
import { useMyFetch } from "../utils/useMyFetch";

export default function Home() {
  const { loading, data } = useMyFetch(
    "https://jsonplaceholder.typicode.com/todos/1",
    {}
  );
  if (loading) return <div>Loading ...</div>;
  return <div>{JSON.stringify(data)}</div>;
}
