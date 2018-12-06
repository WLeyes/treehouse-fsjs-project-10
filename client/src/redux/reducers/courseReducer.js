import { GET_ALL_COURSES } from "../actions/types";
const initialState = {
  loading: false,
  courses: [],
  course: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COURSES:
      return {
        ...state,
        courses: [...action.payload]
      };
    default:
      return state;
  }
}
