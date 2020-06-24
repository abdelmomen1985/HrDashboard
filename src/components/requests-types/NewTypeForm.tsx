import React, { useCallback, SyntheticEvent, useState } from "react";
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
import { strings } from '../../localization/localization';

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
    const [error, setError] = useState<string>();
    const constants = strings.requestTypes;

    const currentLanguage = localStorage.getItem('lang');
    const classes = useStyles();

    // HTTP Requests
    const { status: getStatus, data: departments, error: getError } = GetDepartments();
    const [mutate, { status: mutationStatus, error: mutationError }] = PostType();


    const handleSubmit = useCallback(
        async (e: SyntheticEvent) => {
            e.preventDefault();

            const {arName, enName, arDescription, enDescription, department } = e.target as any;

            // Handle no department selection error
            if (!department.value || department.value === "0") return setError(constants.departmentError);
            else setError("")

            // Request payload
            const payload = {
                ar_name: arName.value,
                en_name: enName.value,
                to_dep_id: department.value,
                ar_description: arDescription.value,
                en_description: enDescription.value
            };

            console.log(payload);

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
                    label="Name in English"
                    name="enName"
                    aria-describedby="my-helper-text"
                />
                <FormHelperText id="my-helper-text">{constants.typeNameEn}</FormHelperText>

                <br />

                {/* Arabic Name Form */}

                <TextField
                    required
                    className={classes.field}
                    variant="outlined"
                    label='الاسم باللغة العربية'
                    name="arName"
                    aria-describedby="my-helper-text"
                />
                <FormHelperText id="my-helper-text">{constants.typeNameAr}</FormHelperText>

                <br />

                {/* English Description Form */}

                <TextField
                    multiline
                    rows={2}
                    rowsMax={6}
                    className={classes.field}
                    variant="outlined"
                    label='Description in English'
                    name="enDescription"
                    aria-describedby="my-helper-text"
                />
                <FormHelperText id="my-helper-text">{constants.typeDescriptionEn}</FormHelperText>
                <br />

                {/* Arabic Description Form */}

                <TextField
                    multiline
                    rows={2}
                    rowsMax={6}
                    className={classes.field}
                    variant="outlined"
                    label='الوصف باللغة العربية'
                    name="arDescription"
                    aria-describedby="my-helper-text"
                />
                <FormHelperText id="my-helper-text">{constants.typeDescrptionAr}</FormHelperText>

                <br />

                {/* Department Select */}
                <FormControl variant="outlined" required={true} className={classes.formControl}>
                    <InputLabel id="department">{strings.departments.departmentName}</InputLabel>
                    <Select
                        className={classes.field}
                        labelId="department"
                        defaultValue={0}
                        name='department'
                        label={strings.departments.departmentName}>
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
                        {strings.general.save}
                    </Button>
                </Box>
            </form>
        </>
    )

}