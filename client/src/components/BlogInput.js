import React, { useState, Fragment } from "react";
import { useInput } from "../hooks/inputHook";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core/";
import { Alert, AlertTitle } from "@material-ui/lab";
import { connect } from "react-redux";
import { addBlogPost } from "../flux/actions/blogPostActions";

const styles = {
  root: {
    "& .MuiTextField-root": {
      margin: "20px 0 20px 0",
    },
  },
};

export function BlogInput({ classes, addBlogPost, loading }) {
  const [msg, setMsg] = useState(null);
  const [errors, setErrors] = useState({});

  const {
    value: postTitle,
    bind: bindPostTitle,
    reset: resetPostTitle,
  } = useInput("");
  const {
    value: postBody,
    bind: bindPostBody,
    reset: resetPostBody,
  } = useInput("");

  const formIsValid = () => {
    const errors = {};

    if (!postTitle) errors.postTitle = "Title is required";
    if (!postBody) errors.postBody = "Body text is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      postTitle,
      postBody,
    };
    if (!formIsValid()) return;
    addBlogPost(newPost)
      .then(() => {
        resetPostTitle();
        resetPostBody();
      })
      .catch((err) => {
        console.log("ERROR BLOGINPUT", Object.getOwnPropertyNames(err));
        setMsg(err.message);
      });
  };

  const saveButton = () =>
    loading ? (
      <Button type="submit">Saving...</Button>
    ) : (
      <Button type="submit">Save</Button>
    );

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
            // id="outlined-basic"
            label="Blog post title"
            variant="outlined"
            name="PostTitle"
            error={errors.postTitle ? true : false}
            helperText={errors.postTitle === "" ? " " : errors.postTitle}
            {...bindPostTitle}
          />
        </div>
        <div>
          <TextField
            id="outlined-multiline-static"
            label="Blog post body"
            multiline
            rows="4"
            variant="outlined"
            name="PostBody"
            error={errors.postBody ? true : false}
            helperText={errors.postBody === "" ? " " : errors.postBody}
            {...bindPostBody}
          />
        </div>
        {saveButton()}
      </form>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  blogPost: state.blogPost,
  loading: state.blogPost.loading,
});

export default withStyles(styles)(
  connect(mapStateToProps, { addBlogPost })(BlogInput)
);
