import React, { useState, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core/";
import { Alert, AlertTitle } from "@material-ui/lab";
import { connect } from "react-redux";
import { addProject } from "../flux/actions/projectActions";

const styles = {
  root: {
    "& .MuiTextField-root": {
      margin: "20px 0 20px 0",
    },
  },
  green: {
    color: "green",
  },
};

function ProjectInput({ classes, addProject }) {
  const [msg, setMsg] = useState(null);
  const [errors, setErrors] = useState({});

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [url, setUrl] = useState("");
  const [projectImage, setProjectImage] = useState("");
  const [icon1, setIcon1] = useState("");
  const [icon2, setIcon2] = useState("");
  const [icon3, setIcon3] = useState("");
  const [icon4, setIcon4] = useState("");

  const formIsValid = () => {
    const errors = {};

    if (!title) errors.projectTitle = "Title is required";
    if (!body) errors.projectBody = "Body text is required";
    if (!url) errors.projectUrl = "Url is required";
    if (!projectImage) errors.projectImage = "Image is required";

    setErrors(errors);
    console.log("ERRORS", errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      title,
      body,
      url,
      projectImage,
      icon1,
      icon2,
      icon3,
      icon4,
    };
    console.log("NewProject", newProject);
    if (!formIsValid()) return;
    addProject(newProject)
      .then(() => {
        console.log("I WAS HERE");
        setTitle("");
        setBody("");
        setUrl("");
        setProjectImage("");
        setIcon1("");
        setIcon2("");
        setIcon3("");
        setIcon4("");
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
            id="outlined-basic"
            label="Project title"
            variant="outlined"
            name="ProjectTitle"
            value={title}
            error={errors.projectTitle ? true : false}
            helperText={errors.projectTitle === "" ? " " : errors.projectTitle}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="outlined-multiline-static"
            label="Project body"
            multiline
            rows="4"
            variant="outlined"
            name="ProjectBody"
            value={body}
            error={errors.projectBody ? true : false}
            helperText={errors.projectBody === "" ? " " : errors.projectBody}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Project url"
            variant="outlined"
            name="ProjectUrl"
            value={url}
            error={errors.projectUrl ? true : false}
            helperText={errors.projectUrl === "" ? " " : errors.projectUrl}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Project image"
            variant="outlined"
            name="ProjectImage"
            value={projectImage}
            error={errors.projectImage ? true : false}
            helperText={errors.projectImage === "" ? " " : errors.projectImage}
            onChange={(e) => setProjectImage(e.target.value)}
          />
        </div>

        <div>
          <TextField
            id="outlined-basic"
            label="Icon 1"
            variant="outlined"
            name="Icon1"
            value={icon1}
            helperText={
              Object.keys(errors).length === 0 ? " " : "Icon is optional"
            }
            onChange={(e) => setIcon1(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Icon 2"
            variant="outlined"
            name="Icon2"
            value={icon2}
            helperText={
              Object.keys(errors).length === 0 ? " " : "Icon is optional"
            }
            onChange={(e) => setIcon2(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Icon 3"
            variant="outlined"
            name="Icon3"
            value={icon3}
            helperText={
              Object.keys(errors).length === 0 ? " " : "Icon is optional"
            }
            onChange={(e) => setIcon3(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Icon 4"
            variant="outlined"
            name="Icon4"
            value={icon4}
            helperText={
              Object.keys(errors).length === 0 ? " " : "Icon is optional"
            }
            onChange={(e) => setIcon4(e.target.value)}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  blogPost: state.blogPost,
});

export default withStyles(styles)(
  connect(mapStateToProps, { addProject })(ProjectInput)
);
