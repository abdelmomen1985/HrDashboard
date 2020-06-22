import React, { useEffect, useState } from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { strings } from '../../localization';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },

    },
  }),
)(TableRow);

function createRow(name: string, arrivals: Array<any>, exits: Array<any>) {
  return { name, arrivals, exits };
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 500,
    },

    container: {
      maxWidth: 800
    }

  }))

export default function AttendanceTable(props: any) {
  const classes = useStyles();
  const [tableRows, setTableRows] = useState([] as any);
  const tableStrings = strings.table;

  useEffect(() => {
    const date = new Date();
    const currentDay = date.getDate();
    const selectedMonth = props.selectedMonth.id;
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    const daysInSelectedMonth = new Date(currentYear, selectedMonth, 0).getDate();

    const rows = [];

    // Filter attendance data to display only the ones within current month
    const monthData = props.data.filter((item: any) => new Date(item.day).getMonth() + 1 === selectedMonth)

    // Set the limit to the number of rows according to the number of days
    const rowsLimit = selectedMonth === currentMonth ? currentDay : daysInSelectedMonth

    for(var i = 1; i <= rowsLimit; i++){

      // Get all attendance data recorded in current index day
      const dayData = monthData.filter((item: any) => new Date(item.day).getDate() === i);

      // Arrivals & Exits dates
      const arrivals = dayData.filter((item: any) => item.push === 0);
      const exits = dayData.filter((item: any) => item.push === 1);

      rows.push(createRow(`${i}/${selectedMonth}/${currentYear}`, arrivals , exits));
    };

    rows.reverse()
    setTableRows(rows);
  }, [props.data, props.selectedMonth])


  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>{tableStrings.day}</StyledTableCell>
            <StyledTableCell align="right">{tableStrings.arrival}</StyledTableCell>
            <StyledTableCell align="right">{tableStrings.exit}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows.map((row: any) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.arrivals.length === 0 ? "N/A" : row.arrivals.map((item: any) => (<>{item.time} <br/></>))}</StyledTableCell>
              <StyledTableCell align="right">{row.exits.length === 0 ? "N/A" : row.exits.map((item: any) => (<>{item.time} <br/></>))}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}