import React, { useState, useEffect } from "react";
import EditEmployeeForm from "../../components/employees/EditEmployeeForm";
import { withRouter } from "react-router-dom";

// HTTP Requests
import { GetEmployee, PutEmployee } from "../../queries/Employees";
import { LinearProgress } from "@material-ui/core";

import { strings } from "../../localization/localization";

function EditEmployee(props: any) {
  const [inputData, setInputData] = useState<any>({});
  const [error, setError] = useState<any>("");

  // Get employee ID from the URL
  const employeeId = props.match.params.id;

  const { status, data, error: getError } = GetEmployee(employeeId);
  const [mutate, { status: mutationStatus, error: putError }] = PutEmployee();

  // Set input data to the employee's once data fetching is done
  useEffect(() => {
    if (data === undefined) return;
    setInputData({ arName: data.ar_name, enName: data.en_name });
  }, [data]);

  // Get input data from child form
  const getInputData = (data: { arName?: string; enName?: string }) => {
    setInputData(data);
  };

  const onSubmit = async () => {
    const arName = inputData.arName;
    const enName = inputData.enName;

    // Input validation
    if (!arName || !enName) return setError(strings.employees.editEmployeeError);
    else setError("");

    /**
     * HTTP Request
     */

    // Request Payload
    const payload = {
      ar_name: arName,
      en_name: enName,
    };

    // Mutation
    await mutate({ payload: payload, id: employeeId });

    // Error Handling
    if (putError) setError(putError);
    else setError("");

    props.history.push("/employees");
  };

  if (status === "loading") return <LinearProgress color="secondary" />;

  return (
    <>
      {mutationStatus === "loading" && <LinearProgress color="secondary" />}
      <EditEmployeeForm
        sendDataToParent={getInputData}
        onSubmit={onSubmit}
        employee={data}
        error={error}
      />
    </>
  );
}

export default withRouter(EditEmployee);
