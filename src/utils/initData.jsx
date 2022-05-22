import { setAxiosDefaultAuthToken } from '../utils/utils';

export const initData = ({ token }) => {
  setAxiosDefaultAuthToken(token);
};

export default { initData };
