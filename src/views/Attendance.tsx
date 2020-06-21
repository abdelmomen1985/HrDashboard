import React, { useState, useEffect } from 'react';
import {
    makeStyles,
    Container,
    LinearProgress,
    Typography,
    Grid
} from '@material-ui/core';

// UI Components
import EmployeesMenu from '../components/attendance/EmployeesMenu';
import MonthsMenu from '../components/attendance/MonthsMenu';
import AttendanceTable from '../components/attendance/AttendanceTable'

// HTTP Requests
import { GetEmployees, GetAttendance } from '../queries/Employees';

const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        marginTop: 26,
        marginBottom: 26
    }
}))

export default function Attendance() {
    const classes = useStyles();

    const [selected, setSelected] = useState<any>({})
    const [selectedMonth, setSelectedMonth] = useState<any>({})

    // Get all employees
    const { status: employeesStatus, data: employees, error: employeesError } = GetEmployees();
    const { status: attendanceStatus, data: attendance, error: attendanceError, refetch } = GetAttendance(selected.id);

    const getEmployeeData = (id: number, name: string) => {
        const employee = { id, name }
        setSelected(employee);
        refetch();
    }

    const getSelectedMonth = (id: number, name: string) => {
        setSelectedMonth({id, name});
    }

    console.log(attendance)

    if (employeesStatus === 'loading') return <LinearProgress color="secondary" />

    return (
        <>
            {attendanceStatus === 'loading' && <LinearProgress color='secondary' />}
            <Container component="main">
                <div className={classes.paper}>

                    {/* Page Title */}
                    <Typography variant="h4" align="center" className={classes.title}>جدول الحضور و الانصراف</Typography>

                    {/* Select Employee Dropdown Menu */}
                    <EmployeesMenu employees={employees} selectedEmployee={getEmployeeData} />

                    {/* Select Month Dropdown Menu */}
                    <MonthsMenu selectedMonth={getSelectedMonth} />

                    {/* Selected Employee Name */}
                    <Typography variant="h5" align="center" className={classes.title}>{selected.name}</Typography>

                    {/* Attendance Table */}
                    {attendance !== undefined && attendance.length > 0 ? <AttendanceTable data={attendance} selectedMonth={selectedMonth} /> : "No Attendance data found"}

                </div>
            </Container>
        </>
    )
};