import { GET_ALL_COURSES, CREATE_COURSE, GET_ERRORS } from "../actions/types";
import axios from "axios";

export const createCourse = (course, history) => dispatch => {
  axios
    .post("http://localhost:5000/api/courses", course)
    .then(response => {
      history.push(`/courses/${course._id}`);
    })
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};
