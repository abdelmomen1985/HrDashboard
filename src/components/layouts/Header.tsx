import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Menu, MenuItem } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";

// Component Styles
import HeaderStyles from './styles/header-styles';

// Localization
import { setLanguage, strings } from '../../localization';


// Navigation Bar Header
function Header(props: any) {
  const classes = HeaderStyles();
  const pathname = props.location.pathname

  return (
    <AppBar position="fixed" className={classes.appBar}>
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={props.handleDrawerToggle}
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        variant="h6"
        noWrap
        style={{ flexGrow: 1}}>
        {pathname && pathname === "/branches" && strings.branches}
        {pathname && pathname === "/departments" && strings.departments}
        {pathname && pathname === "/employees" && strings.employees}
      </Typography>

      <Button className={classes.button}>{strings.signIn}</Button>
      <Button className={classes.button} onClick={() => setLanguage()}>
        {strings.language}
      </Button>
    </Toolbar>
  </AppBar>
  );
}

export default withRouter(Header);