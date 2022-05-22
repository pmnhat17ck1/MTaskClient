import API from '../../configs/API';
import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import { LOGIN, LOGOUT } from '../../redux/actions/auth';
import { axiosPost } from '../../utils/apis/axios';

function* login(obj) {
  const { params = {} } = obj;
  const result = yield axiosPost(API.AUTH.LOGIN, params);
  const { data } = result;
  if (result.success) {
    yield put({
      type: LOGIN.SUCCESS,
      data,
    });
  } else {
    yield put({
      type: LOGIN.FAIL,
      result,
    });
  }
}


export default function* () {
  yield takeEvery(LOGIN.REQUEST, login);
}
