import React from 'react';
import {
    InputLabel,
    Select,
    makeStyles,
    MenuItem,
    FormControl,
} from '@material-ui/core';

import { strings } from '../../localization/localization';

const useStyles = makeStyles(theme => ({
    employeeSelect: {
        width: 260,
        fontSize: 18
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}))

export default function EmployeesMenu(props: any) {
    const classes = useStyles();
    const employees = props.employees;
    const currentLanguage = localStorage.getItem('lang');
    const constants = strings.attendance;

    // Send the selected employee's ID to the parent component
    const onInputChange = (id: number, name: string) => {
        props.selectedEmployee(id, name);
    };

    return (
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="employee">{constants.employeeMenu}</InputLabel>
                <Select
                    className={classes.employeeSelect}
                    labelId="employee"
                    id="demo-simple-select-outlined"
                    defaultValue={0}
                    label={constants.employeeMenu}>
                    <MenuItem value={0}>
                        <em>None</em>
                    </MenuItem>
                    {employees.map((employee: any, index: number) => {
                        const name = currentLanguage === 'en' ? employee.en_name : employee.ar_name
                        return (
                        <MenuItem key={index} value={employee.id}
                         onClick={() => onInputChange(employee.id, name)}>{name}</MenuItem>
                    )})}
                </Select>
            </FormControl>
        
    )
}