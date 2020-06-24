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
import Axios from "axios";

import { PostDepartment } from '../../queries/Departments';
import { strings } from '../../localization/localization';

interface NewDepartmentFormProps {
    handleSave: () => void;
};

export default function NewDepartmentForm({ handleSave }: NewDepartmentFormProps) {
    const constants = strings.departments;

    // HTTP Request
    const [mutate, { status: status, error: error }] = PostDepartment();

    const handleSubmit = useCallback(
        async (e: SyntheticEvent) => {
            e.preventDefault();

            const { arName, enName } = e.target as any;
            const payload = { ar_name: arName.value, en_name: enName.value };

            await mutate(payload)

            if (status === 'error') alert(error);
            else handleSave();

        }, [handleSave]
    );

    return (
        <>
            <form onSubmit={handleSubmit} style={{width: 300}}>

                {/* English Name Input */}
                <TextField
                    fullWidth
                    required
                    inputRef={(input) => input && input.focus()}
                    variant='outlined'
                    name="enName"
                    label={constants.departmentNameEn}
                />

                <br/>
                <br />
                
                {/* Arabic Name Input */}
                <TextField
                   fullWidth
                    required
                    inputRef={(input) => input && input.focus()}
                    variant='outlined'
                    name="arName"
                    label={constants.departmentNameAr}
                />

                <br />
                <br />

                <Button
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