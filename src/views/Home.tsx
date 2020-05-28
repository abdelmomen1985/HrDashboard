import React from "react";
import { useMyFetch } from "../utils/useMyFetch";
import Button from "@material-ui/core/Button";

export default function Home() {
  const { loading, data } = useMyFetch(
    "https://jsonplaceholder.typicode.com/todos/1",
    {}
  );
  if (loading) return <div>Loading ...</div>;
  return (
    <div>
      {JSON.stringify(data)}
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </div>
  );
}
