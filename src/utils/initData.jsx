import { setAxiosDefaultAuthToken } from '../utils/utils';

export const initData = (token='') => {
  return setAxiosDefaultAuthToken(token);
};

export default { initData };
