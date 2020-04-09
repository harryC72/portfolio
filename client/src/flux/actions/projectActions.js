import {
  GET_PROJECT,
  GET_PROJECTS,
  ADD_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  PROJECT_LOADING,
  SET_PROJECT_NOT_LOADING,
} from "../types/projectTypes";
import axios from "axios";

export const loadProject = () => {
  return {
    type: PROJECT_LOADING,
  };
};

export const setProjectNotLoading = () => {
  return {
    type: SET_PROJECT_NOT_LOADING,
  };
};

export const getProject = (id) => (dispatch) => {
  dispatch(loadProject());
  axios.get(`/projects/${id}`).then((res) => {
    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });
  });
};

export const getProjects = () => (dispatch) => {
  // dispatch(loadProject());
  axios.get("/projects").then((res) => {
    dispatch({
      type: GET_PROJECTS,
      payload: res.data,
    });
  });
};

export const addProject = (project) => (dispatch) => {
  dispatch(loadProject());
  axios.post("/projects", project).then((res) => {
    dispatch({
      type: ADD_PROJECT,
      payload: res.data,
    });
  });
};

export const deleteProject = (id) => (dispatch) => {
  dispatch(loadProject());
  axios.delete(`/projects/${id}`).then((res) => {
    dispatch({
      type: DELETE_PROJECT,
      payload: id,
    });
  });
};

export const updateProject = (id, body) => (dispatch) => {
  dispatch(loadProject());
  axios.put(`/projects/${id}`, body).then((res) => {
    dispatch({
      type: UPDATE_PROJECT,
      payload: body,
    });
  });
};
