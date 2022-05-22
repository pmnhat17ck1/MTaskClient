import { LOGIN, LOGOUT } from '../../redux/actions/auth';
import { initData } from '../../utils/initData';
import { removeAxiosDefaultAuthToken } from '../../utils/utils';

const initialState = {
  errorMsg: '',

  isLoggedIn: false,
  account: {
    token: '',
    user: {},
  },
  isLoggingIn: false,
  units: [],
};

// eslint-disable-next-line default-param-last
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN.REQUEST:
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: true,
      };

    case LOGIN.SUCCESS:
      initData(action.data || action.params);
      return {
        ...state,
        isLoggedIn: true,
        isLoggingIn: false,
        account: action.data || action.params,
      };

    case LOGIN.FAIL:
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: false,
        errorMsg: action.result.message,
      };

    case LOGOUT:
      removeAxiosDefaultAuthToken();
      return initialState;


    default:
      return state;
  }
};
