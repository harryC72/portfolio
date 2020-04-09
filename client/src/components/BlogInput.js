import React from "react";
import { useInput } from "../hooks/inputHook";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core/";
import { connect } from "react-redux";
import { addBlogPost } from "../flux/actions/blogPostActions";

const styles = {
  root: {
    "& .MuiTextField-root": {
      margin: "20px 0 20px 0"
    }
  }
};

function BlogInput({ classes, addBlogPost }) {
  const { value: title, bind: bindPostTitle, reset: resetPostTitle } = useInput(
    ""
  );
  const {
    value: bodyText,
    bind: bindPostBody,
    reset: resetPostBody
  } = useInput("");

  const handleSubmit = e => {
    e.preventDefault();
    const newPost = {
      title,
      bodyText
    };
    addBlogPost(newPost);
    resetPostTitle();
    resetPostBody();
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
          label="Blog post title"
          variant="outlined"
          name="PostTitle"
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
          {...bindPostBody}
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}

const mapStateToProps = state => ({
  blogPost: state.blogPost
});

export default withStyles(styles)(
  connect(mapStateToProps, { addBlogPost })(BlogInput)
);
