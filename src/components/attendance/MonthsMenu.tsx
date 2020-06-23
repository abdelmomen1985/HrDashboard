import React, { useEffect } from 'react';
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
}));

const months = [
    {id: 1, name: "January"},
    {id: 2, name: "February"},
    {id: 3, name: "March"},
    {id: 4, name: "April"},
    {id: 5, name: "May"},
    {id: 6, name: "June"},
    {id: 7, name: "July"},
    {id: 8, name: "August"},
    {id: 9, name: "September"},
    {id: 10, name: "October"},
    {id: 11, name: "November"},
    {id: 12, name: "December"},
]

export default function MonthsMenu(props: any) {
    const classes = useStyles();
    const constants = strings.attendance;

    // Send the selected employee's ID to the parent component
    const onInputChange = (id: number, name: string) => {
        props.selectedMonth(id, name);
    };

    const currentMonth = new Date().getMonth() + 1

    // Send current month to parent on component load
    useEffect(() => {
        props.selectedMonth(currentMonth, months[currentMonth -1 ].name)
    }, [])

    return (
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="employee">{constants.monthMenu}</InputLabel>
                <Select
                    className={classes.employeeSelect}
                    labelId="employee"
                    id="demo-simple-select-outlined"
                    defaultValue={currentMonth}
                    label={constants.monthMenu}>
                    <MenuItem value={0}>
                        <em>None</em>
                    </MenuItem>
                    {months.map((month: any, index: number) => (
                        <MenuItem key={index} value={month.id}
                         onClick={() => onInputChange(month.id, month.name)}>{month.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        
    )
}