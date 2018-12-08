import { GET_USER, USER_LOGOUT } from "../actions/types";
import isEmpty from "../../utils/isEmpty";
const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: { ...action.payload }
      };
    default:
      return state;
  }
};
