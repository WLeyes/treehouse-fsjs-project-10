import { GET_USER, CREATE_NEW_USER } from "../actions/types";

const initialState = {
  isAthenticated: false,
  user: {},
  token: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
