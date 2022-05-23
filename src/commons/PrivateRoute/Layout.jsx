import React, { memo, useCallback, useState } from 'react';
import Header from '../../pages/Header';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './styles';
import { Modal } from 'antd';
import SideBar from '../Sidebar'
import Text from '../Text'
import OtpInput from 'react-otp-input';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import API from '../../configs/API';
import { axiosPost, axiosGet } from '../../utils/apis/axios';
import { ToastTopHelper } from '../../utils/utils';
import { updateProfileInfo } from '../../redux/actions/auth';
import Timer from '../Timer'
import Button from '../Button';


const Layout = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.account.user) || {};

  const isDashboard = location.pathname === '/';
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [isSend, setIsSend] = useState(false);

  const handleOk = async () => {
    setIsModalVisible(false);
    if (code) {
      const { success, data } = await axiosPost(API.USER.ACTIVATION, {
        code: code
      });
      if (success) {
        ToastTopHelper.success(t('activation_successfully'));
        console.log('666666666', data?.data)
        dispatch(updateProfileInfo(data?.data?.dataValues))
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChangeCode = (data) => {
    setCode(data);
  };

  const getCode = useCallback(async (type = '') => {
    const { success } = await axiosGet(API.USER.GET_CODE);
    if (success) {
      type === 'resend' && ToastTopHelper.success(t('resend_code_successfully'));
    }
  }, [t])

  const handleSendAgain = useCallback(async () => {
    getCode('resend')
    setIsSend(true)
    setCountdown(60)
    // eslint-disable-next-line no-use-before-define
  }, [getCode]);


  return (
    <>
      <Header setIsModalVisible={setIsModalVisible} setIsSend={setIsSend} getCode={getCode} />
      <div style={styles.layout}>
        {
          !isDashboard ? <Outlet /> : (
            <>
              <SideBar />
              <div style={styles.table}>
                <Outlet />
              </div>
            </>

          )
        }
      </div>
      {
        !user?.isActive && <div style={styles.disable}></div>
      }
      <Modal title="Activation" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Text type="H2" bold>
          {t('verification')}
        </Text>
        <Text style={styles.toGetVerification}>
          {t('enter_the_verification_code')}
        </Text>
        <Text style={styles.textOtp}> {t('otp')}</Text>
        <div style={styles.otpInput}>
          <OtpInput
            value={code}
            onChange={handleChangeCode}
            numInputs={6}
            separator={<span style={{ width: '8px' }} />}
            shouldAutoFocus
            inputStyle={styles.inputOtp}
            focusStyle={styles.focusOtpInput}
          />
        </div>
        <Text style={styles.textCountDown}>
          <Timer
            seconds={countdown}
            isSend={isSend}
            setIsSend={setIsSend}
          />
        </Text>
        <Button
          type={isModalVisible ? 'secondary' : 'disabled'}
          onClick={handleSendAgain}
          style={styles.textSignUp}
        >
          {t('send_again')}
        </Button>
      </Modal>
    </>
  );
};

export default memo(Layout);
