/* eslint-disable no-console */
import axios from 'axios';

let called = false;

const ignoreDebugUrl = [
  'iot_dashboard/config_value_evaluations_v2/$',
  'iot_dashboard/chips/\\d+/$',
];

const hideConsole = (url) => {
  return !ignoreDebugUrl.some((shortUrl) => new RegExp(shortUrl).test(url));
};

export default function axiosDebugger() {
  if (called) {
    return;
  }
  called = true;
  if (process.env.REACT_APP_ENVIRONMENT === 'DEV') {
    axios.interceptors.request.use((request) => {
      hideConsole(request.url) &&
        console.log(`${request.method.toUpperCase()} ${request.url || ''}`);
      if (process.env.DEBUG_AXIOS_DETAIL_REQUEST) {
        if (request.data) {
          console.log(JSON.stringify(request.data));
        }
        console.log(request.headers);
      }
      return request;
    });

    axios.interceptors.response.use((response) => {
      hideConsole(response.config.url) &&
        console.log(`${response.status} ${response.config.url}`);
      if (process.env.DEBUG_AXIOS_DETAIL_REQUEST) {
        console.log(response.data);
      }
      return response;
    });
  }
}
