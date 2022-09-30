import axios from "axios";
import {
  GET_MEDIAITEMS_START,
  GET_MEDIAITEMS_SUCCESS,
} from "actions/googlePhotosActions";

export const getMediaItems = (params) => async (dispatch) => {
  try {
    dispatch({
      type: GET_MEDIAITEMS_START,
    });
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/google/getMediaItems`
    );
    if (response.status === 200) {
      dispatch({
        type: GET_MEDIAITEMS_SUCCESS,
        payload: response.data?.data,
      });
    } else {
      dispatch({
        type: GET_MEDIAITEMS_SUCCESS,
        payload: [],
      });
    }
  } catch (error) {
    dispatch({
      type: GET_MEDIAITEMS_SUCCESS,
      payload: [],
    });
  }
};
