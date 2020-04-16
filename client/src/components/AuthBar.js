import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { ConnectedLogout } from "../components/auth/Logout";
import { connect } from "react-redux";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Hidden,
  Box,
} from "@material-ui/core";

const styles = {
  appBar: {
    top: "auto",
    bottom: 0,
  },
};

const AuthBar = ({ classes, auth }) => {
  const { isAuthenticated } = auth;

  return isAuthenticated ? (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <ConnectedLogout>
        <Typography variant="h6" style={{ color: "red" }}>
          Logout
        </Typography>
      </ConnectedLogout>
    </AppBar>
  ) : null;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default withStyles(styles)(connect(mapStateToProps, {})(AuthBar));
