import React, { useEffect } from "react";
import { Modal, makeStyles, Fade, Backdrop, Box } from "@material-ui/core";
import NewBranchForm from "./NewBranchForm";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

interface AddBranchModalProps {
  open: boolean;
  handleClose: (arg0: boolean) => void;
}

export default function AddBranchModal(props: AddBranchModalProps) {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
    props.handleClose(false);
  };
  const [open, setOpen] = React.useState(props.open);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">اضافة فرع جديد </h2>
            <Box width={1}>
              <NewBranchForm
                handleSave={() => {
                  handleClose();
                }}
              />
            </Box>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
