import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "./Spinner";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isLoading } = rest;

  if (isAuthenticated === undefined || isLoading) {
    return <Spinner />;
  } else {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated && !isLoading ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
  }
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
  };
}

export default withRouter(
  connect(mapStateToProps, null, null, { pure: false })(ProtectedRoute)
);
