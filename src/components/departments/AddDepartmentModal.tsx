import React, { useEffect } from "react";
import { Modal, makeStyles, Fade, Backdrop, Box } from "@material-ui/core";
import NewDepartmentForm from "./NewDepartmentForm";

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

interface AddDepartmentModalProps {
    open: boolean;
    handleClose: (arg0: boolean) => void;
};

export default function AddDepartmentModal(props: AddDepartmentModalProps) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(props.open);

    const handleClose = () => {
        setOpen(false);
        props.handleClose(false);
    };

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
                        <h2 id="transition-modal-title">اضافة قسم جديد </h2>
                        <Box width={1}>
                            <NewDepartmentForm
                                handleSave={() => {
                                    handleClose();
                                }}
                            />
                        </Box>
                    </div>
                </Fade>
            </Modal>
        </>
    )
}