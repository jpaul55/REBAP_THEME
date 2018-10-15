//Register action here... BITCH!
import axios from "axios";
import { GET_ERRORS } from "./types";
import { GET_ERRORS_LOGIN } from "./types";
import { JUST_REGISTERED_STATUS } from "../actions/types";
import { SET_CURRENT_USER } from "../actions/types";
import { GET_EMAILPASS_USER } from "../actions/types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const registerUser = (userData, history) => dispatch => {
  var justReg = false;
  axios
    .post("/api/users/register", userData)
    .then(function(res) {
      justReg = true;

      history.push({
        pathname: "/loginauth",
        search: "?email=" + res.data.email,
        state: { approve: res.data.email }
      });

      dispatch({
        type: JUST_REGISTERED_STATUS,
        payload: justReg
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      //Set token to Auth header
      setAuthToken(token);

      const decoded = jwt_decode(token);

      //Set Current User
      dispatch(setCurrentUser(decoded));

      if (setAuthToken(true)) {
        history.push("/dashboard");
      }
    })
    .catch(function(err) {
      //   dispatch(setErrorLogin(err));
      history.push({
        pathname: "/loginconfirmed"
      });

      dispatch({
        type: GET_EMAILPASS_USER,
        payload: {}
      });

      dispatch({
        type: GET_ERRORS_LOGIN,
        payload: err.response.data
      });
    });
};

//Set logged in user

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const emailPass = data => {
  return {
    type: GET_EMAILPASS_USER,
    payload: data
  };
};

// export const setErrorLogin = err => {
//   return {
//     type: GET_ERRORS_LOGIN,
//     payload: err
//   };
// };

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
