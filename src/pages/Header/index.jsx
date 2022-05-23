import { Col, Row, Dropdown, Divider } from 'antd';
import { Button } from '@material-ui/core';
import React, { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/auth';
import { useTranslation } from 'react-i18next';
import { TESTID } from '../../configs/Constant';
import Logo from '../../commons/Logo';
import styles from './styles';
import no_avatar from '../../images/no_avatar.png'
import Text from '../../commons/Text';

import style from '../Login/style';


const Header = ({ setIsModalVisible, setIsSend, getCode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.account.user);
  const isCurrentPage = useMemo(() => {
    if (location?.pathname === '/') {
      return { isMapSelected: true };
    }
    return false;
  }, [location.pathname]);

  const handleNavigatePage = useCallback(
    (page) => {
      if (page === '/logout') {
        return dispatch(logout());
      }
      if (page === '/logo') {
        if (location.pathname === '/') {
          return window.location.reload();
        }
        return navigate('/');
      }
      return navigate(page);
    },
    [dispatch, location.pathname, navigate]
  );
  const menu = (
    <div style={styles.subMenu}>
      <div
        key={2}
        style={styles.textProfile}
        onClick={() => handleNavigatePage('/profile')}
      >
        {t('profile')}
      </div>
      <Divider style={styles.divider} />
      <div
        key={3}
        style={styles.textSignOut}
        onClick={() => handleNavigatePage('/logout')}
      >
        {t('sign_out')}
      </div>
    </div>
  );

  const SectionTab = useCallback(
    ({ buttonStyle, onPress, textStyle, text, testID }) => {
      return (
        <Button
          data-testid={testID}
          style={buttonStyle}
          disableripple="true"
          onClick={onPress}
        >
          <div style={textStyle}>{text}</div>
        </Button>
      );
    },
    []
  );
  const onClickActive = () => {
    !!setIsModalVisible && setIsModalVisible(true)
    !!setIsSend && setIsSend(true)
    !!getCode && getCode()
  }
  return (
    <>
      <Row style={styles.header} wrap={false}>

        <Col style={styles.headerRight}>
          <div style={styles.headerIcon}>
            <Button
              data-testid={TESTID.LOGO_BUTTON}
              disableripple="true"
              onClick={() => handleNavigatePage('/logo')}
            >
              <Logo />
            </Button>
          </div>
          <div style={styles.flexNoWrap}>
            <SectionTab
              buttonStyle={styles.dashboard}
              onPress={() => handleNavigatePage('/')}
              textStyle={
                // isCurrentPage.isMapSelected
                //   ? styles.textColorGreen
                //   : styles.textColorGray
                styles.textColorGreen
              }
              text={t('dashboard')}
            />

          </div>
        </Col>
        {
          !user?.isActive && <Col style={styles.headerCenter}>
            <Text type="H4" bold >Please activation before use function!</Text>
            <Button
              style={styles.buttonDisable}
              disableripple="true"
              onClick={onClickActive}
            >
              <Text color="white" type="H4" bold >Click me!</Text>
            </Button>

          </Col>
        }
        <Col style={styles.headerLeft}>
          <div style={styles.flexNoWrap} data-testid={TESTID.HEADER_DROPDOWN}>
            <Dropdown
              overlay={menu}
              placement="bottomLeft"
              overlayStyle={styles.overlay}
              trigger={['click']}
            >
              {
                !!user.avatar ? <img
                  style={styles.imageProfile}
                  src={user.avatar}
                  alt="avatar"
                /> : <img
                  style={styles.imageProfile}
                  src={no_avatar}
                  alt="no avatar"
                />
              }

            </Dropdown>
          </div>
        </Col>
      </Row>
    </>

  );
};

export default Header;
