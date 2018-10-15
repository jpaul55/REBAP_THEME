import { JUST_REGISTERED_STATUS } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case JUST_REGISTERED_STATUS:
      return action.payload;
    default:
      return state;
  }
}
