import { createRequestTypes } from './utils';

export const LOGIN = createRequestTypes('LOGIN');
export const login = (params) => ({ type: LOGIN.REQUEST, params });

export const LOGOUT = 'LOGOUT';
export const logout = () => ({ type: LOGOUT });

export const UPDATE_PERSONAL_INFO = 'UPDATE_PERSONAL_INFO';
export const updateProfileInfo = (data) => ({
  type: UPDATE_PERSONAL_INFO,
  data,
});
