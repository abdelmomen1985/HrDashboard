import React, { useState, useContext } from 'react';
import {
    List,
    Button,
    Box,
    LinearProgress,
    ListItemText,
    Typography,
    Grid
} from "@material-ui/core";

import { AppCtxt } from '../setup/Context'

// UI Components
import RequestInfo from '../components/emp-requests/RequestInfo';
import Modal from '../components/ui/Modal';
import ListItem from '../components/ui/ListItem';

import { GetEmpRequests } from '../queries/EmpRequests';
import { strings } from '../localization/localization';

export default function Requests() {
    const [requestModal, openRequestModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState({} as any);
    const { currentLang } = useContext(AppCtxt);

    // HTTP Requests
    const { data: requests, status: getAllStatus, error: getAllError, refetch } = GetEmpRequests();

    const onRequestClick = (request: any) => {
        openRequestModal(true);
        setSelectedRequest(request);
    };

    if (getAllStatus === 'loading') return <LinearProgress color="secondary" />;

    return (
        <Box component="div" m={2}>

            {/* Employee Requests */}
            <List>
                {requests && requests.map((request: any, index: number) => (
                    <ListItem
                        onClick={() => onRequestClick(request)}
                        item={request}
                        key={index}
                        onEditClick={() => onRequestClick(request)}>
                        <Grid direction='row'>
                            <ListItemText primary={currentLang === 'en' ? request.employee.en_name : request.employee.ar_name} />
                            <ListItemText secondary={currentLang === 'en' ? request.request_type.en_name : request.request_type.ar_name} />
                        </Grid>
                    </ListItem>
                ))}
            </List>

            {/* Request Modal*/}
            <Modal
             open={requestModal} 
             handleClose={() => {openRequestModal(false); refetch()}}>
                <RequestInfo handleSave={() => { openRequestModal(false); refetch() }} request={selectedRequest}/>
            </Modal>
        </Box>
    )
};