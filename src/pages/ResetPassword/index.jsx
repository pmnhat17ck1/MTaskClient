import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Col, Input, Row } from 'antd';
import Button from '../../commons/Button';
import Text from '../../commons/Text';
import { TESTID } from '../../configs/Constant';
import API from '../../configs/API';
import { axiosPost } from '../../utils/apis/axios';
import { ToastTopHelper } from '../../utils/utils';
import styles from './styles';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const phoneNumber = location.state.phone;
  const disabled = useRef(false);

  const handleGoBack = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const handleChangePassword = useCallback(async () => {
    disabled.current = true;
    if (newPassword && newPassword === confirmPassword) {
      const { success } = await axiosPost(API.AUTH.RESET_PASSWORD, {
        username: phoneNumber,
        password: newPassword,
      });
      if (success) {
        navigate('/login', {
          state: {
            id: -1,
          },
        });
      } else {
        disabled.current = false;
      }
    } else {
      disabled.current = false;
      ToastTopHelper.error(t('confirm_password_does_not_match'));
    }
  }, [confirmPassword, navigate, newPassword, phoneNumber, t]);

  const listInputPassword = useMemo(() => {
    return [
      {
        label: t('text_password_new'),
        placeHolder: t('please_enter_new_password'),
        passwordText: newPassword,
        onChange: setNewPassword,
      },
      {
        label: t('confirm_new_password'),
        placeHolder: t('please_confirm_your_new_password'),
        passwordText: confirmPassword,
        onChange: setConfirmPassword,
      },
    ];
  }, [t, newPassword, confirmPassword]);

  return (
    <div>
      <Row>
        <Col span={12} style={styles.colRight}>
          <Row
            style={{ cursor: 'pointer' }}
            onClick={handleGoBack}
            data-testid={TESTID.ROW_RESET_PASSWORD}
          >
            <Text style={styles.textBack}>{t('back')}</Text>
          </Row>
          <div style={styles.bodyWrapper}>
            <div style={styles.forgotPassword}>
              <Text type="H2" bold>
                {t('change_password')}
              </Text>
              {listInputPassword.map((item, index) => (
                <section
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                >
                  <div style={styles.inputLabel}>{item.label}</div>
                  <Input.Password
                    maxLength={40}
                    placeholder={item.placeHolder}
                    value={item.passwordText}
                    onChange={(e) => item.onChange(e.target.value)}
                    // eslint-disable-next-line react/no-unstable-nested-components
                    iconRender={(visible) =>
                     <></>
                    }
                  />
                </section>
              ))}
              <Button
                testID={TESTID.CHANGE_PASSWORD_AT_LOGIN}
                style={styles.button}
                type={!disabled.current ? 'primary' : 'disabled'}
                onClick={handleChangePassword}
                title={t('change_password')}
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

export default ResetPassword;
