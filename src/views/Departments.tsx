import React, { useState } from "react";
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

import { Edit, Delete } from "@material-ui/icons";
import { GetDepartments, DeleteDepartment } from '../queries/Departments';

// UI Components
import AddDepartmentModal from '../components/departments/AddDepartmentModal';
import DeleteDialog from '../components/utils/DeleteDialog';


const useStyles = makeStyles((theme) => ({
    button: {
        color: theme.palette.error.main,
    },

    loadingSpinner: {
        width: '100%',
        marginLeft: '50%',
    }
}));

export default function Departments() {
    const classes = useStyles();
    const [createModal, openCreateModal] = useState(false);
    const [deleteDialog, openDeleteDialog] = useState(false);
    const [departmentToDelete, setDepartmentToDelete] = useState({} as any);


    // Fetch departments list
    const { data, status, error, refetch } = GetDepartments();
    const [mutate, { status: mutateStatus }] = DeleteDepartment();

    const onDeleteClick = (department: any) => {
        setDepartmentToDelete(department);
        openDeleteDialog(true);
    }

    // Close Dialog
    const handleClose = () => {
        openDeleteDialog(false);
    };

    // Delete Department
    const handleDelete = async () => {

        // Delete Branch Mutation
        mutate(departmentToDelete.id).then(async () => {
            setDepartmentToDelete({} as any);
            await refetch();
        })

        // List Refetch
        openDeleteDialog(false);
    }

    return (
        <Box component="div" m={2}>

            {/* Loading Spinner */}
            {!data && mutateStatus !== 'loading' && (
                <LinearProgress color="secondary" />
            )}

            <List>
                {/* Response iteration */}
                {data && data.map((department: any, index: any) => (
                    <ListItem button key={index}>
                        <ListItemText primary={department.ar_name} />

                        <IconButton color="primary" aria-label="add ">
                            <Edit />
                        </IconButton>

                        <IconButton
                            color="primary"
                            aria-label="delete "
                            onClick={() => {
                                onDeleteClick(department);
                            }}>
                            <Delete className={classes.button} />
                        </IconButton>

                    </ListItem>
                ))}
            </List>

            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    openCreateModal(true);
                }}>
                اضافة قسم جديد
            </Button>

            <AddDepartmentModal
                open={createModal}
                handleClose={() => {
                    openCreateModal(false);
                    refetch();
                }} />

            {/* Delete Branch Dialog */}
            <DeleteDialog open={deleteDialog} handleClose={handleClose} handleDelete={handleDelete} />
        </Box>
    )
};

