import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );
    if (!!data.success) {
      localStorage.setItem("refresh-token", data.refreshToken);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.user,
      });
    } else {
      dispatch({
        type: LOGIN_FAIL,
        payload: "Failed to login",
      });
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post("/api/users/register", userData, config);
    localStorage.setItem("refresh-token", data.refreshToken);

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const { data } = await axios.get("/api/users/me");
    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const refreshToken = localStorage.getItem("refresh-token");

      if (refreshToken) {
        const { data } = await axios.post(
          "/api/users/refresh-token",
          { refreshToken },
          config
        );

        localStorage.setItem("refresh-token", data.refreshToken);
        dispatch({
          type: LOAD_USER_SUCCESS,
          payload: data.user,
        });
      } else {
        dispatch({
          type: LOAD_USER_FAIL,
          payload: error.response.data.message,
        });
      }
    } catch (err) {
      dispatch({
        type: LOAD_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.delete("/api/users/logout");

    localStorage.removeItem("refresh-token");

    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
