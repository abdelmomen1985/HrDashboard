import React from 'react';
import {
    InputLabel,
    Select,
    makeStyles,
    MenuItem,
    Container,
    FormControl,
   
} from '@material-ui/core';



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

    // Send the selected employee's ID to the parent component
    const onInputChange = (id: number, name: string) => {
        props.selectedEmployee(id, name);
    };

    return (
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="employee">اختر اسم الموظف</InputLabel>
                <Select
                    className={classes.employeeSelect}
                    labelId="employee"
                    id="demo-simple-select-outlined"
                    defaultValue={0}
                    label="اختر اسم الموظف">
                    <MenuItem value={0}>
                        <em>None</em>
                    </MenuItem>
                    {employees.map((employee: any, index: number) => (
                        <MenuItem key={index} value={employee.id}
                         onClick={() => onInputChange(employee.id, employee.ar_name)}>{employee.ar_name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        
    )
}