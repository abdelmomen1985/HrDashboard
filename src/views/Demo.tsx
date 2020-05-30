import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { teal } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "2em",
  },
  singlePost: {
    margin: ".5em",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: teal[500],
    fontWeight: "bold",
  },
}));

export default function Demo() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input type="checkbox" name="vehicle1" checked={false} />
      Switcho
      <br />
      <Typography
        variant="h2"
        color="primary"
        className="App text-center"
        style={{ backgroundColor: "gray" }}
        onClick={async (_) => {
          console.log("data");
        }}
      >
        OK
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
