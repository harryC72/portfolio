import {
  TECHNOLOGY_LOADING,
  GET_TECHNOLOGY,
  GET_TECHNOLOGIES,
  ADD_TECHNOLOGY,
  DELETE_TECHNOLOGY,
  UPDATE_TECHNOLOGY,
  SET_TECHNOLOGY_NOT_LOADING,
  SHUFFLE_TECHNOLOGIES,
} from '../types/technologyTypes';
import axios from 'axios';
import tokenConfig from '../../utils/tokenConfig';

export const loadTechnology = () => {
  return {
    type: TECHNOLOGY_LOADING,
  };
};

export const setTechnologyNotLoading = () => {
  return {
    type: SET_TECHNOLOGY_NOT_LOADING,
  };
};

export const getTechnology = (id) => (dispatch) => {
  dispatch(loadTechnology());
  axios
    .get(`/technologies/${id}`)
    .then((res) => {
      dispatch({
        type: GET_TECHNOLOGY,
        payload: res.data,
      });
    })
    .catch((err) => {
      throw Error(err);
    });
};

export const getTechnologies = () => (dispatch) => {
  dispatch(loadTechnology());
  axios
    .get('/technologies')
    .then((res) => {
      dispatch({
        type: GET_TECHNOLOGIES,
        payload: res.data,
      });
    })
    .catch((err) => {
      throw Error(err);
    });
};

export const addTechnology = (technology) => (dispatch, getState) => {
  dispatch(loadTechnology());
  return axios
    .post('/technologies', technology, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_TECHNOLOGY,
        payload: res.data,
      });
    })
    .catch((err) => {
      throw Error(err);
    });
};

export const deleteTechnology = (id) => (dispatch, getState) => {
  axios
    .delete(`/technologies/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_TECHNOLOGY,
        payload: id,
      });
    })
    .catch((err) => {
      throw Error(err);
    });
};

export const updateTechnology = (id, body) => (dispatch, getState) => {
  dispatch(loadTechnology());
  axios
    .put(`/technologies/${id}`, body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: UPDATE_TECHNOLOGY,
        payload: body,
      });
    })
    .catch((err) => {
      throw Error(err);
    });
};

export const shuffleTechnologies = (prop, value) => {
  return {
    type: SHUFFLE_TECHNOLOGIES,
    payload: { prop, value },
  };
};
