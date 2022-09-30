import axios from "axios";
import {
  GET_NEW_ACCESS_TOKEN_START,
  GET_NEW_ACCESS_TOKEN_SUCCESS,
  CREATE_AUTH_LINK_START,
  CREATE_AUTH_LINK_SUCCESS,
} from "actions/googleAuthActions";
import { newExpirationDate } from "utils";

export const createAuthLink = (params) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_AUTH_LINK_START,
    });
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/google/createAuthLink`,
      { ...params }
    );
    if (response.data && Object.keys(response.data).length > 0) {
      dispatch({
        type: CREATE_AUTH_LINK_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: CREATE_AUTH_LINK_SUCCESS,
        payload: {
          status: "0",
          message: "Something went wrong! Please try after sometime.",
          url: "",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: CREATE_AUTH_LINK_SUCCESS,
      payload: {
        status: "0",
        message: error.message,
        url: "",
      },
    });
  }
};

export const getNewAccessToken = (params) => async (dispatch) => {
  try {
    dispatch({
      type: GET_NEW_ACCESS_TOKEN_START,
    });
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/google/getValidToken`
    );
    if (response.data && Object.keys(response.data).length > 0) {
      localStorage.setItem("accessToken", response.data?.accessToken);
      localStorage.setItem("expirationDate", newExpirationDate());
      dispatch({
        type: GET_NEW_ACCESS_TOKEN_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: GET_NEW_ACCESS_TOKEN_SUCCESS,
        payload: {
          status: "0",
          message: "Something went wrong! please try after sometime.",
          accessToken: "",
        },
      });
    }
  } catch (error) {
    dispatch({
      type: GET_NEW_ACCESS_TOKEN_SUCCESS,
      payload: {
        status: "0",
        message: error.message,
        accessToken: "",
      },
    });
  }
};
