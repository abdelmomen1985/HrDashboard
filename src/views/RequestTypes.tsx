import React, { useState } from 'react';
import {
    List,
    Button,
    Box,
    LinearProgress
} from '@material-ui/core';

import { GetTypes, DeleteType } from '../queries/RequestTypes';

import { strings } from '../localization/localization';

// UI Components
import NewTypeForm from '../components/requests-types/NewTypeForm';
import EditTypeForm from '../components/requests-types/EditTypeForm';
import DeleteDialog from '../components/ui/DeleteDialog';
import Modal from '../components/ui/Modal';
import ListItem from '../components/ui/ListItem';

export default function Types() {
    const [createModal, openCreateModal] = useState(false);
    const [editModal, openEditModal] = useState(false);
    const [deleteDialog, openDeleteDialog] = useState(false);
    const [selectedType, setSelectedType] = useState({} as any);

    const constants = strings.requestTypes;

    // HTTP Requests
    const { data: types, status: getStatus, error: getError, refetch } = GetTypes();
    const [mutate, {status: mutationStatus} ] =  DeleteType();

    const onDeleteClick = (type: any) => {
        setSelectedType(type);
        openDeleteDialog(true);
    }

    const onEditClick = (type: any) => {
        setSelectedType(type);
        openEditModal(true);
    }

    const handleDelete = async () => {
        console.log(selectedType)
        mutate(selectedType.id).then(async () => {
            setSelectedType({} as any);
            await refetch();
        })

        openDeleteDialog(false);
     }


    if(getStatus === 'loading') return <LinearProgress color="secondary" />

    return (
        <Box component='div' m={2}>
            {/* Types List */}
            <List>
                {/* Response Iteration */}
                {types && types.map((type: any, index: any) => (
                    <ListItem item={type} key={index}
                    onEditClick={() => onEditClick(type)}
                    onDeleteClick={() => onDeleteClick(type)} />
                ))}
            </List>

            {/* New Type Button */}
            <Button variant="contained" color="primary" onClick={() => openCreateModal(true)}>
                {constants.addType}
            </Button>

            {/* Add Type Modal */}
            <Modal title={constants.addType} open={createModal} handleClose={() => {openCreateModal(false); refetch();}}> 
              <NewTypeForm handleSave={() => {openCreateModal(false); refetch()}} />
            </Modal>

            {/* Edit Type Modal */}
            <Modal title={constants.editType} open={editModal} handleClose={() => {openEditModal(false); refetch();}}>
                <EditTypeForm handleSave={() => {openEditModal(false); refetch()}} type={selectedType} />
            </Modal>

            {/* Delete Type Dialog */}
            <DeleteDialog open={deleteDialog} handleClose={() => openDeleteDialog(false)} handleDelete={handleDelete} />

            
        </Box>
    )
}