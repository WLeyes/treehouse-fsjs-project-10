import { GET_USER, GET_ERRORS } from "./types";
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
      const user = response.data;
      const token = response.config.headers.Authorization;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(token));
      setAuthToken(token);
      dispatch(setCurrentUser(user));
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

export const logoutUser = () => dispatch => {
  localStorage.clear();
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
