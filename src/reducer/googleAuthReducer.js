import {
  CREATE_AUTH_LINK_START,
  CREATE_AUTH_LINK_SUCCESS,
} from "actions/googleAuthActions";

const initialState = {
  authLinkData: {
    loading: false,
    status: "",
    message: "",
    url: "",
  },
};

const GoogleAuthReducer = (previousState = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_AUTH_LINK_START: {
      return {
        ...previousState,
        authLinkData: {
          loading: true,
          status: "",
          message: "",
          url: "",
        },
      };
    }
    case CREATE_AUTH_LINK_SUCCESS: {
      return {
        ...previousState,
        authLinkData: {
          ...previousState.authLinkData,
          loading: false,
          ...payload,
        },
      };
    }
    default:
      return previousState || initialState;
  }
};

export default GoogleAuthReducer;
