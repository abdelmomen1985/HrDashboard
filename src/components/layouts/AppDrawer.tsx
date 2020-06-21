import React from "react";
import {
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
} from "@material-ui/core";
import { Inbox, Mail, Person, LocationOn, Home } from "@material-ui/icons";
import Department from '@material-ui/icons/BusinessCenter';
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

// Component Styles
import DrawerStyles from './styles/drawer-styles';


interface DrawerItemProps {
  children: React.ReactNode;
  title: string,
  link: string,
  pathname: string
}

const DrawerItem = (props: DrawerItemProps) => {
  const classes = DrawerStyles();

  return (
    <MenuItem
    button
    component={Link}
    to={props.link}
    selected={`/${props.link}` === props.pathname}
  >
    <ListItemIcon>
      {props.children}
    </ListItemIcon>
    <ListItemText
      disableTypography
      primary={<Typography className={classes.listText}>{props.title}</Typography>}
    />
  </MenuItem>
  )
}

function AppDrawer({ location: { pathname } }: RouteComponentProps) {
  const classes = DrawerStyles();

  console.log(pathname);
  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <MenuList>

        <DrawerItem link={"/"} title={"الرئيسية"} pathname={pathname}><Home /></DrawerItem>
        <DrawerItem link={"/branches"} title={"الفروع"} pathname={pathname}><LocationOn /></DrawerItem>
        <DrawerItem link={"/departments"} title ={"الاقسام"} pathname={pathname}><Department /></DrawerItem>
        <DrawerItem link={"/employees"} title={"الموظفين"} pathname={pathname}><Person /></DrawerItem>
        <DrawerItem link={"/requests"} title={"طلبات الاجازة"} pathname={pathname}><Inbox /></DrawerItem>

      </MenuList>
      <Divider />
    </div>
  );
}

export default withRouter(AppDrawer);
