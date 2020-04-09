import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateBlogPost } from "../flux/actions/blogPostActions";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core/";

const styles = {
  root: {
    "& .MuiTextField-root": {
      margin: "20px 0 20px 0"
    }
  }
};

function BlogUpdate(props) {
  const [updatedBlogPost, setUpdatedBlogPost] = useState();

  const {
    match: { params }
  } = props;

  const { classes } = props;

  useEffect(() => {
    const fetchData = async () => {
      axios.get(`/blogposts/${params.id}`).then(res => {
        console.log("update", res.data);
        setUpdatedBlogPost(res.data[0]);
      });
    };
    fetchData();
  }, [params.id]);

  const handleSubmit = e => {
    e.preventDefault();
    const updatedPost = {
      updatedBlogPost
    };
    updateBlogPost(updatedPost);
    setUpdatedBlogPost({ title: "" });
  };

  const handleTitleChange = e => {
    let newTitle = e.target.value;
    setUpdatedBlogPost({ title: newTitle });
  };

  return (
    <div>
      {updatedBlogPost ? (
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
              value={updatedBlogPost.title}
              onChange={handleTitleChange}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      ) : null}
    </div>
  );
}

const mapStateToProps = state => ({
  blogPost: state.blogPost
});

export default withStyles(styles);
connect(mapStateToProps, { updateBlogPost })(BlogUpdate);
