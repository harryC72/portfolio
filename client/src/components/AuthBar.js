import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Logout from "../components/auth/Logout";
import { connect } from "react-redux";

import { Button, Typography, Hidden, Box } from "@material-ui/core";

const styles = {
  button: {
    // marginLeft: "30px",
    position: "fixed",
    left: "30px",
    bottom: "30px",
  },
};

const AuthBar = ({ classes, auth }) => {
  const { isAuthenticated } = auth;

  return isAuthenticated ? (
    // <Box display="flex" justifyContent="spaceBetween">
    <Button
      variant="contained"
      position="sticky"
      color="primary"
      className={classes.button}
    >
      <Logout>
        <Typography variant="h6" style={{ color: "white" }}>
          Logout
        </Typography>
      </Logout>
    </Button>
  ) : // </Box>
  null;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default withStyles(styles)(connect(mapStateToProps, {})(AuthBar));
