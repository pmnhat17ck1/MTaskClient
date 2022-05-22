import axios from 'axios';
import { ToastTopHelper } from '../../utils/utils';

let isShowingToastify = false;
let messageTemp;

const parseErrorResponse = (error) => {
  let message;
  let data = {};
  if (
    error.response &&
    error.response.data &&
    error.response.data instanceof Object
  ) {
    data = error.response.data;
    const firstKey = Object.keys(error.response.data)[0];
    message = error.response.data[firstKey];

    if (message instanceof Array) {
      // eslint-disable-next-line prefer-destructuring
      message = message[0];
    }
  } else {
    message = error.message;
  }

  // NOTE: Hotfix for demo in this afternoon
  if (process.env.NODE_ENV !== 'production') {
    ToastTopHelper.error(message);
  } else {
    if (
      (!isShowingToastify || messageTemp !== message) &&
      message !== 'Request failed with status code 404'
    ) {
      messageTemp = message;
      isShowingToastify = true;
      ToastTopHelper.error(message);
      const to = setTimeout(() => {
        isShowingToastify = false;
        clearTimeout(to);
      }, 5000);
    }
  }

  return {
    success: false,
    error,
    message,
    data,
  };
};

async function axiosCall(method, ...args) {
  let response;
  try {
    response = await axios[method](...args);
  } catch (error) {
    return parseErrorResponse(error);
  }

  const { data } = response;
  if (response.status >= 200 && response.status < 300) {
    return {
      success: true,
      data,
    };
  }

  return {
    success: false,
    resp_status: response.status,
    data,
  };
}

export async function axiosPost(...options) {
  // eslint-disable-next-line no-return-await
  return await axiosCall('post', ...options);
}

export async function axiosGet(...options) {
  // eslint-disable-next-line no-return-await
  return await axiosCall('get', ...options);
}

export async function axiosPut(...options) {
  // eslint-disable-next-line no-return-await
  return await axiosCall('put', ...options);
}

export async function axiosPatch(...options) {
  // eslint-disable-next-line no-return-await
  return await axiosCall('patch', ...options);
}

export async function axiosDelete(...options) {
  // eslint-disable-next-line no-return-await
  return await axiosCall('delete', ...options);
}

export async function axiosGetExport(url, fileName) {
  const FileDownload = require('js-file-download');

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'blob', // Important
  });
  FileDownload(response.data, `${fileName}.xls`);
}
