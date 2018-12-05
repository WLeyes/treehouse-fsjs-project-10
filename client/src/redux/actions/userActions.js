import { GET_USER, USER_LOGOUT, GET_ERRORS } from "./types";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

export const createNewUser = (data, history) => dispatch => {
  axios
    .post("http://localhost:5000/api/users", data)
    .then(response => history.push("/signin"))
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

export const getUser = (emailAddress, password, history) => async dispatch => {
  await axios
    .get("http://localhost:5000/api/users", {
      auth: {
        username: emailAddress,
        password: password
      }
    })
    .then(response => {
      setAuthToken(response.data);
      dispatch(setCurrentUser(response));
      history.push("/");
    })
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

export const setCurrentUser = response => {
  return {
    type: GET_USER,
    payload: response.data
  };
};

export const logoutUser = () => {
  setAuthToken(false);
  return {
    type: USER_LOGOUT
  };
};
