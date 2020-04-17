import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Blog from "./Blog";
import Projects from "./Projects";
import BlogUpdate from "./BlogUpdate";
import Register from "./auth/Register";
import { ConnectedLogin } from "./auth/Login";
import PageNotFound from "./PageNotFoundPage";

const ReactRouter = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/blog" component={Blog} />
        <Route path="/projects" component={Projects} />
        <Route path="/updateBlogPost/:id" component={BlogUpdate} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={ConnectedLogin} />
        <Route component={PageNotFound} />
      </Switch>
    </Fragment>
  );
};
export default ReactRouter;
