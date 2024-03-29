import React, { useState, useCallback, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../../commons/Button';
import { login } from '../../redux/actions/auth';
import { useTranslation } from 'react-i18next';
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

import Colors from '../../configs/Colors';
import styles from './style';

const Login = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // eslint-disable-next-line no-shadow
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleSubmit = useCallback(() => {
    dispatch(login({ username, password }));
  }, [username, dispatch, password]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const onKeyPress = (e) => {
    if (e.charCode === 13) {
      dispatch(login({ username, password }));
    }
  };

  const handleClickShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const handleMouseDownPassword = useCallback((event) => {
    event.preventDefault();
  }, []);

  const handleClickForgotPassword = useCallback(() => {
    navigate('/forgot-password');
  }, [navigate]);

  const handleClickSignup = useCallback(() => {
   return navigate('/register');
  }, [navigate]);

  return (
      <Row style={styles.container}>
        <Col span={12} style={styles.col}>
          <div style={styles.authWrapper}>
            <Text type="H2" style={styles.textLogin} bold>
              {t('sign_in')}
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
            </div>
            <div
              onClick={handleClickForgotPassword}
              style={styles.wrapRememberMe}
            >
              <Text type="Body" style={styles.forgotPassword}>
                {t('forgot_your_password')}
              </Text>
            </div>
            <Button
              style={styles.button}
              type="primary"
              onClick={handleSubmit}
              title={t('sign_in')}
              variant="contained"
              disableripple="true"
            />
            <div style={styles.wrapSignUp}>
              <div> {t('dont_have_account')}</div>
              <div style={styles.textSignUp} onClick={handleClickSignup}> {t('sign_up')}</div>
            </div>
          </div>
        </Col>
      </Row>
  );
};
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    isLoggingIn: state.auth.isLoggingIn,
    account: state.auth.account,
    errorMsg: state.auth.errorMsg,
  };
};
const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
