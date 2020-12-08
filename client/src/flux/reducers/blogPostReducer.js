import {
  GET_BLOGPOST,
  GET_BLOGPOSTS,
  ADD_BLOGPOST,
  UPDATE_BLOGPOST,
  DELETE_BLOGPOST,
  BLOGPOST_LOADING,
  SET_BLOGPOST_NOT_LOADING,
  SHUFFLE_BLOGPOSTS,
} from '../types/blogPostTypes';
import { cutArray } from '../../utils/helperMethods';

const initialState = {
  blogPosts: [],
  loading: false,
};

//Reducer
function BlogPostReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BLOGPOST:
      return {
        ...state,
        blogPosts: action.payload,
        loading: false,
      };
    case GET_BLOGPOSTS:
      return {
        ...state,
        blogPosts: action.payload,
        loading: false,
      };
    case DELETE_BLOGPOST:
      return {
        ...state,
        blogPosts: state.blogPosts.filter(
          (item) => item._id !== action.payload
        ),
        loading: false,
      };
    case ADD_BLOGPOST:
      return {
        ...state,
        blogPosts: [action.payload, ...state.blogPosts],
        loading: false,
      };
    case UPDATE_BLOGPOST:
      const newState = state.blogPosts.filter(
        (item) => item._id !== action.payload._id
      );
      return {
        ...state,
        blogPosts: [action.payload, newState],
        loading: false,
      };
    case BLOGPOST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_BLOGPOST_NOT_LOADING:
      return {
        ...state,
        loading: false,
      };
    case SHUFFLE_BLOGPOSTS:
      console.log('PROPS', action.payload.prop, action.payload.value);
      const shuffledState = cutArray(
        state.blogPosts,
        action.payload.prop,
        action.payload.value
      );
      console.log('SHUFFLED BLOGPOSTS', shuffledState);
      return {
        ...state,
        blogPosts: [...shuffledState],
      };

    default:
      return state;
  }
}

export default BlogPostReducer;
