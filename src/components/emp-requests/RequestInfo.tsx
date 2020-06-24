import React, { useContext, useRef, useCallback } from 'react';
import {
    Typography,
    Container,
    Divider,
    TextField,
    Grid,
    Button,

} from '@material-ui/core';

import { AppCtxt } from '../../setup/Context';
import { EditEmpRequest } from '../../queries/EmpRequests';
import Styles from './styles';

import { strings } from '../../localization/localization';

interface RequestInfoProps {
    handleSave: () => void,
    request: any
};


export default function RequestInfo({ request, handleSave }: RequestInfoProps) {
    const { currentLang } = useContext(AppCtxt);
    const classes = Styles();
    const constants = strings.requests;

    // Input Ref
    const responseInput = useRef<HTMLInputElement>(null);

    // Request elements
    const { request_type, to_department, employee, notes, response } = request

    // Response Localization
    var requestType = "",
        department = "",
        name = ""

    if (currentLang === 'en') {
        requestType = request_type.en_name;
        department = to_department.en_name ? to_department.en_name : to_department.ar_name;
        name = employee.en_name;
    } else {
        requestType = request_type.ar_name;
        department = to_department.ar_name;
        name = employee.ar_name;
    }

    const [mutate, {status: status, error: error}] = EditEmpRequest()

    const handleSubmit = useCallback(
        async (requestStatus: number) => {
            const response = responseInput.current && responseInput.current.value;

            const payload = {
                request_status_id: requestStatus,
                response: response
            };

            const variables = {
                id: request.id,
                payload: payload
            };

            await mutate(variables);

            if(status === 'error') alert(error);
            else handleSave();

        }, [handleSave]
    )


    return (
        <Container className={classes.container}>
            {/* Request Information */}
            <Typography variant="h5" align="center" style={{ marginBottom: 22 }}>{requestType}</Typography>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="subtitle2" color="textSecondary" style={{ marginBottom: 22 }}>{`${constants.to}: ${department}`}</Typography>
            <Typography variant="body1" style={{ marginBottom: 16 }}>{notes}</Typography>
            <Divider />

            <Typography variant="h6" style={{ marginTop: 16 }}>{constants.reply}</Typography>

            {/* Response Inputs */}
            <TextField
                className={classes.responseInput}
                inputRef={responseInput}
                defaultValue={response && response}
                multiline
                rows={3}
                rowsMax={6}
                variant="outlined"
                label={constants.response}
                name="name"
                aria-describedby="my-helper-text"
            />

            <Grid direction="row">
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={() => handleSubmit(1)}>
                    {constants.approve}
                    </Button>

                <Button
                    className={classes.rejectButton}
                    variant="contained"
                    onClick={() => handleSubmit(2)}>
                    {constants.reject}
                </Button>

            </Grid>


        </Container>
    )
}