const API_ROOT = process.env.REACT_APP_API_URL;
const API = {
  AUTH: {
    LOGIN: `${API_ROOT}/auth/login`,
    REGISTER: `${API_ROOT}/auth/register`,
    CHANGE_PASSWORD: `${API_ROOT}/change_password/`,
    FORGOT_PASSWORD: `${API_ROOT}/forgetPassword`,
    FORGOT_PASSWORD_VERIFY_OTP: `${API_ROOT}/forgetPassword/verify_otp`,
    RESET_PASSWORD: `${API_ROOT}/forgetPassword/resetPassword`,
  },
  USER:{
    GETALL: `${API_ROOT}/users`,
    DETAIL: (id) => `${API_ROOT}/users/${id}/detail`,
    UPDATE_PROFILE:(id)=> `${API_ROOT}/users/${id}/detail`,
    GET_CODE: `${API_ROOT}/users/getCode`,
    ACTIVATION: `${API_ROOT}/users/activation`,
    CHANGE_PASSWORD: `${API_ROOT}/users/changePassword`,
  },
  GROUP:{
    CREATE: `${API_ROOT}/groups/add`,
    UPDATE: (id)=> `${API_ROOT}/groups/${id}`,
    DELETE: (id)=> `${API_ROOT}/groups/${id}`,
    OWNER: `${API_ROOT}/groups/GroupOwner`,
    // UPDATE_PROFILE:(id)=> `${API_ROOT}/users/${id}/detail`,
    // GET_CODE: `${API_ROOT}/users/getCode`,
    // ACTIVATION: `${API_ROOT}/users/activation`,
    // CHANGE_PASSWORD: `${API_ROOT}/users/changePassword`,
  },
  TYPE:{
    GETALL: `${API_ROOT}/types`,
    CREATE: `${API_ROOT}/types/add`,
    UPDATE: (id)=> `${API_ROOT}/types/${id}`,
    DELETE: (id)=> `${API_ROOT}/types/${id}`,
  }
  ,
  STEP:{
    GETALL: `${API_ROOT}/steps`,
    CREATE: `${API_ROOT}/steps/add`,
    UPDATE: (id)=> `${API_ROOT}/steps/${id}`,
    DELETE: (id)=> `${API_ROOT}/steps/${id}`,
  }
  ,
  PRIORITY:{
    GETALL: `${API_ROOT}/priorities`,
    CREATE: `${API_ROOT}/priorities/add`,
    UPDATE: (id)=> `${API_ROOT}/priorities/${id}`,
    DELETE: (id)=> `${API_ROOT}/priorities/${id}`,
  },
  TASK:{
    GETALL: `${API_ROOT}/tasks`,
    GETALL_TASK_GROUP: `${API_ROOT}/tasks/taskOfGroup`,
    CREATE: `${API_ROOT}/tasks/add`,
    UPDATE: (id)=> `${API_ROOT}/tasks/${id}`,
    DELETE: (id)=> `${API_ROOT}/tasks/${id}`,
  }
};

export default API;
