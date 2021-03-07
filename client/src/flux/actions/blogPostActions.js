import {
  BLOGPOST_LOADING,
  GET_BLOGPOST,
  GET_BLOGPOSTS,
  ADD_BLOGPOST_SUCCESS,
  ADD_BLOGPOST_FAILURE,
  DELETE_BLOGPOST_REQUEST,
  DELETE_BLOGPOST_SUCCESS,
  DELETE_BLOGPOST_FAILURE,
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
import tokenConfig from '../../utils/tokenConfig';

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

export const addBlogPost = (
  title,
  file,
  alt,
  ingress,
  bodyText,
  date
) => async (dispatch, getState) => {
  try {
    dispatch(loadBlogPost());

    console.log('data from action', title, file, alt, ingress, bodyText);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('alt', alt);
    formData.append('ingress', ingress);
    formData.append('bodyText', bodyText);

    for (var pair of formData.entries()) {
      console.log('FORMDATA', pair[0] + ', ' + pair[1]);
    }

    console.log('GET STATE FROM ACTION', getState());

    const { data } = await axios.post(
      '/blogposts',
      formData,
      tokenConfig(getState)
    );

    dispatch({
      type: ADD_BLOGPOST_SUCCESS,
      payload: data,
    });
    console.log('addBlogPostAction', data);
  } catch (error) {
    dispatch({
      type: ADD_BLOGPOST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteBlogPost = (id) => (dispatch, getState) => {
  dispatch({
    type: DELETE_BLOGPOST_REQUEST,
  });

  axios
    .delete(`/blogposts/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_BLOGPOST_SUCCESS,
        payload: id,
      });
    })
    .catch((error) => {
      dispatch({
        type: DELETE_BLOGPOST_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
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
