import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import OtpInput from 'react-otp-input';

import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';
import Button from '../../commons/Button';
import Text from '../../commons/Text';
import { TESTID } from '../../configs/Constant';
import API from '../../configs/API';
import { axiosPost } from '../../utils/apis/axios';
import { ToastTopHelper } from '../../utils/utils';
import styles from './styles';

const Verification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [code, setCode] = useState('');
  const emailFound = location?.state?.email;
  const dataFoundEmail = location?.state?.data;
  const [countdown, setCountdown] = useState(60);
  const [checkSendAgain, setCheckSendAgain] = useState(false);
  const [email, setEmail] = useState(emailFound);
  const [token, setToken] = useState(dataFoundEmail);


  const disabled = useRef(false);
  console.log('44444444', token)
  console.log('44444444', email)

  const handleChangeCode = (data) => setCode(data);

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleClickVerify = useCallback(async () => {
    disabled.current = true;
    if (code && code.length === 6) {
      const { success } = await axiosPost(API.AUTH.FORGOT_PASSWORD_VERIFY_OTP, {
        email: email,
        code: code
      });
      if (success) {
        navigate('/forgot-password/reset-password', {
          state: {
            email: email,
            verify: true,
          },
        });
      } else {
        disabled.current = false;
      }
    } else {
      disabled.current = false;
      ToastTopHelper.error(t('confirm_code_does_not_match'));
    }
  }, [code, email, navigate, t]);

  const handleSendAgain = useCallback(async () => {
    if (email) {
      const { success, data } = await axiosPost(API.AUTH.FORGOT_PASSWORD, {
        email: email,
      });
      if (success) {
        setToken(data?.data)
        setCheckSendAgain(false);
        setCountdown(60);
        ToastTopHelper.success(t('resend_code_successfully'));
      } 
    }
    setCheckSendAgain(true);
  }, [email, t]);

  useEffect(() => {
    if(token?.isStart) {
      const timerId = setInterval(() => {
        setCountdown((prevState) => {
          if (prevState === 0) {
            setCheckSendAgain(true);
          }
          return prevState === 0 ? prevState : prevState - 1;
        });
      }, 1000);
      return () => clearInterval(timerId);
    }
  
  }, [token?.isStart]);

  return (
      <Row style={styles.container}>
        <Col span={12} style={styles.col}>
          <div style={styles.bodyWrapper}>
            <div style={styles.forgotPassword}>
            <Text bold onClick={handleGoBack} style={{ paddingTop: 32, paddingBottom: 32, display: 'flex', flexDirection: 'row' }}>
              <span style={{ paddingRight: 16 }}>{"<"}</span>
              {t('back')}
            </Text>
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
              <Text style={styles.textCountDown}>{`(${countdown})`}</Text>
              <Button
                testID={TESTID.VERIFICATION_BUTTON}
                type={!disabled.current ? 'primary' : 'disabled'}
                style={styles.button}
                onClick={handleClickVerify}
                title={t('Verify')}
                variant="contained"
                disableRipple
              />
              <div style={styles.wrapSignUp}>
                <div> {t('did_not_receive_any_verification_code')}</div>
                <Button
                  testID={TESTID.VERIFICATION_BUTTON_SEND_AGAIN}
                  type={checkSendAgain ? 'secondary' : 'disabled'}
                  onClick={handleSendAgain}
                  style={styles.textSignUp}
                >
                  {t('send_again')}
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
  );
};

export default Verification;
