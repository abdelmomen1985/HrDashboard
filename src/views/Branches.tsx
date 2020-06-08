import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  IconButton,
  makeStyles,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { LocationOn, Delete, Edit } from "@material-ui/icons";
import AddBranchModal from "../components/branches/AddBranchModal";
//import { useMyFetch } from "../utils/useMyFetch";
import { useQuery, useMutation } from "react-query";
import { GetBranches, DeleteBranch } from "../queries/Branches";

const useStyles = makeStyles((theme) => ({
  root: {},
  button: {
    color: theme.palette.error.main,
  },
}));

export default function Branches() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  /*
  const { loading, data } = useMyFetch(
    process.env.REACT_APP_API_URL + "Company/Branches?company_id=1",
    {}
  );
  */

  const { status, data, error, refetch } = useQuery(
    "GetBranches",
    async () =>
      await GetBranches(
        process.env.REACT_APP_API_URL + "Company/Branches?company_id=1",
        {}
      )
  );

  const [mutate, { status: custStatus }] = useMutation(
    async (id: string) =>
      await DeleteBranch(
        `${process.env.REACT_APP_API_URL}Company/Branch/${id}`,
        {}
      )
  );

  const [openDialog, setOpenDialog] = React.useState(false);
  const [branchToRemove, setBranchToRemove] = useState({} as any);

  const handleClickOpen = (branch: any) => {
    setBranchToRemove(branch);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleDelete = async () => {
    await mutate(branchToRemove.id);
    setBranchToRemove({} as any);
    await refetch();
    setOpenDialog(false);
  };

  if (status === "loading") return <div>Loading ...</div>;
  if (status === "error") return <div>Error {error} ...</div>;

  return (
    <>
      <Box component="div" m={2}>
        {/** Show List of Branches */}
        {custStatus && custStatus === "loading" && (
          <LinearProgress color="secondary" />
        )}
        <List>
          {data &&
            data.map((branch: any, index: any) => (
              <ListItem button key={index}>
                <LocationOn color="secondary" />
                {/*
                <ListItemText primary={branch.branchNameAr} />
                */}

                <ListItemText primary={branch.ar_name} />
                <IconButton color="primary" aria-label="add ">
                  <Edit />
                </IconButton>
                <IconButton
                  color="primary"
                  aria-label="delete "
                  onClick={() => {
                    handleClickOpen(branch);
                  }}
                >
                  <Delete className={classes.button} />
                </IconButton>
              </ListItem>
            ))}
        </List>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setOpen(true);
          }}
        >
          اضافة فرع جديد
        </Button>
        <AddBranchModal
          open={open}
          handelClose={() => {
            setOpen(false);
            refetch();
          }}
        />

        <Dialog
          open={openDialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete this branch ?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Delete this Branch ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
