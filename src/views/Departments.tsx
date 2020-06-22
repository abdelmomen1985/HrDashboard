import React, { useState } from "react";
import {
    List,
    Button,
    Box,
    LinearProgress
} from "@material-ui/core";
import { GetDepartments, DeleteDepartment } from '../queries/Departments';

// UI Components
import NewDepartmentForm from '../components/departments/NewDepartmentForm'
import EditDepartmentForm from '../components/departments/EditDepartmentForm';
import DeleteDialog from '../components/ui/DeleteDialog';
import Modal from '../components/ui/Modal';
import ListItem from '../components/ui/ListItem';

// Localized Strings
import { strings } from '../localization';

export default function Departments() {
    const [createModal, openCreateModal] = useState(false);
    const [editModal, openEditModal] = useState(false);
    const [deleteDialog, openDeleteDialog] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState({} as any);

    // HTTP Requests
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

    if (status === "loading") return <LinearProgress color="secondary" />;

    return (
        <Box component="div" m={2}>

            {/* Loading Spinner */}
            {mutateStatus === 'loading' && (
                <LinearProgress color="secondary" />
            )}

            {/* Departments List */}
            <List>
                {/* Response iteration */}
                {data && data.map((department: any, index: any) => (
                    <ListItem item={department} key={index}
                        onEditClick={() => onEditClick(department)}
                        onDeleteClick={() => onDeleteClick(department)} />
                ))}
            </List>

            {/* New Department Button */}
            <Button variant="contained" color="primary" onClick={() => openCreateModal(true)}>
                {strings.addDepartment}
            </Button>

            {/* New Department Modal */}
            <Modal title={strings.addDepartment} open={createModal} handleClose={() => { openEditModal(false); refetch(); }}>
                <NewDepartmentForm handleSave={() => { openCreateModal(false); refetch() }} />
            </Modal>

            {/* Edit Department Modal */}
            <Modal title={strings.editDepartment} open={editModal} handleClose={() => { openEditModal(false); refetch(); }}>
                <EditDepartmentForm handleSave={() => { openEditModal(false); refetch() }} department={selectedDepartment} />
            </Modal>

            {/* Delete Branch Dialog */}
            <DeleteDialog open={deleteDialog} handleClose={() => openDeleteDialog(false)} handleDelete={handleDelete} />
        </Box>
    )
};

