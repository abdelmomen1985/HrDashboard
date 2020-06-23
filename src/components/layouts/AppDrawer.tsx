import React from "react";
import {
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
} from "@material-ui/core";
import {
  Inbox,
  Person,
  LocationOn,
  Home,
  MeetingRoom,
  MergeType
} from "@material-ui/icons";
import Department from "@material-ui/icons/BusinessCenter";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

// Component Styles
import DrawerStyles from "./styles/drawer-styles";

// Localized Strings
import { strings } from "../../localization/localization";

interface DrawerItemProps {
  children: React.ReactNode;
  title: string;
  link: string;
  pathname: string;
}

const DrawerItem = (props: DrawerItemProps) => {
  const classes = DrawerStyles();
 

  return (
    <MenuItem
      button
      component={Link}
      to={props.link}
      selected={`${props.link}` === props.pathname}
    >
      <ListItemIcon>{props.children}</ListItemIcon>
      <ListItemText
        disableTypography
        primary={<Typography>{props.title}</Typography>}
      />
    </MenuItem>
  );
};

function AppDrawer({ location: { pathname } }: RouteComponentProps) {
  const classes = DrawerStyles();
  const constants = strings.main;
  
  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <MenuList>

        <DrawerItem link={"/"} title={constants.home} pathname={pathname}>
          <Home />
        </DrawerItem>

        <DrawerItem
          link={"/branches"}
          title={constants.branches}
          pathname={pathname}>
          <LocationOn />
        </DrawerItem>

        <DrawerItem
          link={"/departments"}
          title={constants.departments}
          pathname={pathname}>
          <Department />
        </DrawerItem>

        <DrawerItem
          link={"/employees"}
          title={constants.employees}
          pathname={pathname}>
          <Person />
        </DrawerItem>

        <DrawerItem
          link={"/attendance"}
          title={constants.attendance}
          pathname={pathname}>
          <MeetingRoom />
        </DrawerItem>

        <DrawerItem
          link={"/requests"}
          title={constants.employeeRequests}
          pathname={pathname}>
          <Inbox />
        </DrawerItem>

        
        <DrawerItem
          link={"/requests/types"}
          title={constants.requestTypes}
          pathname={pathname}>
          <MergeType />
        </DrawerItem>

      </MenuList>
      <Divider />
    </div>
  );
}

export default withRouter(AppDrawer);
