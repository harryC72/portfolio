import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Blog from "./Blog";
import Projects from "./Projects";
import BlogUpdate from "./BlogUpdate";
import BlogInput from "./BlogInput";
import Register from "./auth/Register";
import { ConnectedLogin } from "./auth/Login";
import PageNotFound from "./PageNotFoundPage";
import ProjectInput from "./ProjectInput";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { login } from "../flux/actions/authActions";
import PrivateRoute from "./PrivateRoute";

const ReactRouter2 = ({ isAuthenticated }) => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/blog">
          <Blog />
        </Route>
        <Route path="/projects">
          <Projects />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <ConnectedLogin />
        </Route>
        <PrivateRoute path="/addproject" isAuth={isAuthenticated}>
          <ProjectInput />
        </PrivateRoute>
        <PrivateRoute path="/addblogpost" isAuth={isAuthenticated}>
          <BlogInput />
        </PrivateRoute>
        <PrivateRoute path="/updateBlogPost/:id" isAuth={isAuthenticated}>
          <BlogUpdate />
        </PrivateRoute>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps)(ReactRouter2);
