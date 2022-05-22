const API_ROOT = process.env.REACT_APP_API_URL;

const API = {
  AUTH: {
    LOGIN: `${API_ROOT}/accounts/login/`,
    CHANGE_PASSWORD: `${API_ROOT}/accounts/change_password/`,
    UPDATE_PROFILE: `${API_ROOT}/accounts/update_profile/manager/`,
    CHANGE_PROFILE_INFO: `${API_ROOT}/accounts/me/`,
    FORGOT_PASSWORD: `${API_ROOT}/accounts/forgot_password/`,
    FORGOT_PASSWORD_VERIFY_OTP: `${API_ROOT}/accounts/forgot_password/verify_otp/`,
    RESET_PASSWORD: `${API_ROOT}/accounts/forgot_password/set_password/`,
    TFA_PROFILE: `${API_ROOT}/account/two_factor/`,
    TFA_VERIFY: `${API_ROOT}/accounts/tfa_verify/`,
  },
};

export default API;
