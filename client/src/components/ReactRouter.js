import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Blog from "./Blog";
import Projects from "./Projects";
import BlogUpdate from "./BlogUpdate";

const ReactRouter = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/blog" component={Blog} />
        <Route path="/projects" component={Projects} />
        <Route path="/updateBlogPost/:id" component={BlogUpdate} />
      </Switch>
    </Fragment>
  );
};
export default ReactRouter;
