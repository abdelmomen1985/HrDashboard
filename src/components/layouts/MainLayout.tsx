import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  useTheme,
} from "@material-ui/core/styles";
import AppDrawer from "./AppDrawer";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Header from './Header';

// Component Styles
import MainStyles from './styles/main-layout-styles';


interface Props extends RouteComponentProps {
  window?: () => Window;
  children: any;
}

function MainLayout(props: Props) {
  const {
    window,
    children,
    location: { pathname },
  } = props;
  
  const classes = MainStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Make the drawer automatically close on pathname change
  useEffect(() => {
    setMobileOpen(false )
  }, [pathname])


  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />

      {/* Navigation Header */}
      <Header handleDrawerToggle={handleDrawerToggle} />

      <nav className={classes.drawer} aria-label="drawer">

        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">

          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{ paper: classes.drawerPaper, }}
            ModalProps={{ keepMounted: true }}>
            <AppDrawer />

          </Drawer>
        </Hidden>

        <Hidden xsDown implementation="css">
          <Drawer
            classes={{ paper: classes.drawerPaper, }}
            variant="permanent"
            open>
            <AppDrawer />
          </Drawer>
        </Hidden>
        
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

export default withRouter(MainLayout);
