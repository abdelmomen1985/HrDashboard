import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DashboardPaper from "../components/ui/DashboardPaper";

// Images
import BranchesSVG from "../assets/branches.svg";
import InoutSVG from "../assets/inout.svg";
import EmployeesSVG from "../assets/employees.svg";
import VacationsSvg from "../assets/vacations.svg";
import ConversationsSvg from "../assets/conversations.svg";
import DepartmentSvg from '../assets/departments.svg';


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
        <Grid item xs={3}>
          <DashboardPaper svg={BranchesSVG} to={"branches"} text={"الفروع"} />
        </Grid>

        <Grid item xs={3}>
          <DashboardPaper svg={DepartmentSvg} to={"departments"} text={"الاقسام"} />
        </Grid>

        <Grid item xs={3}>
          <DashboardPaper
            svg={EmployeesSVG}
            to={"employees"}
            text={"ادارة الموظفين"}
          />
        </Grid>
        <Grid item xs={3}>
          <DashboardPaper svg={InoutSVG} to={""} text={"الحضور والانصراف"} />
        </Grid>
        <Grid item xs={3}>
          <DashboardPaper svg={VacationsSvg} to={""} text={" طلبات الاجازة"} />
        </Grid>
        <Grid item xs={3}>
          <DashboardPaper svg={ConversationsSvg} to={""} text={"  "} />
        </Grid>
      </Grid>
    </div>
  );
}
