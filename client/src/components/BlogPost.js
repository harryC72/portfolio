import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Button
} from "@material-ui/core/";

import Typography from "@material-ui/core/Typography";

const styles = {
  root: {
    width: 345,
    margin: "50px 0"
  },
  media: {
    height: 140
  }
};

function MediaCard({
  classes,
  image,
  title,
  bodyText,
  deletePost,
  deleteId,
  shuffling
}) {
  const deleting = id => {
    deletePost(id);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title="Cont
          emplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {bodyText}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Button onClick={() => deleting(deleteId)}>Delete</Button>
      <NavLink to={`/updateBlogPost/${deleteId}`}>Update</NavLink>
    </Card>
  );
}

export default withStyles(styles)(MediaCard);
