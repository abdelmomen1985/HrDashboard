import React from "react";
import {
  List,
  ListItem,
  Box,
  ListItemText,
  IconButton,
  makeStyles,
  LinearProgress
} from "@material-ui/core";
import { Person, Edit, Delete } from "@material-ui/icons";
import { GetEmployees } from "../queries/Employees";

const useStyles = makeStyles((theme) => ({
  root: {},
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
              <ListItem button key={index}>
                <Person color="secondary" />

                <ListItemText primary={employee.ArabicDescription} />
                <IconButton color="primary" aria-label="add ">
                  <Edit />
                </IconButton>
                <IconButton
                  color="primary"
                  aria-label="delete "
                  onClick={() => {
                    // handleClickOpen(employee);
                  }}
                >
                  <Delete className={classes.button} />
                </IconButton>
              </ListItem>
            ))}
        </List>
      </Box>
    </>
  );
}
