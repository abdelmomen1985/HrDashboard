import React, { useState } from "react";
import {
  List,
  Button,
  Box,
  makeStyles,
  LinearProgress,
} from "@material-ui/core";
import { LocationOn } from "@material-ui/icons";
import { DeleteBranch, GetBranches } from "../queries/Branches";

// UI Components
import ListItemComponent from "../components/ui/ListItemComponent";
import DeleteDialog from "../components/ui/DeleteDialog";
import Modal from "../components/ui/Modal";
import NewBranchForm from "../components/branches/NewBranchForm";
import EditBranchFrom from "../components/branches/EditBranchForm";

// Localized Strings
import { strings } from "../localization/localization";

export default function Branches() {
  const constants = strings.branches;

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

  // Edit Branch Modal
  const onEditClick = (branch: any) => {
    setSelectedBranch(branch);
    openEditModal(true);
  };

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
        {mutateStatus === "loading" && <LinearProgress color="secondary" />}

        {/* Branches List */}
        <List>
          {data &&
            data.map((branch: any, index: number) => (
              <ListItemComponent
                item={branch}
                key={index}
                onEditClick={() => onEditClick(branch)}
                onDeleteClick={() => onDeleteClick(branch)}
              >
                <LocationOn style={{ margin: 12 }} color="secondary" />
              </ListItemComponent>
            ))}
        </List>
        {/* End of Branches List */}

        {/* Button for creating a new branch */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => openCreateModal(true)}
        >
          {constants.addBranch}
        </Button>

        {/* Create Branch Modal */}
        <Modal
          title={constants.addBranch}
          open={createModal}
          handleClose={() => {
            openCreateModal(false);
            refetch();
          }}
        >
          <NewBranchForm
            handleSave={() => {
              openCreateModal(false);
              refetch();
            }}
          />
        </Modal>

        {/* Edit Branch Modal */}
        <Modal
          title={constants.editBranch}
          open={editModal}
          handleClose={() => {
            openEditModal(false);
            refetch();
          }}
        >
          <EditBranchFrom
            handleSave={() => {
              openEditModal(false);
              refetch();
            }}
            branch={selectedBranch}
          />
        </Modal>

        {/* Delete Branch Dialog */}
        <DeleteDialog
          open={deleteDialog}
          handleClose={handleClose}
          handleDelete={handleDelete}
        />
      </Box>
    </>
  );
}
