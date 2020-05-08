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
  nav: {
    textDecoration: "none",
  },
}));

function Navbar({ theme }) {
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
      style={path === "/" ? { marginTop: "20px" } : null}
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
              width={path === "/" ? 450 : 300}
            >
              <NavLink to="/" className={classes.nav}>
                <Typography
                  variant="h6"
                  className={path === "/" ? classes.homeTitel : classes.title}
                  style={path === "/" ? { color: "grey" } : null}
                >
                  Home
                </Typography>
              </NavLink>

              <NavLink to="/blog" className={classes.nav}>
                <Typography
                  variant="h6"
                  className={path === "/" ? classes.homeTitel : classes.title}
                  style={path === "/" ? { color: "grey" } : null}
                >
                  {blog}
                </Typography>
              </NavLink>
              <NavLink to="/projects" className={classes.nav}>
                <Typography
                  variant="h6"
                  className={path === "/" ? classes.homeTitel : classes.title}
                  style={path === "/" ? { color: "grey" } : null}
                >
                  Projects
                </Typography>
              </NavLink>
            </Box>
          </Toolbar>
        </AppBar>
        <ReactRouter />
      </ThemeProvider>
    </div>
  );
}

export default withRouter(Navbar);
