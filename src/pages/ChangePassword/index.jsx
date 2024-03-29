import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import API from '../../configs/API';
import { axiosPost } from '../../utils/apis/axios';
import { logout } from '../../redux/actions/auth';
import { Input, Modal } from 'antd';
import Button from '../../commons/Button';
import { TESTID } from '../../configs/Constant';
import Text from '../../commons/Text';
import Colors from '../../configs/Colors';
import styles from './styles';
import './styles.css';

const ChangePassword = () => {
  const { t } = useTranslation();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const doLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const listInputPassword = useMemo(() => {
    return [
      {
        label: t('current_password'),
        placeHolder: t('please_enter_your_current_password'),
        passwordText: currentPassword,
        onChange: setCurrentPassword,
      },
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
  }, [t, currentPassword, newPassword, confirmPassword]);

  const resetInputField = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleChange = useCallback(async () => {
    const { success } = await axiosPost(API.USER.CHANGE_PASSWORD, {
      oldPassword: currentPassword,
      password: newPassword,
      passwordConfirm: confirmPassword,
    });
    if (success) {
      setIsModalVisible(true);
    } else {
      resetInputField();
    }
  }, [confirmPassword, currentPassword, newPassword]);

  return (
    <>
      <div style={styles.wrapper}>
        <div style={styles.body}>
          <div style={styles.widthBody}>
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
              testID={TESTID.BUTTON_CHANGE_PASSWORD}
              style={styles.button}
              type="primary"
              onClick={handleChange}
              title={t('change_password')}
              variant="contained"
              disableripple="true"
            />
          </div>
        </div>
      </div>
      <Modal
        visible={isModalVisible}
        closable={false}
        onOk={doLogout}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={doLogout}
            title={t('ok')}
            variant="contained"
            disableripple="true"
          />,
        ]}
      >
        <Text bold>{t('success_please_login_again')}</Text>
      </Modal>
    </>
  );
};

export default ChangePassword;
