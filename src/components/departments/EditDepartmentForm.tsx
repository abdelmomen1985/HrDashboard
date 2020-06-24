import React, { useCallback, SyntheticEvent, useState } from "react";
import {
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
    Button,
    Box,
    TextField,
} from "@material-ui/core";
import { Save } from "@material-ui/icons";

import { EditDepartment } from '../../queries/Departments';

import { strings } from '../../localization/localization';
import { Department } from "../../types/types";

interface EditDepartmentFormProps {
    handleSave: () => void,
    department: Department
};

export default function EditDepartmentForm({ handleSave, department }: EditDepartmentFormProps) {
    const constants = strings.departments;

    // HTTP Request
    const [mutate, { status: status, error: error }] = EditDepartment();

    const handleSubmit = useCallback(
        async (e: SyntheticEvent) => {
            e.preventDefault();

            const { arName, enName } = e.target as any;
            const payload = { ar_name: arName.value, en_name: enName.value };

            const variables = {
                payload: payload,
                id: department.id
            }

            await mutate(variables)

            if (status === 'error') alert(error);
            else handleSave();

        }, [handleSave]
    );

    return (
        <>
            <form onSubmit={handleSubmit}>

                {/* English Name Input */}
                <TextField
                    required
                    inputRef={(input) => input && input.focus()}
                    variant='outlined'
                    defaultValue={department.en_name}
                    name="enName"
                    label="Name in English"
                />

                <br />
                <br />

                {/* Arabic Name Input */}
                <TextField
                    required
                    inputRef={(input) => input && input.focus()}
                    defaultValue={department.ar_name}
                    variant='outlined'
                    name="arName"
                    label="الاسم باللغة العربية"
                />

                <br />
                <br />

                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<Save />}
                    type="submit" >
                    {strings.general.save}
                </Button>

            </form>
        </>
    )

}