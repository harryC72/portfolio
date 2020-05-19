import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, ThemeProvider } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Box,
  Button,
  Link,
  Typography,
} from "@material-ui/core/";
import { ROLE } from "../generalConstants";
import SocialShare from "./SocialShare";
import { faBuromobelexperte } from "@fortawesome/free-brands-svg-icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
    margin: "20px",
    height: "450px",
  },
  media: {
    height: "100%",
  },
}));

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
          <Link href={url} color="inherit" target="_blank">
            <img
              src={`/images/${projectImage}`}
              style={{ width: "100%", height: "auto" }}
              alt="MokaMokka"
            />
          </Link>
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {projectTitle}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {projectBody}
          </Typography>
          <Link href={url} color="inherit" target="_blank">
            {projectTitle}
          </Link>
        </CardContent>
        <CardMedia className={classes.media}>
          <Box display="flex" justifyContent="space-around" alignItems="center">
            <img
              src={`/images/${icon1}`}
              style={{ width: "50px", height: "auto" }}
              alt="technology used"
            />
            <img
              src={`/images/${icon2}`}
              style={{ width: "50px", height: "auto" }}
              alt="technology used"
            />
            <img
              src={`/images/${icon3}`}
              style={{ width: "50px", height: "auto" }}
              alt="technology used"
            />
          </Box>
        </CardMedia>
      </CardActionArea>
      <CardActions>
        <SocialShare color="primary" url={url}></SocialShare>
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
