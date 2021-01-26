import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Button,
} from '@material-ui/core/';
import { ROLE } from '../generalConstants';

import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    width: 345,
    margin: '50px 0',
  },
  media: {
    height: 140,
  },
  nav: {
    textDecoration: 'none',
  },
};

function BlogPost({
  classes,
  image,
  title,
  bodyText,
  deletePost,
  deleteId,
  role,
  id,
  blogPost,
}) {
  const deleting = (id) => {
    deletePost(id);
  };

  const authButtons = (
    <Fragment>
      <Button onClick={() => deleting(deleteId)}>Delete</Button>
      <Button>
        <NavLink
          className={classes.nav}
          to={{
            pathname: `/updateBlogPost/${deleteId}`,
            blogPost: { title, bodyText },
          }}
        >
          Update
        </NavLink>
      </Button>
    </Fragment>
  );

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <NavLink
          to={{ pathname: `/blogpost/${id}`, blogPost: { title, bodyText } }}
          className={classes.nav}
        >
          <CardMedia
            className={classes.media}
            image={image}
            title='Cont
          emplative Reptile'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {title}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {bodyText}
            </Typography>
          </CardContent>
        </NavLink>
      </CardActionArea>
      {role}
      {authButtons}
    </Card>
  );
}

const mapStateToProps = (state) => ({
  blogPost: state.blogPost,
});

export default withStyles(styles)(connect(mapStateToProps)(BlogPost));
