import React from 'react';
import { Edit, Delete } from "@material-ui/icons";
import {
    ListItem,
    ListItemText,
    IconButton,
    makeStyles,
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
    const currentLanguage = localStorage.getItem('lang');

    var name;
    if(item.en_name && currentLanguage === 'en') name = item.en_name;
    else name = item.ar_name

    return (
        <ListItem button>
            {children}
            <ListItemText primary={name} />
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
