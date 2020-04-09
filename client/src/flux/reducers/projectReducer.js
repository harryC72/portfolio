import {
  GET_PROJECT,
  GET_PROJECTS,
  ADD_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  PROJECT_LOADING,
  SET_PROJECT_NOT_LOADING,
} from "../types/projectTypes";
import { cutArray } from "../../utils/helperMethods";

const initialState = {
  projects: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROJECT:
      return {
        ...state,
        projects: action.payload,
        loading: false,
      };
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loading: false,
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter((item) => item._id !== action.payload),
        loading: false,
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [action.payload, ...state.projects],
        loading: false,
      };
    case UPDATE_PROJECT:
      const newState = state.projects.filter(
        (item) => item._id !== action.payload._id
      );
      return {
        ...state,
        projects: [action.payload, newState],
        loading: false,
      };
    case PROJECT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_PROJECT_NOT_LOADING:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
