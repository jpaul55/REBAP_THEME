import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import justRegReducer from "./justRegReDucer";
import loginErrorReducer from "./loginErrorReducer";
import emailPassReducer from "./emailPassReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  errorsLogin: loginErrorReducer,
  justRegistered: justRegReducer,
  passEmailAuth: emailPassReducer
});
