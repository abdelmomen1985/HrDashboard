import React, { useCallback, SyntheticEvent, useState } from "react";
import {
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
    Button,
    Box,
} from "@material-ui/core";
import { Save } from "@material-ui/icons";
import Axios from "axios";

import { PostDepartment } from '../../queries/Departments';
import { strings } from '../../localization'; 

interface NewDepartmentFormProps {
    handleSave: () => void;
};

export default function NewDepartmentForm({ handleSave }: NewDepartmentFormProps) {

    // HTTP Request
    const [mutate, {status: status, error: error}] = PostDepartment();

    const handleSubmit = useCallback(
        async (e: SyntheticEvent) => {
            e.preventDefault();

            const { name } = e.target as any;
            const payload = { ar_name: name.value };

            await mutate(payload)

            if (status === 'error') alert(error);
            else handleSave();

        }, [handleSave]
    );

    return (
        <>
            <form onSubmit={handleSubmit}>
                <FormControl required={true}>
                    <InputLabel htmlFor='my-input'>{strings.name}</InputLabel>
                    <Input
                        inputRef={(input) => input && input.focus()}
                        id="my-input"
                        name="name"
                        aria-describedby="my-helper-text"
                    />
                    <FormHelperText id="my-helper-text">{strings.departmentName}</FormHelperText>
                </FormControl>

                <Box m={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Save />}
                        type="submit" >
                        {strings.save}
                    </Button>
                </Box>
            </form>
        </>
    )

}