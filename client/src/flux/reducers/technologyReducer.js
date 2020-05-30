import {
  TECHNOLOGY_LOADING,
  GET_TECHNOLOGY,
  GET_TECHNOLOGIES,
  ADD_TECHNOLOGY,
  DELETE_TECHNOLOGY,
  UPDATE_TECHNOLOGY,
  SET_TECHNOLOGY_NOT_LOADING,
  SHUFFLE_TECHNOLOGIES,
} from "../types/technologyTypes";
import { cutArray } from "../../utils/helperMethods";

const initialState = {
  technologies: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TECHNOLOGY:
      return {
        ...state,
        technologies: action.payload,
        loading: false,
      };
    case GET_TECHNOLOGIES:
      return {
        ...state,
        technologies: action.payload,
        loading: false,
      };
    case DELETE_TECHNOLOGY:
      return {
        ...state,
        technologies: state.technologies.filter(
          (item) => item._id !== action.payload
        ),
        loading: false,
      };
    case ADD_TECHNOLOGY:
      return {
        ...state,
        technologies: [action.payload, ...state.technologies],
        loading: false,
      };
    case UPDATE_TECHNOLOGY:
      const newState = state.technologies.filter(
        (item) => item._id !== action.payload._id
      );
      return {
        ...state,
        technologies: [action.payload, newState],
        loading: false,
      };
    case TECHNOLOGY_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_TECHNOLOGY_NOT_LOADING:
      return {
        ...state,
        loading: false,
      };
    case SHUFFLE_TECHNOLOGIES:
      console.log("PROPS", action.payload.prop, action.payload.value);
      const shuffledState = cutArray(
        state.technologies,
        action.payload.prop,
        action.payload.value
      );
      console.log("SHUFFLED TECHNOLOGIES", shuffledState);
      return {
        ...state,
        technologies: [...shuffledState],
      };

    default:
      return state;
  }
}
