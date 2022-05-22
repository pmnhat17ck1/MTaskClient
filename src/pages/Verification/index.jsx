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
  const [countdown, setCountdown] = useState(60);
  const [checkSendAgain, setCheckSendAgain] = useState(false);
  const phoneNumber = location?.state?.phone;
  const disabled = useRef(false);

  const handleChangeCode = (data) => setCode(data);

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleClickVerify = useCallback(async () => {
    disabled.current = true;
    if (code && code.length === 6) {
      const { success } = await axiosPost(API.AUTH.FORGOT_PASSWORD_VERIFY_OTP, {
        username: phoneNumber,
        forgot_password_otp: code,
      });
      if (success) {
        navigate('/forgot-password/reset-password', {
          state: {
            phone: phoneNumber,
          },
        });
      } else {
        disabled.current = false;
      }
    } else {
      disabled.current = false;
      ToastTopHelper.error(t('confirm_code_does_not_match'));
    }
  }, [code, navigate, phoneNumber, t]);

  const handleSendAgain = useCallback(async () => {
    if (phoneNumber) {
      const { success } = await axiosPost(API.AUTH.FORGOT_PASSWORD, {
        username: phoneNumber,
      });
      if (success) {
        setCheckSendAgain(false);
        setCountdown(60);
        ToastTopHelper.success(t('resend_code_successfully'));
      } else {
        setCheckSendAgain(true);
      }
    }
  }, [phoneNumber, t]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCountdown((prevState) => {
        if (prevState === 0) {
          setCheckSendAgain(true);
        }
        return prevState === 0 ? prevState : prevState - 1;
      });
    }, 1000);
    return () => clearInterval(timerId);
  }, [checkSendAgain]);

  return (
    <div>
      <Row>
        <Col span={12} style={styles.colRight}>
          <Row
            data-testid={TESTID.ROW_VERIFICATION}
            style={{ cursor: 'pointer' }}
            onClick={handleGoBack}
          >
            <Text style={styles.textBack}>{t('back')}</Text>
          </Row>
          <div style={styles.bodyWrapper}>
            <div style={styles.forgotPassword}>
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
                  isInputNum
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
    </div>
  );
};

export default Verification;
