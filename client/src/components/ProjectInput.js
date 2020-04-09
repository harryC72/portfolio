import React from "react";
import { useInput } from "../hooks/inputHook";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core/";
import { connect } from "react-redux";
import { addProject } from "../flux/actions/projectActions";

const styles = {
  root: {
    "& .MuiTextField-root": {
      margin: "20px 0 20px 0",
    },
  },
};

function ProjectInput({ classes, addProject }) {
  const {
    value: title,
    bind: bindProjectTitle,
    reset: resetProjectTitle,
  } = useInput("");
  const {
    value: bodyText,
    bind: bindProjectBody,
    reset: resetProjectBody,
  } = useInput("");

  const { value: url, bind: bindProjectUrl, reset: resetProjectUrl } = useInput(
    ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      title,
      bodyText,
      url,
    };
    addProject(newProject);
    resetProjectTitle();
    resetProjectBody();
    resetProjectUrl();
  };

  return (
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
          {...bindProjectBody}
        />
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label="Project url"
          variant="outlined"
          name="ProjectUrl"
          {...bindProjectUrl}
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}

const mapStateToProps = (state) => ({
  blogPost: state.blogPost,
});

export default withStyles(styles)(
  connect(mapStateToProps, { addProject })(ProjectInput)
);
