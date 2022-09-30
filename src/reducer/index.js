import { combineReducers } from "redux";
import GoogleAuthReducer from "./googleAuthReducer";
import GooglePhotosReducer from "./googlePhotosReducer";

const Reducers = combineReducers({
  googleAuthData: GoogleAuthReducer,
  googlePhotosData: GooglePhotosReducer,
});

export default Reducers;
