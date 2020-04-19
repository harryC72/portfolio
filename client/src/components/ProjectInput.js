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

  const {
    value: projectImage,
    bind: bindProjectImage,
    reset: resetProjectImage,
  } = useInput("");

  const { value: icon1, bind: bindIcon1, reset: resetIcon1 } = useInput("");

  const { value: icon2, bind: bindIcon2, reset: resetIcon2 } = useInput("");

  const { value: icon3, bind: bindIcon3, reset: resetIcon3 } = useInput("");

  const { value: icon4, bind: bindIcon4, reset: resetIcon4 } = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      title,
      bodyText,
      url,
      projectImage,
      icon1,
      icon2,
      icon3,
      icon4,
    };
    addProject(newProject);
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
      <div>
        <TextField
          id="outlined-basic"
          label="Project image"
          variant="outlined"
          name="ProjectImage"
          {...bindProjectImage}
        />
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label="Icon 1"
          variant="outlined"
          name="Icon1"
          {...bindIcon1}
        />
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label="Icon 2"
          variant="outlined"
          name="Icon2"
          {...bindIcon2}
        />
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label="Icon 3"
          variant="outlined"
          name="Icon3"
          {...bindIcon3}
        />
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label="Icon 4"
          variant="outlined"
          name="Icon4"
          {...bindIcon4}
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
