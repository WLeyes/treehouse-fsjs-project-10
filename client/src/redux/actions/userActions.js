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

export const getUser = (user, history) => async dispatch => {
  await axios
    .get("http://localhost:5000/api/users", {
      auth: {
        username: user.emailAddress,
        password: user.password
      }
    })
    .then(response => {
      // console.log(response.config.headers.Authorization);
      const token = response.data;
      localStorage.setItem("user", JSON.stringify(token));
      setAuthToken(token);
      dispatch(setCurrentUser(token));
      history.push("/");
    })
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

export const setCurrentUser = token => {
  return {
    type: GET_USER,
    payload: token
  };
};

export const logoutUser = () => {
  setAuthToken(false);
  return {
    type: USER_LOGOUT
  };
};
