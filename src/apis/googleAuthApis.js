import axios from "axios";
import {
  CREATE_AUTH_LINK_START,
  CREATE_AUTH_LINK_SUCCESS,
} from "actions/googleAuthActions";

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
