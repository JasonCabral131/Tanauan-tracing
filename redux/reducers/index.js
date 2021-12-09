import {combineReducers} from 'redux';
import authReducer from './auth.reducers';
import timeInReducer from './timein.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  timeinUser: timeInReducer,
});

export default rootReducer;
