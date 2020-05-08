import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Link,
  Typography,
} from "@material-ui/core/";
import { ROLE } from "../generalConstants";

const useStyles = makeStyles({
  root: {
    width: 345,
    margin: "20px",
  },
  media: {
    height: 140,
  },
});

export default function MediaCard({
  projectTitle,
  projectBody,
  url,
  projectImage,
  icon1,
  icon2,
  icon3,
  deleteProject,
  deleteId,
  role,
}) {
  const classes = useStyles();

  const deleting = (id) => {
    deleteProject(id);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} title={projectTitle}>
          <img
            src={`/images/${projectImage}`}
            style={{ width: "200px", height: "auto" }}
            alt="MokaMokka"
          />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {projectTitle}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {projectBody}
          </Typography>
          <Link href={url} color="inherit">
            {projectTitle}
          </Link>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
      {role === ROLE ? (
        <Button onClick={() => deleting(deleteId)}>Delete</Button>
      ) : null}
    </Card>
  );
}
