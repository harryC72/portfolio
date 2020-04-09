import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateBlogPost } from "../flux/actions/blogPostActions";

function BlogUpdate(props) {
  const [updatedBlogPost, setUpdatedBlogPost] = useState();

  const {
    match: { params }
  } = props;

  useEffect(() => {
    const fetchData = async () => {
      axios.get(`/blogposts/${params.id}`).then(res => {
        console.log("update", res.data[0]);
        setUpdatedBlogPost(res.data[0]);
      });
    };
    fetchData();
  }, [params.id]);

  return (
    <div>
      {updatedBlogPost ? (
        <div>
          <div>{updatedBlogPost.title}</div>
        </div>
      ) : null}
    </div>
  );
}

const mapStateToProps = state => ({
  blogPost: state.blogPost
});

export default connect(mapStateToProps, { updateBlogPost })(BlogUpdate);
