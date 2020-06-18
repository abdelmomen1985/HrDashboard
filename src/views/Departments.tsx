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
import NewDepartmentForm from '../components/departments/NewDepartmentForm'
import EditDepartmentForm from '../components/departments/EditDepartmentForm';
import DeleteDialog from '../components/utils/DeleteDialog';
import Modal from '../components/utils/Modal';


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
    const [editModal, openEditModal] = useState(false);
    const [deleteDialog, openDeleteDialog] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState({} as any);


    // Fetch departments list
    const { data, status, error, refetch } = GetDepartments();
    const [mutate, { status: mutateStatus }] = DeleteDepartment();

    const onDeleteClick = (department: any) => {
        setSelectedDepartment(department);
        openDeleteDialog(true);
    }

    const onEditClick = (department: any) => {
        setSelectedDepartment(department);
        openEditModal(true)
    }

    // Delete Department
    const handleDelete = async () => {

        // Delete Branch Mutation
        mutate(selectedDepartment.id).then(async () => {
            setSelectedDepartment({} as any);
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

                        <IconButton color="primary" aria-label="edit" onClick={() => onEditClick(department)}>
                            <Edit />
                        </IconButton>

                        <IconButton
                            color="primary"
                            aria-label="delete"
                            onClick={() => onDeleteClick(department)}>
                            <Delete className={classes.button} />
                        </IconButton>

                    </ListItem>
                ))}
            </List>

            <Button variant="contained" color="primary" onClick={() => openCreateModal(true) }>
                اضافة قسم جديد
            </Button>

            {/* New Department Modal */}
            <Modal open={createModal} handleClose={() => { openEditModal(false); refetch(); }}>
                <NewDepartmentForm handleSave={() => { openCreateModal(false); refetch() }} />
            </Modal>

            {/* Edit Department Modal */}
            <Modal open={editModal} handleClose={() => { openEditModal(false); refetch(); }}>
                <EditDepartmentForm handleSave={() => { openEditModal(false); refetch() }} department={selectedDepartment} />
            </Modal>

            {/* Delete Branch Dialog */}
            <DeleteDialog open={deleteDialog} handleClose={() => openDeleteDialog(false)} handleDelete={handleDelete} />
        </Box>
    )
};

