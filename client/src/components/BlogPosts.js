import React, { useEffect, Fragment } from "react";
import BlogPost from "./BlogPost";
import AI from "../images/AI_pic1.jpg";
import { getBlogPosts, deleteBlogPost } from "../flux/actions/blogPostActions";
import { connect } from "react-redux";
import { Box } from "@material-ui/core";

function BlogPosts({ getBlogPosts, blogPost, deleteBlogPost, auth }) {
  useEffect(() => {
    getBlogPosts();
  }, [getBlogPosts]);

  let { blogPosts } = blogPost;
  const { role } = auth.user;

  return (
    <Fragment>
      {blogPosts.map(({ title, bodyText, _id }) => {
        return (
          <Box display="flex" justifyContent="center" key={_id}>
            <BlogPost
              image={AI}
              title={title}
              bodyText={bodyText}
              deleteId={_id}
              deletePost={deleteBlogPost}
              role={role}
            />
          </Box>
        );
      })}
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  blogPost: state.blogPost,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getBlogPosts,
  deleteBlogPost,
})(BlogPosts);
