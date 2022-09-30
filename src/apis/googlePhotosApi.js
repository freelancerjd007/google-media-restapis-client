import axios from "axios";
import {
  GET_MEDIAITEMS_START,
  GET_MEDIAITEMS_SUCCESS,
} from "actions/googlePhotosActions";
import { getLocalStorageItems } from "utils";

export const getMediaItems = (params) => async (dispatch) => {
  try {
    dispatch({
      type: GET_MEDIAITEMS_START,
    });
    const { accessToken } = getLocalStorageItems();
    const response = await axios.get(
      `${process.env.REACT_APP_GOOGLE_PHOTOS_REST_API_BASE_URL}/v1/mediaItems`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status === 200) {
      dispatch({
        type: GET_MEDIAITEMS_SUCCESS,
        payload: response.data.mediaItems,
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
