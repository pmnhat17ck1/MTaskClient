import React, { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Col, Row } from 'antd';
import Button from '../../commons/Button';
import Text from '../../commons/Text';
import Colors from '../../configs/Colors';
import TextField from '@material-ui/core/TextField';
import { TESTID } from '../../configs/Constant';
import { axiosPost } from '../../utils/apis/axios';
import API from '../../configs/API';
import { ToastTopHelper } from '../../utils/utils';
import { isValidPhoneNumber } from '../../utils/Validation';
import styles from './styles';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const disabled = useRef(false);

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleClickSend = useCallback(async () => {
    disabled.current = true;
    if (phoneNumber && isValidPhoneNumber(phoneNumber)) {
      const { success } = await axiosPost(API.AUTH.FORGOT_PASSWORD, {
        username: phoneNumber,
      });
      if (success) {
        navigate('/forgot-password/verification', {
          state: {
            phone: phoneNumber,
          },
        });
      } else {
        disabled.current = false;
      }
    } else {
      disabled.current = false;
      ToastTopHelper.error(t('enter_the_correct_phone_number'));
    }
  }, [navigate, phoneNumber, t]);

  return (
    <div>
      <Row>
        <Col span={12} style={styles.colRight}>
          <Row
            data-testid={TESTID.ROW_FORGOT_PASSWORD}
            style={{ cursor: 'pointer' }}
            onClick={handleGoBack}
          >
            {/* <img src={BackIconBlack} /> */}
            <Text style={styles.textBack}>{t('back')}</Text>
          </Row>
          <div style={styles.bodyWrapper}>
            <div style={styles.forgotPassword}>
              <Text type="H2" bold>
                {t('forgot_password')}
              </Text>
              <Text style={styles.toGetVerification}>
                {t('to_get_a_verification')}
              </Text>
              <TextField
                id="outlined-number"
                label="Phone number"
                variant="standard"
                type="number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                style={styles.inputControl}
                fullWidth
                InputLabelProps={{
                  style: { color: Colors.Gray6 },
                }}
              />
              <Button
                testID={TESTID.FORGOT_PASSWORD_BUTTON}
                style={styles.button}
                type={!disabled.current ? 'primary' : 'disabled'}
                onClick={handleClickSend}
                title={t('send')}
                variant="contained"
                disableRipple
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ForgotPassword;
