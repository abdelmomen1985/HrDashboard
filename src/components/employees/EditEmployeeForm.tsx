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

interface EditEmployeeFormProps {
    sendDataToParent: (data: object) => void,
    onSubmit: () => void,
    error: string,
    employee: any
}

export default function EditEmployeeForm(props: EditEmployeeFormProps) {
    const classes = Styles();
    const employee = props.employee;

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
                    {employee.ar_name}
                </Typography>

                {/* Arabic Name Field */}
                <form className={classes.form} noValidate>
                    <TextField
                        defaultValue={employee.ar_name}
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
                        defaultValue={employee.en_name}
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
                        اضافة
          </Button>

                </form>
            </div>
        </Container>
    );
}