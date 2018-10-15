import { GET_EMAILPASS_USER } from "../actions/types";

const initialState = {
  passEmailAuth: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EMAILPASS_USER:
      return {
        ...state,
        passEmailAuth: action.type
      };
    default:
      return state;
  }
}
