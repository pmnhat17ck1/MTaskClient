/* eslint-disable react/no-array-index-key */
import React, { useCallback, useMemo, useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';
import { Input, Row, Col, DatePicker, Upload, Button, Select } from 'antd';

import 'antd/dist/antd.css';
import 'antd/dist/antd.min.css';

import { axiosPatch, axiosGet, axiosPut } from '../../utils/apis/axios';
import API from '../../configs/API';
import { TESTID } from '../../configs/Constant';
import { ToastTopHelper, getBase64 } from '../../utils/utils';
import styles from './styles';
import { updateProfileInfo } from '../../redux/actions/auth';
import no_avatar from '../../images/no_avatar.png'
import './styles.css';

const { Option } = Select;

const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.account.user) || {};
  const [detail, setDetail] = useState({ email: user?.email, phone_number: user?.phone_number, avatar: user?.avatar })
  const [userBirthdate, setUserBirthdate] = useState(detail?.date);
  const [image, setImage] = useState(user?.avatar);
  const [imageUrl, setImageUrl] = useState('');
  const disableButton = useRef(true);
  const dateFormatList = ['DD/MM/YYYY'];
  const formatUserBirthdate = moment(userBirthdate).format('DD.MM.YYYY');

  const getDetail = useCallback(async () => {
    const { success, data } = await axiosGet(
      API.USER.DETAIL(user.id)
    );
    if (success) {
      setDetail((prevState) => ({
        ...prevState,
        ...data?.data,
      }));
    }
  }, [user.id]);

  useEffect(() => {
    getDetail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const listProfileItem = useMemo(() => {
    return [
      {
        title: t('First name'),
        content: detail?.first_name,
      },
      {
        title: t('Last name'),
        content: detail?.last_name,
      },
      {
        title: t('Major'),
        content: detail?.major,
      },
      {
        title: t('Cccd'),
        content: detail?.cccd,
      },
      {
        title: t('date_of_birth'),
      },
      {
        title: t('Description'),
        content: detail?.description,
      },
      {
        title: t('country_or_region'),
      },
      {
        title: t('text_email'),
        content: detail?.email,
      },
      {
        title: t('phone_number'),
        content: detail?.phone_number,
      },
    ];
  }, [detail?.cccd, detail?.description, detail?.email, detail?.first_name, detail?.last_name, detail?.major, detail?.phone_number, t]);

  const handleClickChangePassword = useCallback(() => {
    navigate('/change-password');
  }, [navigate]);

  const handleChangeInput = (e, index) => {
    switch (index) {
      case 0:
        setDetail((prev) => ({
          ...prev,
          first_name: e.target.value
        }))
        break
      case 1:
        setDetail((prev) => ({
          ...prev,
          last_name: e.target.value
        }))
        break
      case 2:
        setDetail((prev) => ({
          ...prev,
          major: e.target.value
        }))
        break
      case 3:
        setDetail((prev) => ({
          ...prev,
          cccd: e.target.value
        }))
        break
      case 4:
        setDetail((prev) => ({
          ...prev,
          date: new Date(e.target.value)
        }))
        break
      case 5:
        setDetail((prev) => ({
          ...prev,
          description: e.target.value
        }))
        break
      case 6:
        setDetail((prev) => ({
          ...prev,
          countryId: e.target.value
        }))
        break
      case 7:
        setDetail((prev) => ({
          ...prev,
          email: e.target.value
        }))
        break
      case 8:
        setDetail((prev) => ({
          ...prev,
          phone_number: e.target.value
        }))
        break
      default:
        return
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
    setDetail((prev) => ({
      ...prev,
      avatar: URL.createObjectURL(file.file.originFileObj)
    }))
    disableButton.current = false;
  };

  const handleSave = useCallback(async () => {
    const { success, data } = await axiosPut(
      API.USER.UPDATE_PROFILE(user?.id),
      {
        avatar: detail?.avatar,
        first_name: detail?.first_name,
        last_name: detail?.last_name,
        date: detail?.date,
        cccd: detail?.cccd,
        major: detail?.major,
        description: detail?.description,
        email: detail?.email,
        countryId: detail?.countryId,
        phone_number: detail?.phone_number,
      }
    );
    if (success) {
      disableButton.current = true;
      dispatch(updateProfileInfo(data?.data?.user));
      setDetail((pre)=>({...pre, ...data?.data?.detail}))
      ToastTopHelper.success(t('update_successfully'));
    }
  }, [detail, dispatch, t, user]);

  return (
    <Row style={styles.widthBody}>
      <Row style={styles.header}>
        <Col style={styles.wrapUploadImage}>
          <Upload
            className="image-wrapper"
            maxCount={1}
            listType="picture-card"
            showUploadList={false}
            onChange={(file) => handlePreview(file)}
          >
            {
              !image ? <img
                style={styles.imageProfile}
                src={no_avatar}
                alt="no avatar"
              /> : <img src={image} style={styles.avatar} alt="logo avatar icon" />
            }

            <div className="icon-overlay">
            </div>
          </Upload>
          <div style={styles.superUser}>{t('user')}</div>
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
      </Row>
      {listProfileItem.map((item, index) => {
        return (
          <Row key={index} style={styles.profileItem}>
            <div style={styles.subName}>{item.title}</div>

            {index === 4 && (
              <DatePicker
                defaultValue={
                  detail?.date
                    ? moment(formatUserBirthdate, dateFormatList[0])
                    : null
                }
                format={dateFormatList}
                allowClear
                style={styles.datePicker}
                onChange={handleChangePicker}
              />
            )}
            {index === 6 && (
              <Select
                defaultValue={user?.countryId}
                onChange={handleChangeInput}
              >
                <Option value={1}>Viet Nam</Option>
                <Option value={2}>US</Option>
              </Select>
            )}
            {
              index !== 4 && index !== 6 && <Input
                style={styles.input}
                value={item.content}
                onChange={(e) => handleChangeInput(e, index)}
                defaultValue=""
                maxLength={64}
              />
            }
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
  );
};

export default Profile;
