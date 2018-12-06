import {
  GET_ALL_COURSES,
  GET_COURSE_BY_ID,
  GET_LOADING,
  GET_ERRORS
} from "../actions/types";
import axios from "axios";

export const getCourseById = id => dispatch => {
  dispatch(setCourseLoading());
  axios
    .get(`http://localhost:5000/api/courses/${id}`)
    .then(response =>
      dispatch({
        type: GET_COURSE_BY_ID,
        payload: response.data
      })
    )
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    );
};
export const setCourseLoading = () => {
  return {
    type: GET_LOADING
  };
};

export const getAllCourses = course => dispatch => {
  dispatch(setCourseLoading());
  axios
    .get("http://localhost:5000/api/courses", course)
    .then(response => {
      dispatch({
        type: GET_ALL_COURSES,
        payload: response.data
      });
    })
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    );
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
