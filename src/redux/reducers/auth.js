import { LOGIN, LOGOUT, UPDATE_PERSONAL_INFO } from '../../redux/actions/auth';
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
      {
        const result = (action.data || action.params)
        initData(result?.data?.accessToken);
        return {
          ...state,
          isLoggedIn: true,
          isLoggingIn: false,
          account: {
            token: result?.data?.accessToken,
            refreshToken: result?.data?.refreshToken,
            user: {...result?.data}
          },
        };
      }
    case LOGIN.FAIL:
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: false,
        errorMsg: action.result.message,
      };
    case UPDATE_PERSONAL_INFO:
      return {
        ...state,
        account: {
          ...state?.account,
          user: {...state?.account?.user, isActive: action?.data?.isActive, avatar: action?.data?.avatar, phone_number: action?.data?.phone_number, email: action?.data?.email}
        },
      }
    case LOGOUT:
      removeAxiosDefaultAuthToken();
      return initialState;
    default:
      return state;
  }
};
