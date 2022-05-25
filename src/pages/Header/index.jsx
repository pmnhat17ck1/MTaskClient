import { Col, Row, Dropdown, Divider } from 'antd';
import { Button } from '@material-ui/core';
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/auth';
import { useTranslation } from 'react-i18next';
import { TESTID } from '../../configs/Constant';
import Logo from '../../commons/Logo';
import styles from './styles';
import no_avatar from '../../images/no_avatar.png'
import Text from '../../commons/Text';
import { ToastTopHelper } from '../../utils/utils';
import {
  BellOutlined,
} from '@ant-design/icons';
import style from '../Login/style';
import API from '../../configs/API';
import { axiosPost, axiosGet, axiosPut, axiosDelete } from '../../utils/apis/axios';
import {beginWatchingData} from '../../utils/iot/Monitor'


const Header = ({ setIsModalVisible, setIsSend, getCode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useTranslation();
  const [showNoti, setShowNoti] = useState(false)
  const [hasNoti, setHasNoti] = useState({})
  const [noti, setNoti] = useState([])
  beginWatchingData((data)=>{
    setHasNoti(data)
  })
  const user = useSelector((state) => state.auth.account.user);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAllnoti = async() => {
    const { success, data } = await axiosGet(API.USER.NOTI);
    if (success) {
      setNoti(data?.data)
    }
  }
  useEffect(()=>{
    if(showNoti||hasNoti ){
      getAllnoti()
    }
  },[hasNoti, showNoti])

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
  const onClickDeleteAll = async () => {
    if(noti.length>0) {
      const { success } = await axiosDelete(API.USER.DELETE_NOTI);
      if (success) {
        getAllnoti()
      }
    }
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
          <Button style={{ display: 'flex', position: 'relative' }} onClick={() => setShowNoti(!showNoti)}>
            <BellOutlined />
            {
              noti.length > 0 && (
                <div style={{ position: 'absolute', right: 0, top: -10, background: '#49B1EA', borderRadius: 70, paddingLeft: 5, paddingRight: 5 }}>
                {noti?.length}
              </div>
              )
            }
           
            {
              !!showNoti && <div style={{
                overflow: 'auto', padding: 16,
                width: 300, height: 500, position: 'absolute', right: 65, top: 25, background: '#FAFBFC',borderRadius: 15, boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
              }}>
                <div style={{ height: 'auto', padding: 4, display: 'flex',flexDirection: 'column'}}>
                <Button style={{ background: '#FF4D4F', marginBottom: 16}} onClick={onClickDeleteAll}>
                  <Text type="H3" bold color="black">Delete ALL</Text>
                </Button>
                  {
                    !!noti && noti.length>0 && noti.map((item,index)=>{
                      return  <div style={{ display: 'flex', flexDirection: 'column' ,boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px", margin: 2, marginBottom: 16 , padding: 5, borderRadius: 5 }}>
                      <Text type="H3" bold>Title: {item?.title}</Text>
                      <Text type="H4" >Description:  {item?.description}</Text>
                      <Text type="H4" >Type: {item?.type}</Text>
                      </div>
                    })
                  }
                 
                </div>
              </div>
            }

          </Button>
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
