import {
  GET_MEDIAITEMS_START,
  GET_MEDIAITEMS_SUCCESS,
} from "actions/googlePhotosActions";

const initialState = {
  mediaItemsData: {
    loading: false,
    data: [],
  },
};

const GooglePhotosReducer = (
  previousState = initialState,
  { type, payload }
) => {
  switch (type) {
    case GET_MEDIAITEMS_START: {
      return {
        ...previousState,
        mediaItemsData: {
          ...previousState.mediaItemsData,
          loading: true,
        },
      };
    }
    case GET_MEDIAITEMS_SUCCESS: {
      return {
        ...previousState,
        mediaItemsData: {
          ...previousState.mediaItemsData,
          loading: false,
          data: payload,
        },
      };
    }
    default:
      return previousState || initialState;
  }
};

export default GooglePhotosReducer;
