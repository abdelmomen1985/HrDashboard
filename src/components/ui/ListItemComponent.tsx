import React from "react";
import { Edit, Delete } from "@material-ui/icons";
import {
  ListItem,
  ListItemText,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import {
  Employee,
  Department,
  Branch,
  EmpRequest,
  RequestType,
} from "../../types/types";

// Component Styles
const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.error.main,
  },
}));

// Component Props
type ListItemProps = {
  children?: React.ReactNode;
  item: Employee | Department | Branch | EmpRequest | RequestType;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  onClick?: () => void;
};

/**
 * ListItem Component
 * Used to list Departments, Branches and Employees
 */

export default function ListItemComponent({
  children,
  item,
  onClick,
  onEditClick,
  onDeleteClick,
}: ListItemProps) {
  const classes = useStyles();
  const currentLanguage = localStorage.getItem("lang");

  var name;
  if (item.en_name && currentLanguage === "en") name = item.en_name;
  else name = item.ar_name;

  return (
    <ListItem button onClick={onClick}>
      {children}
      <ListItemText primary={name} />

      {onEditClick && (
        <IconButton
          color="primary"
          aria-label="edit"
          onClick={() => onEditClick()}
        >
          <Edit />
        </IconButton>
      )}

      {onDeleteClick && (
        <IconButton
          color="primary"
          aria-label="delete"
          onClick={() => onDeleteClick()}
        >
          <Delete className={classes.button} />
        </IconButton>
      )}
    </ListItem>
  );
}
