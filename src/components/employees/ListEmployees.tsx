import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { Person, Edit, Delete } from "@material-ui/icons";
import { GetEmployees } from "../../queries/Employees";
import { useQuery } from "react-query";

const useStyles = makeStyles((theme) => ({
  root: {},
  button: {
    color: theme.palette.error.main,
  },
}));

export default function ListEmployees() {
  const classes = useStyles();
  const { status, data, error } = useQuery(
    "GetEmployees",
    async () =>
      await GetEmployees(process.env.REACT_APP_API_URL + "Employees", {})
  );

  if (status === "loading") return <div>Loading ...</div>;
  if (status === "error") return <div>Error {error} ...</div>;

  return (
    <>
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
    </>
  );
}
