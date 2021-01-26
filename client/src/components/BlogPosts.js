import React, { useEffect, Fragment } from 'react';
import BlogPost from './BlogPost';
import AI from '../images/AI_pic1.jpg';
import { getBlogPosts, deleteBlogPost } from '../flux/actions/blogPostActions';
import { connect } from 'react-redux';
import { Box, Snackbar } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import Spinner from './Spinner';

function BlogPosts({ getBlogPosts, blogPost, deleteBlogPost, auth }) {
  useEffect(() => {
    getBlogPosts();
  }, [getBlogPosts]);

  const { blogPosts, error, loading } = blogPost;
  const { role } = auth.user || 'Not logged in';

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Snackbar severity='error' message={error} />
      ) : (
        blogPosts.map(({ title, bodyText, _id }) => {
          return (
            <Box display='flex' justifyContent='center' key={_id}>
              <BlogPost
                image={AI}
                title={title}
                bodyText={bodyText}
                deleteId={_id}
                id={_id}
                deletePost={deleteBlogPost}
                role={role}
              />
            </Box>
          );
        })
      )}
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
