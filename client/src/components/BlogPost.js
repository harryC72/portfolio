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
      <NavLink to={`/updateBlogPost/${deleteId}`}>Update</NavLink>
    </Fragment>
  );

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <NavLink to={`/blogpost/${id}`}>
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
    </Card>
  );
}

const mapStateToProps = (state) => ({
  blogPost: state.blogPost,
});

export default withStyles(styles)(connect(mapStateToProps)(BlogPost));
