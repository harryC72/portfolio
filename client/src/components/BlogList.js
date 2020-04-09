import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getBlogPosts,
  shuffleBlogPosts
} from "../flux/actions/blogPostActions";
import { Typography, Box } from "@material-ui/core/";
import { formatDate } from "../utils/helperMethods";

class BlogList extends Component {
  componentDidMount() {
    this.props.getBlogPosts();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.blogPost.blogPosts.length ===
      nextProps.blogPost.blogPosts.length
    ) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    const { blogPost, shuffleBlogPosts } = this.props;
    const { blogPosts } = blogPost;
    return (
      <Box my={4}>
        {blogPosts.map(({ _id, date }) => {
          return (
            <Typography
              key={_id}
              onClick={() => shuffleBlogPosts("date", date)}
            >
              {formatDate(date)}
            </Typography>
          );
        })}
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  blogPost: state.blogPost
});

export default connect(mapStateToProps, { getBlogPosts, shuffleBlogPosts })(
  BlogList
);
