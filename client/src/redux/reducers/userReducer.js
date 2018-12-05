import { GET_USER, USER_LOGOUT } from "../actions/types";
import isEmpty from "../../utils/isEmpty";
const initialState = {
  isAthenticated: false,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        isAthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOGOUT:
      return {
        ...state,
        user: {},
        isAthenticated: !isEmpty(action.payload)
      };
    default:
      return state;
  }
};
