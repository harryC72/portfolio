import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Hidden,
  Box,
  Link,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ReactRouter from "./ReactRouter";
import { theme1, theme2, theme3 } from "../theme";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbarHome: {
    background: "transparent",
    boxShadow: "none",
  },
  centerNavs: {
    display: "flex",
    justifyContent: "center",
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  titleHome: {
    flexGrow: 1,
    background: "transparent",
  },
  title: {
    flexGrow: 1,
    color: "white",
  },
}));

function Navbar({ theme, auth }) {
  const classes = useStyles();

  let path = window.location.pathname;
  let blog = "\xa0\xa0Blog";

  const getTheme = () => {
    if (path === "/blog") {
      return theme1;
    }

    if (path === "/projects") {
      return theme2;
    }

    if (path === "/register" || path === "/login") {
      return theme3;
    }

    if (path === "/") {
      return theme3;
    }
  };

  return (
    <div
      className={classes.root}
      // style={path === "/" ? { marginTop: "20px" } : null}
    >
      <ThemeProvider theme={getTheme()}>
        <AppBar
          elevation={0}
          position="static"
          className={path === "/" ? classes.appbarHome : ""}
        >
          <Toolbar className={classes.centerNavs}>
            <Hidden smUp>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Box
              display="flex"
              justifyContent="space-between"
              flexDirection="row"
              width={path === "/" && auth ? 450 : 300}
            >
              <Link
                exact
                to="/"
                className={path === "/" ? classes.homeTitel : classes.title}
                activeClassName="special"
                component={NavLink}
                variant="h6"
              >
                Home
              </Link>
              {auth ? (
                <Link
                  to="/blog"
                  className={path === "/" ? classes.homeTitel : classes.title}
                  activeClassName="special"
                  component={NavLink}
                  variant="h6"
                >
                  {blog}
                </Link>
              ) : null}
              <Link
                to="/projects"
                className={path === "/" ? classes.homeTitel : classes.title}
                activeClassName="special"
                component={NavLink}
                variant="h6"
              >
                Projects
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
        <ReactRouter />
      </ThemeProvider>
    </div>
  );
}

export default withRouter(Navbar);
