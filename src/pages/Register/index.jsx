import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../../commons/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import Text from '../../commons/Text';
import 'react-toastify/dist/ReactToastify.css';
import { Col, Row } from 'antd';
import 'antd/dist/antd.min.css';
import { axiosPost } from '../../utils/apis/axios';
import { useTranslation } from 'react-i18next';
import API from '../../configs/API';
import Colors from '../../configs/Colors';
import styles from './style';
import { ToastTopHelper } from '../../utils/utils';

const Register = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [cccd, setCccd] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const disabled = useRef(false);

  // eslint-disable-next-line no-shadow
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleSubmit = useCallback(async () => {
    disabled.current = true;
      const { success } = await axiosPost(API.AUTH.REGISTER, {
        username: username,
        email: email,
        password: password,
        phone_number: phoneNumber,
        cccd: cccd,
      });
      if (success) {
        navigate('/login');
        ToastTopHelper.success(t('register_successfully'));
      } 
      disabled.current = false;
  }, [cccd, email, navigate, password, phoneNumber, t, username]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const onKeyPress = (e) => {
    if (e.charCode === 13) {
      handleSubmit()
    }
  };

  const handleClickShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const handleMouseDownPassword = useCallback((event) => {
    event.preventDefault();
  }, []);

  const handleClickSignin = useCallback(() => {
    return navigate(-1);
  }, [navigate]);

  return (
    <Row style={styles.container}>
      <Col span={12} style={styles.col}>
        <div style={styles.authWrapper}>
          <Text type="H2" style={styles.textLogin} bold>
            {t('sign_up')}
          </Text>
          <div>
            <TextField
              id="standard-basic"
              label="Username"
              variant="standard"
              onChange={(e) => setUsername(e.target.value)}
              style={styles.inputControl}
              fullWidth
              onKeyPress={onKeyPress}
              inputProps={{ 'data-testid': 'content-textfield' }}
              InputLabelProps={{
                style: { color: Colors.Gray6 },
              }}
            />
            <FormControl style={{ width: '100%' }}>
              <InputLabel
                htmlFor="standard-adornment-password"
                style={styles.textEnterPassword}
              >
                {t('enter_password')}
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                inputProps={{ 'data-testid': 'content-input' }}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={onKeyPress}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <TextField
              id="standard-basic"
              label="Phone"
              variant="standard"
              onChange={(e) => setphoneNumber(e.target.value)}
              style={styles.inputControl}
              fullWidth
              onKeyPress={onKeyPress}
              inputProps={{ 'data-testid': 'content-textfield' }}
              InputLabelProps={{
                style: { color: Colors.Gray6, },
              }}
            />
            <TextField
              id="standard-basic"
              label="Cccd"
              variant="standard"
              onChange={(e) => setCccd(e.target.value)}
              style={styles.inputControl}
              fullWidth
              onKeyPress={onKeyPress}
              inputProps={{ 'data-testid': 'content-textfield' }}
              InputLabelProps={{
                style: { color: Colors.Gray6 },
              }}
            />
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              onChange={(e) => setEmail(e.target.value)}
              style={styles.inputControl}
              fullWidth
              onKeyPress={onKeyPress}
              inputProps={{ 'data-testid': 'content-textfield' }}
              InputLabelProps={{
                style: { color: Colors.Gray6 },
              }}
            />
          </div>

          <Button
            style={styles.button}
            type="primary"
            onClick={handleSubmit}
            title={t('sign_up')}
            variant="contained"
            disableripple="true"
          />
          <div style={styles.wrapSignUp}>
            <div> {t('you_have_account')}</div>
            <div style={styles.textSignUp} onClick={handleClickSignin}> {t('sign_in')}</div>
          </div>
        </div>
      </Col>
    </Row>
  );
};
export default Register
