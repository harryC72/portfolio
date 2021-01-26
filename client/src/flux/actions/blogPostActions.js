import {
  BLOGPOST_LOADING,
  GET_BLOGPOST,
  GET_BLOGPOSTS,
  ADD_BLOGPOST_SUCCESS,
  DELETE_BLOGPOST,
  UPDATE_BLOGPOST,
  SET_BLOGPOST_NOT_LOADING,
  SHUFFLE_BLOGPOSTS,
  GET_BLOGPOST_REQUEST,
  GET_BLOGPOST_SUCCESS,
  GET_BLOGPOST_FAILURE,
  GET_BLOGPOSTS_REQUEST,
  GET_BLOGPOSTS_SUCCESS,
  GET_BLOGPOSTS_FAILURE,
} from '../types/blogPostTypes';
import axios from 'axios';
import { tokenConfig } from './authActions';

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

export const getBlogPost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_BLOGPOST_REQUEST,
    });
    const { data } = await axios.get(`/blogposts/${id}`);

    dispatch({
      type: GET_BLOGPOST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_BLOGPOST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getBlogPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_BLOGPOSTS_REQUEST,
    });
    const { data } = await axios.get('/blogposts');
    dispatch({
      type: GET_BLOGPOSTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_BLOGPOSTS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addBlogPost = (blogPost) => (dispatch, getState) => {
  dispatch(loadBlogPost());
  return axios
    .post('/blogposts', blogPost, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_BLOGPOST_SUCCESS,
        payload: res.data,
      });
      console.log(res.data);
    })
    .catch((err) => {
      throw Error(err);
    });
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
    .catch((err) => {
      throw Error(err);
    });
};

export const updateBlogPost = (id, bodyText, title) => (dispatch, getState) => {
  dispatch(loadBlogPost());
  const body = { bodyText, title };

  axios
    .put(`/blogposts/${id}`, body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: UPDATE_BLOGPOST,
        payload: body,
      });
    })
    .catch((err) => {
      throw Error(err);
    });
};

export const shuffleBlogPosts = (prop, value) => {
  return {
    type: SHUFFLE_BLOGPOSTS,
    payload: { prop, value },
  };
};
