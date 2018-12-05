import { GET_ALL_COURSES, CREATE_COURSE, GET_ERRORS } from "../actions/types";
import axios from "axios";

export const createCourse = course => dispatch => {
  axios
    .post("http://localhost:5000/api/courses", course)
    .then(response => {
      dispatch({
        type: CREATE_COURSE,
        payload: response.data
      });
    })
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};
