import {
  GET_NEW_ACCESS_TOKEN_START,
  GET_NEW_ACCESS_TOKEN_SUCCESS,
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
  newAccessToken: {
    loading: false,
    status: "",
    message: "",
    accessToken: "",
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
    case GET_NEW_ACCESS_TOKEN_START: {
      return {
        ...previousState,
        newAccessToken: {
          loading: true,
          status: "",
          message: "",
          accessToken: "",
        },
      };
    }
    case GET_NEW_ACCESS_TOKEN_SUCCESS: {
      return {
        ...previousState,
        newAccessToken: {
          ...previousState.newAccessToken,
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
