import React from 'react';
import { Edit, Delete } from "@material-ui/icons";
import {
    List,
    ListItem,
    ListItemText,
    Button,
    Box,
    IconButton,
    makeStyles,
    LinearProgress
} from "@material-ui/core";


// Component Styles
const useStyles = makeStyles((theme) => ({
    button: {
        color: theme.palette.error.main,
    }
}));

// Component Props
type ListItemProps = {
    children?: React.ReactNode,
    item: any,
    onEditClick?: any,
    onDeleteClick?: any
}

/**
 * ListItem Component
 * Used to list Departments, Branches and Employees
 */

export default function ListItemComponent({ children, item, onEditClick, onDeleteClick }: ListItemProps) {
    const classes = useStyles();

    return (

        <ListItem button>
            {children}
            <ListItemText primary={item.ar_name} />
            <IconButton color="primary" aria-label="edit" onClick={() => onEditClick()}>
                <Edit />
            </IconButton>

            <IconButton
                color="primary"
                aria-label="delete"
                onClick={() => onDeleteClick()}>
                <Delete className={classes.button} />
            </IconButton>

        </ListItem>
    )
}
