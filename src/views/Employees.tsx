import React from "react";
import {
  List,
  Box,
  makeStyles,
  LinearProgress
} from "@material-ui/core";
import { GetEmployees } from "../queries/Employees";

import ListItem from '../components/ui/ListItem';

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.error.main,
  },
}));

export default function ListEmployees() {
  const classes = useStyles();
  const { status, data, error } = GetEmployees();

  if (status === "loading") return <LinearProgress color="secondary" />;
  if (status === "error") return <div>Error {error} ...</div>;

  return (
    <>
      <Box component="div" m={2}>
        <List>
          {data &&
            data.map((employee: any, index: any) => (
              <ListItem item={employee} key={index} />
      ))}
        </List>
      </Box>
    </>
  );
}
