import { makeStyles, Theme, createStyles } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
      color: "#fff",
    },
    button: {
      color: "#fff",
      justifyContent: "flex-end",
      fontWeight: "bold",
    },
  })
);

export default useStyles;