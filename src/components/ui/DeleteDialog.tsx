import React, { useState, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
  } from "@material-ui/core";


type DialogProps = {
    open: boolean,
    handleClose: () => void,
    handleDelete: () => void
}

export default function DeleteDialog({open, handleClose, handleDelete}: DialogProps) {
    return (
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">

        <DialogTitle id="alert-dialog-title">
          {"?Are you sure you want to delete this item"}
        </DialogTitle>

        <DialogContent>

          <DialogContentText id="alert-dialog-description">
            ?Delete this item
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
    )
}