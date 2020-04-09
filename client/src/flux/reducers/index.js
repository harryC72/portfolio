import { combineReducers } from "redux";
import blogPostReducer from "./blogPostReducer";
import projectReducer from "./projectReducer";

export default combineReducers({
  blogPost: blogPostReducer,
  project: projectReducer
});
