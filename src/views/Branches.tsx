import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  IconButton,
  makeStyles,
  LinearProgress,

} from "@material-ui/core";
import { LocationOn, Delete, Edit } from "@material-ui/icons";
import { DeleteBranch, GetBranches } from "../queries/Branches";

// UI Components
import DeleteDialog from '../components/utils/DeleteDialog';
import Modal from '../components/utils/Modal';
import NewBranchForm from '../components/branches/NewBranchForm';
import EditBranchFrom from '../components/branches/EditBranchForm';

const useStyles = makeStyles((theme) => ({
  root: {},
  button: {
    color: theme.palette.error.main,
  },
}));

export default function Branches() {
  const classes = useStyles();

  // Component State
  const [createModal, openCreateModal] = useState(false);
  const [editModal, openEditModal] = useState(false);
  const [deleteDialog, openDeleteDialog] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState({} as any);

  // HTTP Requests
  const { status, data, error, refetch } = GetBranches();
  const [mutate, { status: mutateStatus }] = DeleteBranch();

  // Delete Branch Dialog
  const onDeleteClick = (branch: any) => {
    setSelectedBranch(branch);
    openDeleteDialog(true);
  };

  const onEditClick = (branch: any) => {
    setSelectedBranch(branch);
    openEditModal(true);
  }

  // Close Dialog
  const handleClose = () => {
    openDeleteDialog(false);
  };

  // Delete Branch
  const handleDelete = async () => {

    // Delete Branch Mutation
    await mutate(selectedBranch.id);
    setSelectedBranch({} as any);

    // List refetch
    await refetch();
    openDeleteDialog(false);
  };

  if (status === "loading") return <LinearProgress color="secondary" />;
  if (status === "error") return <div>Error {error} ...</div>;

  return (
    <>
      <Box component="div" m={2}>

        {/* Loading Progress */}
        {mutateStatus && mutateStatus === "loading" && (
          <LinearProgress color="secondary" />
        )}

        {/* Branches List */}
        <List>
          {data &&
            data.map((branch: any, index: any) => (
              <ListItem button key={index}>
                <LocationOn color="secondary" />
                <ListItemText primary={branch.ar_name} />

                <IconButton color="primary" aria-label="edit" onClick={() => onEditClick(branch)}>
                  <Edit />
                </IconButton>

                <IconButton
                  color="primary"
                  aria-label="delete"
                  onClick={() => {
                    onDeleteClick(branch);
                  }}>

                  <Delete className={classes.button} />

                </IconButton>
              </ListItem>
            ))}
        </List>
        {/* End of Branches List */}

        {/* Button for creating a new branch */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => openCreateModal(true)}>
          اضافة فرع جديد
        </Button>

        {/* Create Branch Modal */}
          <Modal open={createModal} handleClose={() => {openCreateModal(false); refetch()}}>
            <NewBranchForm handleSave={() => {openCreateModal(false); refetch()}} />
          </Modal>

        {/* Edit Branch Modal */}
        <Modal open={editModal} handleClose={() => {openEditModal(false); refetch()}}>
          <EditBranchFrom handleSave={() => {openEditModal(false); refetch()}} branch={selectedBranch}/>
        </Modal>

        {/* Delete Branch Dialog */}
        <DeleteDialog open={deleteDialog} handleClose={handleClose} handleDelete={handleDelete} />
      </Box>
    </>
  );
}
