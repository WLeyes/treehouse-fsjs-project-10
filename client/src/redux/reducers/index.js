import { combineReducers } from "redux";
import userReducer from "./userReducer";
import courseReducer from "./courseReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  users: userReducer,
  courses: courseReducer,
  errors: errorReducer
});
