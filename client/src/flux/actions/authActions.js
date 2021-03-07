import axios from 'axios';
import {
  USER_LOADED,
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  LOADING_FAILURE,
  LOGIN_FAILURE,
} from '../types/authTypes';
import tokenConfig from '../../utils/tokenConfig';

// check token & load user

export const loadUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LOADING });
    const { data } = await axios.get('/auth/user', tokenConfig(getState));

    dispatch({
      type: USER_LOADED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOADING_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register = ({ name, email, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request body
  const body = JSON.stringify({ name, email, password });

  return axios
    .post('/auth/register', body, config)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      throw Error(err);
    });
};

export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    dispatch({ type: USER_LOADING });

    const { data } = axios.post('/auth/login', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
