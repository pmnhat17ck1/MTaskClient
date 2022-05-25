import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import user from './user';
import auth from './auth';
import dashboard from './dashboard';

export default combineReducers({
  routing,
  user,
  auth,
  dashboard,
});
