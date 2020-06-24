import React, { useState, useContext } from "react";
import {
  List,
  Box,
  LinearProgress,
  ListItemText,
  Grid,
} from "@material-ui/core";

import { AppCtxt } from "../setup/Context";

// UI Components
import RequestInfo from "../components/emp-requests/RequestInfo";
import Modal from "../components/ui/Modal";
import ListItemComponent from "../components/ui/ListItemComponent";
import { GetEmpRequests } from "../queries/EmpRequests";
import { EmpRequest } from "../types/types";

export default function Requests() {
  const [requestModal, openRequestModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState({} as any);
  const { currentLang } = useContext(AppCtxt);

  // HTTP Requests
  const { data: requests, status: getAllStatus, refetch } = GetEmpRequests();

  const onRequestClick = (request: any) => {
    openRequestModal(true);
    setSelectedRequest(request);
  };

  if (getAllStatus === "loading") return <LinearProgress color="secondary" />;

  return (
    <Box component="div" m={2}>
      {/* Employee Requests */}
      <List>
        {requests &&
          requests.map((request: EmpRequest, index: number) => (
            <ListItemComponent
              onClick={() => onRequestClick(request)}
              item={request}
              key={index}
              onEditClick={() => onRequestClick(request)}
            >
              <Grid direction="row">
                {request.request_status_id === 1 && "Approved"}
                {request.request_status_id === 2 && "Rejected"}
                <ListItemText
                  primary={
                    currentLang === "en"
                      ? request.employee.en_name
                      : request.employee.ar_name
                  }
                />
                <ListItemText
                  secondary={
                    currentLang === "en"
                      ? request.request_type.en_name
                      : request.request_type.ar_name
                  }
                />
                <ListItemText
                  secondary={
                    currentLang === "en"
                      ? request.to_department.en_name
                      : request.to_department.ar_name
                  }
                />
              </Grid>
            </ListItemComponent>
          ))}
      </List>

      {/* Request Modal*/}
      <Modal
        open={requestModal}
        handleClose={() => {
          openRequestModal(false);
          refetch();
        }}
      >
        <RequestInfo
          handleSave={() => {
            openRequestModal(false);
            refetch();
          }}
          request={selectedRequest}
        />
      </Modal>
    </Box>
  );
}
