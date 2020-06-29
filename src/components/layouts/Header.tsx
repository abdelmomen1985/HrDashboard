import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { withRouter } from "react-router-dom";

// Component Styles
import HeaderStyles from "./styles/header-styles";

// Localization
import { setLanguage, strings } from "../../localization/localization";
import { AppCtxt } from "../../setup/Context";

// Navigation Bar Header
function Header(props: any) {
  const constants = strings.main;
  const classes = HeaderStyles();
  const pathname = props.location.pathname;
  const { currentLang } = React.useContext(AppCtxt);

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
        <Typography variant="h6" noWrap style={{ flexGrow: 1 }}>
          {pathname === "/branches" && constants.branches}
          {pathname === "/departments" && constants.departments}
          {pathname === "/employees" && constants.employees}
          {pathname === '/requests' && constants.employeeRequests}
          {pathname === '/requests/types' && constants.requestTypes}
        </Typography>

        <Button className={classes.button} onClick={() => props.history.push('/signin')}>{constants.signIn}</Button>
        <Button className={classes.button} onClick={() => setLanguage()}>
          {currentLang && currentLang === "en" && strings.general.ar}
          {currentLang && currentLang === "ar" && strings.general.en}
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(Header);
