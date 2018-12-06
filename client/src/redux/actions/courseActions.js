import { GET_ALL_COURSES, GET_ERRORS } from "../actions/types";
import axios from "axios";

export const getAllCourses = course => dispatch => {
  axios.get("http://localhost:5000/api/courses", course).then(response => {
    dispatch({
      type: GET_ALL_COURSES,
      payload: response.data
    });
  });
  // .catch(error =>
  //   dispatch({
  //     type: GET_ERRORS,
  //     payload: error.response.data
  //   })
  // );
};

export const createCourse = (course, history) => dispatch => {
  axios
    .post("http://localhost:5000/api/courses", course)
    .then(response => {
      history.push("/");
    })
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};
