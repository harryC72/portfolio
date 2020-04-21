import { combineReducers } from "redux";
import blogPostReducer from "./blogPostReducer";
import projectReducer from "./projectReducer";
import authReducer from "./authReducer";

export default combineReducers({
  blogPost: blogPostReducer,
  project: projectReducer,
  auth: authReducer,
});
