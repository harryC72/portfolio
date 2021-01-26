import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from './Spinner';

const ProtectedRoute = ({ component: Component, auth, ...rest }) => {
  console.log('PROTECTED', auth);

  return (
    <>
      {auth.isLoading && auth.isAuthenticated === null ? (
        <Spinner />
      ) : (
        <Route
          {...rest}
          render={(props) =>
            auth.isAuthenticated ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: props.location },
                }}
              />
            )
          }
        />
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default withRouter(connect(mapStateToProps, null)(ProtectedRoute));
