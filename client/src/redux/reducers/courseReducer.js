import {
  GET_ALL_COURSES,
  GET_COURSE_BY_ID,
  GET_LOADING
} from "../actions/types";
const initialState = {
  loading: false,
  courses: [],
  course: {},
  courseAuthor: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_COURSE_BY_ID:
      return {
        ...state,
        course: { ...action.payload },
        loading: false,
        courseAuthor: action.payload.user[0]
      };
    case GET_ALL_COURSES:
      return {
        ...state,
        courses: [...action.payload],
        loading: false
      };
    default:
      return state;
  }
}
