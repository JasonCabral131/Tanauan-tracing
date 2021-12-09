import {authConstant} from '../constants';
import axiosInstance from '../../helpers/axiosInstance';
import {Alert} from 'react-native';
export const loginBranch = data => {
  return async dispatch => {
    try {
      dispatch({type: authConstant.LOGIN_REQUEST});
      const res = await axiosInstance.post('/api/branch/login-branch', data);
      if (res.status === 200) {
        dispatch({
          type: authConstant.LOGIN_SUCCESS,
          payload: {token: res.data.token, user: res.data.user},
        });
        Alert.alert('Success', 'Successfully Login');
        return;
      }
      dispatch({type: authConstant.LOGIN_FAILURE});
      Alert.alert('Failed', res.data.msg);
    } catch (e) {
      dispatch({type: authConstant.LOGIN_FAILURE});
      Alert.alert('Failed', 'Check Internet Connection');
    }
  };
};
export const logout = () => {
  return async dispatch => {
    dispatch({type: authConstant.LOGOUT_SUCCESS});
  };
};
