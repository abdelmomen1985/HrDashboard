import React, { useCallback, SyntheticEvent, useRef, useState } from "react";
import {
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
    Button,
    Box,
    Select,
    MenuItem,
    LinearProgress,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import { Save } from "@material-ui/icons";

import { PostType } from '../../queries/RequestTypes';
import { GetDepartments } from '../../queries/Departments';
import { strings } from '../../localization';

interface NewTypeFormProps {
    handleSave: () => void;
};

const useStyles = makeStyles(theme => ({
    field: {
        width: 270,
    },
    formControl: {
        minWidth: 270,
    },
}))

export default function NewTypeForm({ handleSave }: NewTypeFormProps) {
    const [error, setError] = useState<any>();

    const currentLanguage = localStorage.getItem('lang');
    const classes = useStyles();

    const arName = useRef<HTMLInputElement>(null);
    const enName = useRef<HTMLInputElement>(null);
    const arDescription = useRef<HTMLInputElement>(null);
    const enDescription = useRef<HTMLInputElement>(null);
    const department = useRef<HTMLInputElement>(null);


    // HTTP Requests
    const { status: getStatus, data: departments, error: getError } = GetDepartments();
    const [mutate, { status: mutationStatus, error: mutationError }] = PostType();


    const handleSubmit = useCallback(
        async (e: SyntheticEvent) => {
            e.preventDefault();

            // Input Values
            const arTypeName = arName.current && arName.current.value;
            const enTypeName = enName.current && enName.current.value;
            const arTypeDescription = arDescription.current && arDescription.current.value;
            const enTypeDescription = enDescription.current && enDescription.current.value;
            const depId = department.current && department.current.value;

            // Handle no department selection error
            if (!depId || depId === "0") return setError(strings.departmentError);
            else setError(null)

            // Request payload
            const payload = {
                ar_name: arTypeName,
                en_name: enTypeName,
                to_dep_id: depId,
                ar_description: arTypeDescription,
                en_description: enTypeDescription
            };

            await mutate(payload)

            if (mutationError) return setError(mutationError.message);
            else handleSave();

        }, [handleSave]
    );

    // Loading spinner
    if (getStatus === 'loading') return <LinearProgress color="secondary" />

    return (
        <>
            <form onSubmit={handleSubmit}>

                {/* English Name Form */}

                <TextField
                    required
                    className={classes.field}
                    variant="outlined"
                    inputRef={enName}
                    id="my-input"
                    label="Name in English"
                    name="name"
                    aria-describedby="my-helper-text"
                />
                <FormHelperText id="my-helper-text">{strings.typeNameEn}</FormHelperText>

                <br />

                {/* Arabic Name Form */}

                <TextField
                    required
                    className={classes.field}
                    variant="outlined"
                    inputRef={arName}
                    id="my-input"
                    label='الاسم باللغة العربية'
                    name="name"
                    aria-describedby="my-helper-text"
                />
                <FormHelperText id="my-helper-text">{strings.typeNameAr}</FormHelperText>

                <br />

                {/* English Description Form */}

                <TextField
                    multiline
                    rows={2}
                    rowsMax={6}
                    className={classes.field}
                    variant="outlined"
                    inputRef={enDescription}
                    id="my-input"
                    label='Description in English'
                    name="name"
                    aria-describedby="my-helper-text"
                />
                <FormHelperText id="my-helper-text">{strings.typeDescriptionEn}</FormHelperText>
                <br />

                {/* Arabic Description Form */}

                <TextField
                    multiline
                    rows={2}
                    rowsMax={6}
                    className={classes.field}
                    variant="outlined"
                    inputRef={arDescription}
                    id="my-input"
                    label='الوصف باللغة العربية'
                    name="name"
                    aria-describedby="my-helper-text"
                />
                <FormHelperText id="my-helper-text">{strings.typeDescrptionAr}</FormHelperText>

                <br />

                {/* Department Select */}
                <FormControl variant="outlined" required={true} className={classes.formControl}>
                    <InputLabel id="department">{strings.departmentName}</InputLabel>
                    <Select
                        className={classes.field}
                        labelId="department"
                        defaultValue={0}
                        inputRef={department}
                        label={strings.departmentName}>
                        <MenuItem value={0}> <em>None</em>  </MenuItem>
                        {departments.map((department: any, index: number) => {
                            const name = currentLanguage === 'en' && department.en_name ? department.en_name : department.ar_name
                            return (
                                <MenuItem key={index} value={department.id}>{name}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>

                {/* Error Message */}
                <Typography color="error">{error}</Typography>

                {/* Submit Button */}
                <Box m={4}>
                    <Button
                        fullWidth
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