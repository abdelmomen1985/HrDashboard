import React, { useState, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
  } from "@material-ui/core";

  import { strings } from '../../localization/localization';


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
          {strings.general.deleteConfirmation}
        </DialogTitle>

        <DialogActions>

          <Button onClick={handleClose} color="primary">
            {strings.general.cancel}
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            {strings.general.delete}
          </Button>
        </DialogActions>
        
      </Dialog>
    )
}