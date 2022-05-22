import { Col, Menu, Row, Switch, Dropdown, Divider } from 'antd';
import { Button } from '@material-ui/core';
import React, { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/auth';
import { useTranslation } from 'react-i18next';
import { TESTID } from '../../configs/Constant';
import Text from '../../commons/Text';
import Colors from '../../configs/Colors';
import styles from './styles';

import packageJson from '../../../package.json';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.account.user);

  const isCurrentPage = useMemo(() => {
    if (location?.pathname === '/') {
      return { isMapSelected: true };
    }
    if (location?.pathname?.includes('/dashboard-list')) {
      return { isListSelected: true };
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
    <Menu>
      <Menu.ItemGroup>
        <Menu.Item
          key="1"
          style={styles.textProfile}
          onClick={() => handleNavigatePage('/profile')}
        >
          {t('profile')}
        </Menu.Item>
        <Divider style={styles.divider} />
        <Menu.Item
          key="2"
          style={styles.textSignOut}
          onClick={() => handleNavigatePage('/logout')}
        >
          {t('sign_out')}
        </Menu.Item>
        <Divider style={styles.divider} />
        <Text color={Colors.Gray13} right>
          v{packageJson.version}
        </Text>
      </Menu.ItemGroup>
    </Menu>
  );

  const SectionTab = useCallback(
    ({ buttonStyle, onPress, imgSrc, textStyle, text, testID }) => {
      return (
        <Button
          data-testid={testID}
          style={buttonStyle}
          disableripple="true"
          onClick={onPress}
        >
          {/* <img src={imgSrc} /> */}
          <div style={textStyle}>{text}</div>
        </Button>
      );
    },
    []
  );
  return (
    <Row style={styles.header} wrap={false}>
      <Col style={styles.headerRight}>
        <div style={styles.headerIcon}>
          <Button
            data-testid={TESTID.LOGO_BUTTON}
            disableripple="true"
            onClick={() => handleNavigatePage('/logo')}
          >
            {/* <img src={LogoCompany} /> */}
          </Button>
        </div>
        <div style={styles.flexNoWrap}>
          <SectionTab
            testID={TESTID.HOME_SECTION}
            buttonStyle={styles.imageLogoMap}
            onPress={() => handleNavigatePage('/')}
            imgSrc={
              isCurrentPage.isMapSelected
                // ? logoMapColorPrimary
                // : logoMapColorGray
            }
            textStyle={
              isCurrentPage.isMapSelected
                ? styles.textColorGreen
                : styles.textColorGray
            }
            text={t('map')}
          />
          <SectionTab
            testID={TESTID.LIST_SECTION}
            buttonStyle={styles.imageLogoList}
            onPress={() => handleNavigatePage('/dashboard-list')}
            imgSrc={
              isCurrentPage.isListSelected
                // ? logoListColorPrimary
                // : logoListColorGray
            }
            textStyle={
              isCurrentPage.isListSelected
                ? styles.textColorGreen
                : styles.textColorGray
            }
            text={t('list')}
          />
        </div>
      </Col>
      <Col style={styles.headerLeft}>
        {false /* temporarily disable */ && (
          <div style={styles.flexNoWrap}>
            <div style={styles.textDarkMode}> {t('dark_mode')}</div>
            <div style={styles.iconSwitch}>
              <Switch />
            </div>
          </div>
        )}
        <div style={styles.flexNoWrap} data-testid={TESTID.HEADER_DROPDOWN}>
          <Dropdown
            overlay={menu}
            placement="bottomLeft"
            overlayStyle={styles.overlay}
            trigger={['click']}
          >
            <img
              style={styles.imageProfile}
              src={user.avatar}
              alt="logoProfile icon"
            />
          </Dropdown>
        </div>
      </Col>
    </Row>
  );
};

export default Header;
