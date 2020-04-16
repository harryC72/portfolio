import {
  BLOGPOST_LOADING,
  GET_BLOGPOST,
  GET_BLOGPOSTS,
  ADD_BLOGPOST,
  DELETE_BLOGPOST,
  UPDATE_BLOGPOST,
  SET_BLOGPOST_NOT_LOADING,
  SHUFFLE_BLOGPOSTS,
} from "../types/blogPostTypes";
import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const loadBlogPost = () => {
  return {
    type: BLOGPOST_LOADING,
  };
};

export const setBlogPostNotLoading = () => {
  return {
    type: SET_BLOGPOST_NOT_LOADING,
  };
};

export const getBlogPost = (id) => (dispatch) => {
  dispatch(loadBlogPost());
  axios
    .get(`/blogposts/${id}`)
    .then((res) => {
      dispatch({
        type: GET_BLOGPOST,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getBlogPosts = () => (dispatch) => {
  dispatch(loadBlogPost());
  axios
    .get("/blogposts")
    .then((res) => {
      dispatch({
        type: GET_BLOGPOSTS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addBlogPost = (blogPost) => (dispatch, getState) => {
  dispatch(loadBlogPost());
  axios
    .post("/blogposts", blogPost, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_BLOGPOST,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteBlogPost = (id) => (dispatch, getState) => {
  axios
    .delete(`/blogposts/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_BLOGPOST,
        payload: id,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateBlogPost = (id, body) => (dispatch, getState) => {
  dispatch(loadBlogPost());
  axios
    .put(`/blogposts/${id}`, body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: UPDATE_BLOGPOST,
        payload: body,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const shuffleBlogPosts = (prop, value) => {
  return {
    type: SHUFFLE_BLOGPOSTS,
    payload: { prop, value },
  };
};
