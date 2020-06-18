import React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
} from "@material-ui/core";
import { Inbox, Mail, Person, LocationOn, Home } from "@material-ui/icons";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    listText: {
      fontFamily: "ElMessiri",
    },
  })
);

function AppDrawer({ location: { pathname } }: RouteComponentProps) {
  const classes = useStyles();
  console.log(pathname);
  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <MenuList>

        <MenuItem button component={Link} to="" selected={"/" === pathname}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography className={classes.listText}> الرئيسية</Typography>
            }
          />
        </MenuItem>

        <MenuItem
          button
          component={Link}
          to="branches"
          selected={"/branches" === pathname}
        >
          <ListItemIcon>
            <LocationOn />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography className={classes.listText}> الفروع</Typography>
            }
          />
        </MenuItem>


        <MenuItem
          button
          component={Link}
          to="departments"
          selected={"/departments" === pathname}
        >
          <ListItemIcon>
            <LocationOn />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography className={classes.listText}> الاقسام</Typography>
            }
          />
        </MenuItem>

        <MenuItem
          button
          component={Link}
          to="employees"
          selected={"/employees" === pathname}
        >
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography className={classes.listText}> الموظفين</Typography>
            }
          />
        </MenuItem>

        <Divider />
        <MenuItem
          button
          component={Link}
          to="requests"
          selected={"/requests" === pathname}
        >
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography className={classes.listText}>
                {" "}
                طلبات الاجازة
              </Typography>
            }
          />
        </MenuItem>
      </MenuList>
      <Divider />
    </div>
  );
}

export default withRouter(AppDrawer);
