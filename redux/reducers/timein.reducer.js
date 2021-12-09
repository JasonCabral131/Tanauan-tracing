import {timeinConstant} from '../constants';
const INITIAL_STATE = {
  timeInUsers: [],
  loading: false,
};

const timeInReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case timeinConstant.TIME_IN_REQUEST:
      return (state = {
        ...state,
        loading: true,
      });
    case timeinConstant.GET_TIME_SUCCESS:
      return (state = {
        ...state,
        loading: false,
        timeInUsers: action.payload.timeinUser,
      });
    case timeinConstant.GET_TIME_SUCCESS:
      return (state = {
        ...state,
        loading: false,
      });
    default:
      return state;
  }
};
export default timeInReducer;
