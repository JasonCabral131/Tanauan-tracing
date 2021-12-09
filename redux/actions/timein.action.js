import axiosInstance from '../../helpers/axiosInstance';
import {timeinConstant} from '../constants';

export const getTimeInUser = data => {
  return async dispatch => {
    try {
      dispatch({type: timeinConstant.TIME_IN_REQUEST});
      const res = await axiosInstance.post(
        '/api/timein/get-branch-time-in-information',
        data,
      );
      console.log(res.data);
      if (res.status === 200) {
        dispatch({
          type: timeinConstant.GET_TIME_SUCCESS,
          payload: {timeinUser: res.data.timeinUser},
        });
        return true;
      }
      console.log(res.data);
      dispatch({type: timeinConstant.GET_TIME_FAIL});
      return false;
    } catch (e) {
      console.log(res.response.data.msg);
      dispatch({type: timeinConstant.GET_TIME_FAIL});
      return false;
    }
  };
};
