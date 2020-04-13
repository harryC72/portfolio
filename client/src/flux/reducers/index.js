import { combineReducers } from "redux";
import blogPostReducer from "./blogPostReducer";
import projectReducer from "./projectReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  blogPost: blogPostReducer,
  project: projectReducer,
  error: errorReducer,
  auth: authReducer,
});
