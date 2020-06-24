import React, { useEffect } from "react";
import { Modal, makeStyles, Fade, Backdrop, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: 0,
        padding: theme.spacing(2, 4, 3),
        minWidth: 400,
        borderRadius: 5,
        '&:focus': {
            outline: '0 !important'
        }
       
    },
    title: {
        textAlign: 'center'
    },
    children: {
        width: 'fit-content',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}));

interface Modal {
    open: boolean;
    handleClose: (arg0: boolean) => void;
    children: React.ReactNode;
    title?: string
};

export default function AddDepartmentModal(props: Modal) {
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
                BackdropProps={{ timeout: 500, }}>

                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title" className={classes.title}>{props.title}</h2>
                        <Box width={1} className={classes.children}>
                          {props.children}
                        </Box>
                    </div>
                </Fade>
            </Modal>
        </>
    )
}