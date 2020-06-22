import React from "react";
import {
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
} from "@material-ui/core";
import { Inbox, Mail, Person, LocationOn, Home, MeetingRoom } from "@material-ui/icons";
import Department from '@material-ui/icons/BusinessCenter';
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

// Component Styles
import DrawerStyles from './styles/drawer-styles';

// Localized Strings
import {strings} from '../../localization';


interface DrawerItemProps {
  children: React.ReactNode;
  title: string,
  link: string,
  pathname: string
}

const DrawerItem = (props: DrawerItemProps) => {
  const classes = DrawerStyles();

  console.log(props.link);
  console.log(props.pathname)

  return (
    <MenuItem
    button
    component={Link}
    to={props.link}
    selected={`${props.link}` === props.pathname}
  >
    <ListItemIcon>
      {props.children}
    </ListItemIcon>
    <ListItemText
      disableTypography
      primary={<Typography>{props.title}</Typography>}
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

        <DrawerItem link={"/"} title={strings.home} pathname={pathname}><Home /></DrawerItem>
        <DrawerItem link={"/branches"} title={strings.branches} pathname={pathname}><LocationOn /></DrawerItem>
        <DrawerItem link={"/departments"} title ={strings.departments} pathname={pathname}><Department /></DrawerItem>
        <DrawerItem link={"/employees"} title={strings.employees} pathname={pathname}><Person /></DrawerItem>
        <DrawerItem link={"/attendance"} title={strings.attendance} pathname={pathname}><MeetingRoom /></DrawerItem>
        <DrawerItem link={"/requests"} title={strings.leaveRequests} pathname={pathname}><Inbox /></DrawerItem>

      </MenuList>
      <Divider />
    </div>
  );
}

export default withRouter(AppDrawer);
