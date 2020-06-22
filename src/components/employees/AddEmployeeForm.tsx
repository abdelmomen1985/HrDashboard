import React, { useRef, SyntheticEvent } from 'react';
import {
    Button,
    CssBaseline,
    TextField,
    Typography,
    Container
} from '@material-ui/core';

// Styles
import Styles from './styles';

import { strings } from '../../localization';

interface AddEmployeeFormProps {
    sendDataToParent: (data: object) => void,
    onSubmit: () => void,
    error: string
}

export default function AddEmployeeForm(props: AddEmployeeFormProps) {
    const classes = Styles();

    // Input References
    const arNameInput = useRef<HTMLInputElement>(null);
    const enNameInput = useRef<HTMLInputElement>(null);

    // Send Input data to the parent component
    const onInputChange = () => {
        const arName = arNameInput.current && arNameInput.current.value;
        const enName = enNameInput.current && enNameInput.current.value;

        const inputData = {
            arName: arName,
            enName: enName
        }

        props.sendDataToParent(inputData)
    }

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        props.onSubmit()
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                    {strings.addEmployee}
                </Typography>

                {/* Arabic Name Field */}
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="ar-name"
                        label="الاسم باللغة العربية"
                        name="ar-name"
                        autoComplete="ar-name"
                        autoFocus
                        onChange={() => onInputChange()}
                        inputRef={arNameInput}
                    />

                    {/* English Name Field */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="en-name"
                        label="Name in English"
                        type="en-name"
                        id="en-name"
                        autoComplete="English Name"
                        onChange={() => onInputChange()}
                        inputRef={enNameInput}
                    />

                    {props.error &&
                        <Typography className={classes.errorMessage} color='error'>{props.error}</Typography>}

                    <Button
                        onClick={(e) => onSubmit(e)}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        {strings.add}
                    </Button>

                </form>
            </div>
        </Container>
    );
}