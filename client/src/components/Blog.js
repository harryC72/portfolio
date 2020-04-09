import React from "react";
import BlogInput from "./BlogInput";
import BlogPosts from "./BlogPosts";
import { Box } from "@material-ui/core/";
import BlogList from "./BlogList";

function Blog() {
  return (
    <Box display="flex">
      <Box width={2 / 3} style={{ border: "2px solid black" }}>
        <BlogInput />
        <BlogPosts />
      </Box>
      <Box width={1 / 3} style={{ border: "2px solid black" }}>
        <BlogList />
      </Box>
    </Box>
  );
}

export default React.forwardRef(Blog);
