import React, { useState, Fragment } from "react";
import { useInput } from "../hooks/inputHook";
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

  const {
    value: projectTitle,
    bind: bindProjectTitle,
    reset: resetProjectTitle,
  } = useInput("");
  const {
    value: projectBody,
    bind: bindProjectBody,
    reset: resetProjectBody,
  } = useInput("");

  const {
    value: projectUrl,
    bind: bindProjectUrl,
    reset: resetProjectUrl,
  } = useInput("");

  const {
    value: projectImage,
    bind: bindProjectImage,
    reset: resetProjectImage,
  } = useInput("");

  const { value: icon1, bind: bindIcon1, reset: resetIcon1 } = useInput("");

  const { value: icon2, bind: bindIcon2, reset: resetIcon2 } = useInput("");

  const { value: icon3, bind: bindIcon3, reset: resetIcon3 } = useInput("");

  const { value: icon4, bind: bindIcon4, reset: resetIcon4 } = useInput("");

  const formIsValid = () => {
    const errors = {};

    if (!projectTitle) errors.projectTitle = "Title is required";
    if (!projectBody) errors.projectBody = "Body text is required";
    if (!projectUrl) errors.projectUrl = "Url is required";
    if (!projectImage) errors.projectImage = "Image is required";

    setErrors(errors);
    console.log("ERRORS", errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      projectTitle,
      projectBody,
      projectUrl,
      projectImage,
      icon1,
      icon2,
      icon3,
      icon4,
    };
    if (!formIsValid()) return;
    addProject(newProject).catch((err) => {
      setMsg(err.message);
    });
    resetProjectTitle();
    resetProjectBody();
    resetProjectUrl();
    resetProjectImage();
    resetIcon1();
    resetIcon2();
    resetIcon3();
    resetIcon4();
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
            error={errors.projectTitle ? true : false}
            helperText={errors.projectTitle === "" ? " " : errors.projectTitle}
            {...bindProjectTitle}
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
            error={errors.projectBody ? true : false}
            helperText={errors.projectBody === "" ? " " : errors.projectBody}
            {...bindProjectBody}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Project url"
            variant="outlined"
            name="ProjectUrl"
            error={errors.projectUrl ? true : false}
            helperText={errors.projectUrl === "" ? " " : errors.projectUrl}
            {...bindProjectUrl}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Project image"
            variant="outlined"
            name="ProjectImage"
            error={errors.projectImage ? true : false}
            helperText={errors.projectImage === "" ? " " : errors.projectImage}
            {...bindProjectUrl}
          />
        </div>

        <div>
          <TextField
            id="outlined-basic"
            label="Icon 1"
            variant="outlined"
            name="Icon1"
            {...bindIcon1}
            helperText={
              Object.keys(errors).length === 0 ? " " : "Icon is optional"
            }
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Icon 2"
            variant="outlined"
            name="Icon2"
            helperText={
              Object.keys(errors).length === 0 ? " " : "Icon is optional"
            }
            {...bindIcon2}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Icon 3"
            variant="outlined"
            name="Icon3"
            helperText={
              Object.keys(errors).length === 0 ? " " : "Icon is optional"
            }
            {...bindIcon3}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Icon 4"
            variant="outlined"
            name="Icon4"
            helperText={
              Object.keys(errors).length === 0 ? " " : "Icon is optional"
            }
            {...bindIcon4}
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
