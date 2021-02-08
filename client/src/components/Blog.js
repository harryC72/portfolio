import React, { useEffect } from 'react';
import BlogInput from './BlogInput';
import BlogPosts from './BlogPosts';
import { Box } from '@material-ui/core/';
import BlogList from './BlogList';
import {
  getBlogPosts,
  deleteBlogPost,
  shuffleBlogPosts,
} from '../flux/actions/blogPostActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

function Blog({ getBlogPosts, blogPost, deleteBlogPost, auth }) {
  useEffect(() => {
    getBlogPosts();
  }, [getBlogPosts]);

  const { blogPosts, error, loading } = blogPost;
  const { role } = auth.user || 'Not logged in';
  return (
    <Box display='flex'>
      <Box
        width={2 / 3}
        style={{ background: 'grey', border: '2px solid white' }}
      >
        <BlogPosts
          blogPosts={blogPosts}
          deleteBlogPost={deleteBlogPost}
          error={error}
          loading={loading}
          role={role}
        />
      </Box>
      <Box
        width={1 / 3}
        style={{
          background: 'grey',
          border: '2px solid white',
          color: 'white',
        }}
      >
        <BlogList
          loading={loading}
          error={error}
          blogPosts={blogPosts}
          shuffleBlogPosts={shuffleBlogPosts}
        />
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  blogPost: state.blogPost,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getBlogPosts,
  deleteBlogPost,
  shuffleBlogPosts,
})(Blog);
