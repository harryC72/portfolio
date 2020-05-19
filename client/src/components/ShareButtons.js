import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";

const styles = (theme) => ({
  openShare: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    position: "absolute",
    zIndex: 20000,
    display: "block",
    opacity: 1,
  },
  icon: {
    fontSize: "30px",
    margin: "0px 10px",
  },
});

export const ShareButtons = (props) => {
  const { share } = props;
  const { classes } = props;

  const theme = useTheme();

  //URL patterns for Social media sites share functionalities
  const { url } = props;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${url}`;
  const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;

  return (
    <div className={share ? classes.openShare : null} {...props}>
      <a href={facebookUrl} target="_blank">
        <FontAwesomeIcon
          className={classes.icon}
          icon={["fab", "facebook-square"]}
          color="red"
        ></FontAwesomeIcon>
      </a>
      <a href={linkedinUrl} target="_blank">
        <FontAwesomeIcon
          className={classes.icon}
          icon={["fab", "linkedin"]}
          color="red"
        ></FontAwesomeIcon>
      </a>
      <a href={twitterUrl} target="_blank">
        <FontAwesomeIcon
          className={classes.icon}
          icon={["fab", "twitter-square"]}
          color="red"
        ></FontAwesomeIcon>
      </a>
    </div>
  );
};

export default withStyles(styles)(ShareButtons);
