import React, { useState } from "react";
import { Button, Collapse, Popper } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import ShareButtons from "./ShareButtons";

const styles = (theme) => ({});

const SocialShare = ({ classes, url }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  return (
    <div className={classes.socialShareContainer}>
      <div>
        <Button size="small" color="primary" onClick={handleClick}>
          {open ? "Hide sharing options" : "Share this"}
        </Button>
        <Popper anchorEl={anchorEl} open={open} placement="bottom" transition>
          {({ TransitionProps }) => (
            <Collapse {...TransitionProps} timeout={350}>
              <ShareButtons share={open.value} url={url} />
            </Collapse>
          )}
        </Popper>
      </div>
    </div>
  );
};

export default withStyles(styles)(SocialShare);
