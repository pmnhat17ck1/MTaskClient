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
  const [email, setEmail] = useState('');
  const disabled = useRef(false);

  const handleGoBack = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const handleClickSend = useCallback(async () => {
    disabled.current = true;
    const { success, data } = await axiosPost(API.AUTH.FORGOT_PASSWORD, {
      email: email,
    });
    if (success) {
      navigate('/forgot-password/verification', {
        state: {
          email: email,
          data: data?.data,
        },
      });
    } else {
      disabled.current = false;
    }
  }, [email, navigate]);

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
              {t('forgot_password')}
            </Text>
            <Text style={styles.toGetVerification}>
              {t('to_get_a_verification')}
            </Text>
            <TextField
              id="outlined-number"
              label="Email"
              variant="standard"
              onChange={(e) => setEmail(e.target.value)}
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
  );
};

export default ForgotPassword;
