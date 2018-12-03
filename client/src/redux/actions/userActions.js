import { GET_USER, CREATE_NEW_USER, GET_ERRORS } from "./types";
import axios from "axios";

export const createNewUser = data => dispatch => {
  axios
    .post("http://localhost:5000/api/users", data)
    .then(response => response.data)
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

export const getUser = (emailAddress, password) => async dispatch => {};
