import React, { useState } from 'react';
import AddEmployeeForm from '../../components/employees/AddEmployeeForm';
import { strings } from '../../localization'

// HTTP POST Action
import { PostEmployee } from '../../queries/Employees';

export default function AddEmployee(props: any) {
    const [inputData, setInputData] = useState<any>({});
    const [error, setError] = useState<any>('')

    const [mutate, {status: status, error: httpError}] = PostEmployee();

    // Get input data from child form
    const getInputData = (data: { arName?: string, enName?: string }) => {
        setInputData(data);
    }

    const onSubmit = async () => {
        const arName = inputData.arName;
        const enName = inputData.enName;

        // Input validation
        if (!arName || !enName) return setError(strings.employeeError);
        else setError("");

        /**
         * HTTP Request
         */

        // Request Payload
        const payload = {
            ar_name: arName,
            en_name: enName
        };

        // Mutation
        await mutate(payload);

        // Error handling
        if(httpError) setError(httpError);
        else setError('');

        // Redirect to employees list
        props.history.push('/employees');

    }

    return (
        <AddEmployeeForm sendDataToParent={getInputData} onSubmit={onSubmit} error={error} />
    )
}