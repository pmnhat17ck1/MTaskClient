import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import { toast } from 'react-toastify';
import _ from 'lodash';
import Swal from 'sweetalert2';
import { t } from 'i18next';
import Colors from '../configs/Colors';

export const setAxiosDefaultAuthToken = (token) => {
  axios.defaults.headers.common.Accept = 'application/json';
  axios.defaults.headers.common.Authorization = `token ${token}`;
  reactLocalStorage.set('token', token);
};

export const removeAxiosDefaultAuthToken = () => {
  delete axios.defaults.headers.common.Accept;
  delete axios.defaults.headers.common.Authorization;
  reactLocalStorage.remove('token');
};

const notify = (type, msg) => {
  toast[type](msg, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const ToastTopHelper = {
  success: (msg) => {
    notify('success', msg);
  },
  error: (msg) => {
    notify('error', msg);
  },
};

export const upperCaseFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const formatVietnamese = (str) => {
  let newStr = str.toLowerCase();
  newStr = newStr.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  newStr = newStr.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  newStr = newStr.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  newStr = newStr.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  newStr = newStr.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  newStr = newStr.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  newStr = newStr.replace(/đ/g, 'd');
  return newStr;
};

export const convertToSlug = (text) => {
  let newText = text.substring(0, Math.max(80, text.length));
  newText = formatVietnamese(newText);
  return newText;
};

export const listChipsFromUnitNameFiltered = (unitsNameFiltered, units) => {
  const listChips = [];
  if (unitsNameFiltered && units) {
    units.forEach((item) => {
      if (unitsNameFiltered.includes(item.name)) {
        item?.chips?.forEach((itemChip) => {
          listChips.push(itemChip);
        });
      }
    });
  }
  return listChips;
};

export const getListUnitName = (units) => {
  if (units) {
    const listUnitsObject = _.groupBy(units, 'name');

    const listUnitNameArray = Object.entries(listUnitsObject).map((e) => ({
      [e[0]]: e[1],
    }));

    return listUnitNameArray?.map((item) => ({
      unit_name: Object.values(item)[0][0]?.name,
    }));
  }
};

const sweetAlert = ({
  confirmButtonText = t('confirm'),
  cancelButtonText = t('cancel'),
  onPressConfirm,
  onPressCancel,
  onPressBackdrop,
  ...rest
}) => {
  Swal.fire({
    confirmButtonText,
    cancelButtonText,
    confirmButtonColor: Colors.Primary,
    ...rest,
  }).then(({ isConfirmed, isDenied, isDismissed }) => {
    if (isConfirmed) {
      // eslint-disable-next-line no-unused-expressions
      onPressConfirm && onPressConfirm();
      return;
    }
    if (isDenied) {
      // eslint-disable-next-line no-unused-expressions
      onPressCancel && onPressCancel();
      return;
    }
    if (isDismissed) {
      // eslint-disable-next-line no-unused-expressions
      onPressBackdrop && onPressBackdrop();
    }
  });
};

export const SweetAlert = {
  success: ({ title = t('success'), text, ...rest }) =>
    sweetAlert({
      title,
      text,
      icon: 'success',
      ...rest,
    }),
  error: ({ title = t('error'), text, ...rest }) =>
    sweetAlert({
      title,
      text,
      icon: 'error',
      ...rest,
    }),
  warning: ({ title = t('warning'), text, ...rest }) =>
    sweetAlert({
      title,
      text,
      icon: 'warning',
      ...rest,
    }),
};

export const DateTimeFormat = {
  D_M_Y_H_M_S: 'DD.MM.YYYY HH:mm:ss',
  D_M_Y_H_M_S_RP: 'DD.MM.YYYY | HH:mm:ss',
  Y_M_D_H_M_S: 'YYYY-MM-DD HH:mm:ss',
  H_M_S_D_M_Y: 'HH:mm:ss DD-MM-YYYY',
};

export const Reg = {
  isNumber: /^-?\d*\.?\d*$/,
  isInteger: /^\d+$/,
};

export const getDiffTime = (date, now, comparableType) => {
  let durationTime = null;
  let comparedDate = date;
  switch (comparableType) {
    case 'MONTH':
      durationTime = now.diff(comparedDate, 'months');
      return [durationTime, durationTime > 1 ? t('months') : t('month')].join(
        ' '
      );
    default:
      const years = now.diff(comparedDate, 'year');
      comparedDate.add(years, 'years');
      const months = now.diff(comparedDate, 'months');
      durationTime = [
        years ? years : '',
        years ? (years > 1 ? t('years') : t('year')) : '',
        months ? months : '',
        months ? (months > 1 ? t('months') : t('month')) : '',
      ].join(' ');
      return durationTime;
  }
};
export const getBase64 = (file) => {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    console.log(reader.result);
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}

