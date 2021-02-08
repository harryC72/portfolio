import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getBlogPosts,
  shuffleBlogPosts,
} from '../flux/actions/blogPostActions';
import { Typography, Box, Snackbar } from '@material-ui/core/';
import { formatDate } from '../utils/helperMethods';
import Spinner from './Spinner';

function BlogList({ loading, error, blogPosts, shuffleBlogPosts }) {
  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Snackbar severity='error' message={error} />
      ) : (
        <Box my={4}>
          {blogPosts.map(({ _id, date, title }) => {
            return (
              <Typography
                key={_id}
                onClick={() => shuffleBlogPosts('date', date)}
                style={{ cursor: 'pointer' }}
                component={'div'}
              >
                <h4 style={{ marginBottom: 0 }}>{title}</h4>
                <p style={{ margin: 0 }}>{formatDate(date)}</p>
              </Typography>
            );
          })}
        </Box>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  blogPost: state.blogPost,
});

export default connect(mapStateToProps, { getBlogPosts, shuffleBlogPosts })(
  BlogList
);
