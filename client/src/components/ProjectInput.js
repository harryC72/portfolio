import React, { useState, useEffect, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core/";
import { Alert, AlertTitle } from "@material-ui/lab";
import { connect } from "react-redux";
import { getTechnologies } from "../flux/actions/technologyActions";
import { addProject } from "../flux/actions/projectActions";
import TechDropDown from "./TechDropDown";

const styles = {
  root: {
    "& .MuiTextField-root": {
      margin: "20px 0 20px 0",
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  green: {
    color: "green",
  },
};

function ProjectInput({ classes, getTechnologies, technology, addProject }) {
  const [msg, setMsg] = useState(null);
  const [errors, setErrors] = useState({});
  const [tech, setTech] = useState([]);

  const [project, setProject] = useState({
    title: "",
    bodyText: "",
    url: "",
    projectImage: "",
  });

  useEffect(() => {
    async function getData() {
      await getTechnologies();
    }
    getData();
  }, [getTechnologies]);

  const didMountRef = React.useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      setTech(technologies);
    } else didMountRef.current = true;
  });

  let { technologies } = technology;
  console.log("TECHNO", tech);

  const formIsValid = () => {
    const errors = {};
    console.log("PROJECT IN FORM IS VALID", project);
    if (!project.title) errors.title = "Title is required";
    if (!project.bodyText) errors.bodyText = "Body text is required";
    if (!project.url) errors.url = "Url is required";
    if (!project.projectImage) errors.projectImage = "Image is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleChange = (event) => {
    event.persist();
    console.log("E", event.target.value.name);
    const { name, value } = event.target;
    setProject((prevItem) => ({
      ...prevItem,
      [name]: name === "projectId" ? parseInt(value, 10) : value,
    }));
    console.log("PROJECT IN HANDLE CHANGE", project);
  };

  const handleSelectChange = (name) => (event, value) => {
    event.persist();
    console.log("VALUE PROJECTINPUT", name + value.name);
    let techName = name + "Name";
    let techImage = name + "Image";
    let techType = name + "Type";
    console.log("TECH", techName);

    setProject((prevItem) => ({
      ...prevItem,
      [techName]: value.name,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formIsValid()) return;
    console.log("PROJECT IN PROJECT INPUT", project);
    addProject(project)
      .then(() => {
        setProject({
          title: "",
          bodyText: "",
          url: "",
          projectImage: "",
        });
      })
      .catch((err) => {
        setMsg(err.message);
      });
  };

  return (
    <Fragment>
      {msg ? (
        <Alert severity="error" onClose={() => setMsg(null)}>
          <AlertTitle>Error</AlertTitle>
          {msg}
        </Alert>
      ) : null}
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            style={{ width: 200 }}
            id="outlined-basic"
            label="Project title"
            variant="outlined"
            name="title"
            value={project.title}
            error={errors.title ? true : false}
            helperText={errors.title === "" ? " " : errors.title}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <TextField
            style={{ width: 200 }}
            id="outlined-multiline-static"
            label="Project body"
            multiline
            rows="4"
            variant="outlined"
            name="bodyText"
            value={project.bodyText}
            error={errors.bodyText ? true : false}
            helperText={errors.bodyText === "" ? " " : errors.bodyText}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <TextField
            style={{ width: 200 }}
            id="outlined-basic"
            label="Project url"
            variant="outlined"
            name="url"
            value={project.url}
            error={errors.url ? true : false}
            helperText={errors.url === "" ? " " : errors.url}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <TextField
            style={{ width: 200 }}
            id="outlined-basic"
            label="Project image"
            variant="outlined"
            name="projectImage"
            value={project.projectImage}
            error={errors.projectImage ? true : false}
            helperText={errors.projectImage === "" ? " " : errors.projectImage}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TechDropDown
            name="tech1"
            label="Front End Language"
            onChange={handleSelectChange("tech1")}
            options={tech}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TechDropDown
            name="tech2"
            label="Front End Framework"
            onChange={handleSelectChange("tech2")}
            options={tech}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TechDropDown
            name="tech3"
            label="Back End Language"
            onChange={handleSelectChange("tech2")}
            options={tech}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TechDropDown
            name="tech4"
            label="Back End Framework"
            onChange={handleSelectChange("tech2")}
            options={tech}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TechDropDown
            name="tech5"
            label="Back End Runtime"
            onChange={handleSelectChange("tech2")}
            options={tech}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TechDropDown
            name="tech6"
            label="Database Technology"
            onChange={handleSelectChange("tech2")}
            options={tech}
          />
        </div>
        <div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ width: 100 }}
          >
            Submit
          </Button>
        </div>
      </form>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    technology: state.technology,
  };
};
export default withStyles(styles)(
  connect(mapStateToProps, { getTechnologies, addProject })(ProjectInput)
);
