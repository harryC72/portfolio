import React, { useEffect, Fragment } from "react";
import { Box } from "@material-ui/core/";
import ProjectInput from "./ProjectInput";
import Project from "./Project";
import { getProjects, deleteProject } from "../flux/actions/projectActions";
import { connect } from "react-redux";

function Projects(props) {
  const { getProjects, project, deleteProject, auth } = props;
  const { isAuthenticated } = auth;

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  let { projects } = project;

  return (
    <Fragment>
      <ProjectInput />
      {projects.map(
        ({ title, _id, bodyText, url, projectImage, icon1, icon2, icon3 }) => {
          return (
            <Project
              key={_id}
              projectTitle={title}
              projectBody={bodyText}
              url={url}
              projectImage={projectImage}
              icon1={icon1}
              icon2={icon2}
              icon3={icon3}
              deleteProject={deleteProject}
              deleteId={_id}
              isAuth={isAuthenticated}
            />
          );
        }
      )}
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  console.log("STATE", state.project);
  return {
    project: state.project,
    auth: state.auth,
  };
};
export default connect(mapStateToProps, { getProjects, deleteProject })(
  Projects
);
