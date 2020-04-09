import React, { Fragment } from "react";
import { Typography, Box, Link } from "@material-ui/core/";
import HaraldImage from "../images/Harald.jpg";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  image: {
    width: "200px",
    height: "200px",
    objectFit: "cover",
    borderRadius: "50%"
  },
  container: {
    margin: "40px 0 50px 0"
  },

  firstInfo: {
    lineHeight: "140%",
    margin: 0
  }
};

function Home({ classes }) {
  const preventDefault = event => event.preventDefault();

  return (
    <Fragment>
      <Box className={classes.container}>
        <Box>
          <img className={classes.image} src={HaraldImage} alt="Harald" />
          <Typography className={classes.firstInfo} variant="h5" gutterBottom>
            Harald Carlsten
          </Typography>
          <Typography className={classes.firstInfo} variant="h5" gutterBottom>
            Fullstack Developer
          </Typography>
          <Typography className={classes.firstInfo} variant="h5" gutterBottom>
            <Link href="haraldcarlsten@yahoo.se" onClick={preventDefault}>
              haraldcarlsten@yahoo.se
            </Link>
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Box width="10%" justifyContent="space-between" display="flex">
          <Link
            href="https://www.linkedin.com/in/harald-carlsten-10a3b715/"
            target="_blank"
          >
            <i
              className="fab fa-linkedin"
              style={{ color: "#0e76a8", fontSize: "32px" }}
            ></i>
          </Link>
          <Link href="https://github.com/harryC72" target="_blank">
            <i
              className="fab fa-github-square"
              style={{ color: "#3E2C00", fontSize: "32px" }}
            ></i>
          </Link>
        </Box>
      </Box>
    </Fragment>
  );
}

export default withStyles(styles)(Home);
