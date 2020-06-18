import React from "react";
import { Box } from "@material-ui/core";
import ListEmployees from "../components/employees/ListEmployees";

export default function Employees() {
  return (
    <>
      <Box component="div" m={2}>
        <ListEmployees />
      </Box>
    </>
  );
}
