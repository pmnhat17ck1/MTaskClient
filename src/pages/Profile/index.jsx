/* eslint-disable react/no-array-index-key */
import React, { useCallback, useMemo, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';
import { Input, Row, Col, DatePicker, Upload, Button } from 'antd';
import 'antd/dist/antd.css';
import { axiosPatch } from '../../utils/apis/axios';
import API from '../../configs/API';
import { TESTID } from '../../configs/Constant';
import { ToastTopHelper } from '../../utils/utils';
import styles from './styles';
import { updateProfileInfo } from '../../redux/actions/auth';
import './styles.css';

const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.account.user);
  const [userName, setUserName] = useState(user.name);
  const [userBirthdate, setUserBirthdate] = useState(user.birthday);
  const [image, setImage] = useState(user.avatar );
  const [imageUrl, setImageUrl] = useState('');
  const disableButton = useRef(true);
  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
  const formatUserBirthdate = moment(userBirthdate).format('DD.MM.YYYY');

  const listProfileItem = useMemo(() => {
    return [
      {
        title: t('user_name'),
        content: userName,
      },
      {
        title: t('date_of_birth'),
      },
      {
        title: t('country_or_region'),
        content: user.region ? user.region : t('vietnam'),
      },
      {
        title: t('text_email'),
        content: user.email,
      },
      {
        title: t('phone_number'),
        content: user.phone_number,
      },
    ];
  }, [t, user.email, user.phone_number, user.region, userName]);

  const handleClickChangePassword = useCallback(() => {
    navigate('/change-password');
  }, [navigate]);

  const handleChangeInput = (e, index) => {
    if (index === 0) {
      setUserName(e.target.value);
    }
    if (e.target.value !== '') {
      disableButton.current = false;
    }
  };

  const handleChangePicker = (date, dateString) => {
    setUserBirthdate(dateString);
    disableButton.current = false;
  };

  const handlePreview = async (file) => {
    setImageUrl(file);
    setImage(URL.createObjectURL(file.file.originFileObj));
    disableButton.current = false;
  };

  const handleSave = useCallback(async () => {
    const date = userBirthdate;
    const newdate = date?.split('/').reverse().join('-');
    const formData = new FormData();
    if (imageUrl) {
      formData.append(
        'avatar',
        imageUrl.file.originFileObj,
        imageUrl.file.originFileObj.name
      );
    }
    formData.append('birthday', newdate);
    formData.append('name', userName);

    const { success, data } = await axiosPatch(
      API.AUTH.CHANGE_PROFILE_INFO,
      formData,
      {
        'Content-Type': 'multipart/form-data',
      }
    );
    if (success) {
      disableButton.current = true;
      setUserBirthdate(userBirthdate);
      setUserName(userName);
      setImage(data.avatar);
      dispatch(updateProfileInfo(data));
      ToastTopHelper.success(t('update_successfully'));
    }
  }, [dispatch, imageUrl, t, userBirthdate, userName]);

  return (
    <div style={styles.body}>
      <Row style={styles.widthBody}>
        <Row style={styles.header}>
          <Col style={styles.wrapUploadImage}>
            <Upload
              data-testid={TESTID.UPLOAD_PROFILE}
              className="image-wrapper"
              maxCount={1}
              listType="picture-card"
              showUploadList={false}
              onChange={(file) => handlePreview(file)}
            >
              <img src={image} style={styles.avatar} alt="logo avatar icon" />
              <div className="icon-overlay">
              </div>
            </Upload>
            <div style={styles.superUser}>{t('super_user')}</div>
          </Col>
          <Row>
            <div style={styles.changePassword}>
              <Row>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={handleClickChangePassword}
                >
                  {t('change_password')}
                </div>
              </Row>
            </div>
          </Row>
          <a href={API.AUTH.TFA_PROFILE} rel="noreferrer">
            {t('two_factor_authentication_settings')}
          </a>
        </Row>
        {listProfileItem.map((item, index) => {
          return (
            <Row key={index} style={styles.profileItem}>
              <div style={styles.subName}>{item.title}</div>
              {index !== 1 && (
                <Input
                  style={styles.input}
                  value={item.content}
                  onChange={(e) => handleChangeInput(e, index)}
                  defaultValue=""
                  maxLength={64}
                />
              )}
              {index === 1 && (
                <DatePicker
                  defaultValue={
                    user.birthday
                      ? moment(formatUserBirthdate, dateFormatList[0])
                      : null
                  }
                  format={dateFormatList}
                  allowClear
                  style={styles.datePicker}
                  onChange={handleChangePicker}
                />
              )}
            </Row>
          );
        })}
        <Row style={styles.buttonSave}>
          <Button
            data-testid={TESTID.BUTTON_SAVE_PROFILE}
            disabled={disableButton.current}
            onClick={handleSave}
            style={styles.button}
          >
            {t('save')}
          </Button>
        </Row>
      </Row>
    </div>
  );
};

export default Profile;
