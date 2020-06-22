import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    link: {
      textDecoration: "none",
    },
    typo: {
      // fontFamily: "ElMessiri ",
      marginTop: 10
    },
  })
);

interface DashboardPaperProps {
  svg: any;
  to: string;
  text: string;
}

export default function DashboardPaper({ svg, to, text }: DashboardPaperProps) {
  const classes = useStyles();
  const [elevation, setElevation] = useState(1);
  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);

  useEffect(() => {
    if (hovered) setElevation(4);
    else setElevation(1);
  }, [hovered]);

  return (
    <>
      <Link to={to} className={classes.link}>
        <Paper
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
          className={classes.paper}
          elevation={elevation}
        >
          <img src={svg} alt="" style={{ maxWidth: hovered ? "66%" : "65%" }} />
          <div>
            <Typography
              className={` ${hovered ? "hovered-dashtext" : ""} ${classes.typo}`}>
              {text}
            </Typography>
          </div>
        </Paper>
      </Link>
    </>
  );
}
