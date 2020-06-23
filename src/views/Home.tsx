import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DashboardPaper from "../components/ui/DashboardPaper";

// Images
import BranchesSVG from "../assets/branches.svg";
import InoutSVG from "../assets/inout.svg";
import EmployeesSVG from "../assets/employees.svg";
import VacationsSvg from "../assets/vacations.svg";
import DepartmentSvg from "../assets/departments.svg";
import TypesSvg from '../assets/agenda.svg'

// Localized Strings
import { strings } from "../localization";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
);

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <DashboardPaper
            svg={BranchesSVG}
            to={"branches"}
            text={strings.branches}
          />
        </Grid>

        <Grid item xs={6} sm={3}>
          <DashboardPaper
            svg={DepartmentSvg}
            to={"departments"}
            text={strings.departments}
          />
        </Grid>

        <Grid item xs={6} sm={3}>
          <DashboardPaper
            svg={EmployeesSVG}
            to={"employees"}
            text={strings.employees}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <DashboardPaper
            svg={InoutSVG}
            to={"/attendance"}
            text={strings.attendance}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <DashboardPaper
            svg={VacationsSvg}
            to={"/requests"}
            text={strings.employeeRequests}
          />
        </Grid>

        <Grid item xs={6} sm={3}>
          <DashboardPaper
            svg={TypesSvg}
            to={"/requests/types"}
            text={strings.requestTypes}
          />
        </Grid>

        {/* <Grid item xs={3}>
          <DashboardPaper svg={ConversationsSvg} to={""} text={"  "} />
        </Grid> */}
      </Grid>
    </div>
  );
}
