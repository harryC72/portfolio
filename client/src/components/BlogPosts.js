import React, { useEffect, Fragment } from 'react';
import BlogPost from './BlogPost';
import { Box, Snackbar } from '@material-ui/core';
import Spinner from './Spinner';

export default function BlogPosts({
  blogPosts,
  deleteBlogPost,
  loading,
  error,
  role,
}) {
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Snackbar severity='error' message={error} />
      ) : (
        blogPosts.map(({ title, bodyText, _id, file }) => {
          return (
            <Box display='flex' justifyContent='center' key={_id}>
              <BlogPost
                image={file}
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
