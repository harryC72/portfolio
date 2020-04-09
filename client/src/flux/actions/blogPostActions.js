import {
  BLOGPOST_LOADING,
  GET_BLOGPOST,
  GET_BLOGPOSTS,
  ADD_BLOGPOST,
  DELETE_BLOGPOST,
  UPDATE_BLOGPOST,
  SET_BLOGPOST_NOT_LOADING,
  SHUFFLE_BLOGPOSTS
} from "../types/blogPostTypes";
import axios from "axios";

export const loadBlogPost = () => {
  return {
    type: BLOGPOST_LOADING
  };
};

export const setBlogPostNotLoading = () => {
  return {
    type: SET_BLOGPOST_NOT_LOADING
  };
};

export const getBlogPost = id => dispatch => {
  dispatch(loadBlogPost());
  axios.get(`/blogposts/${id}`).then(res => {
    dispatch({
      type: GET_BLOGPOST,
      payload: res.data
    });
  });
};

export const getBlogPosts = () => dispatch => {
  dispatch(loadBlogPost());
  axios.get("/blogposts").then(res => {
    dispatch({
      type: GET_BLOGPOSTS,
      payload: res.data
    });
  });
};

export const addBlogPost = blogPost => dispatch => {
  dispatch(loadBlogPost());
  axios.post("/blogposts", blogPost).then(res => {
    dispatch({
      type: ADD_BLOGPOST,
      payload: res.data
    });
  });
};

export const deleteBlogPost = id => dispatch => {
  dispatch(loadBlogPost());
  axios.delete(`/blogposts/${id}`).then(res => {
    dispatch({
      type: DELETE_BLOGPOST,
      payload: id
    });
  });
};

export const updateBlogPost = (id, body) => dispatch => {
  dispatch(loadBlogPost());
  axios.put(`/blogposts/${id}`, body).then(res => {
    dispatch({
      type: UPDATE_BLOGPOST,
      payload: body
    });
  });
};

export const shuffleBlogPosts = (prop, value) => {
  return {
    type: SHUFFLE_BLOGPOSTS,
    payload: { prop, value }
  };
};
