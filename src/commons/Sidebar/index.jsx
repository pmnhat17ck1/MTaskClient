import React, { memo, useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useStyles, { styles } from './styles';
import { Button } from '@material-ui/core';
import Text from '../Text'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import API from '../../configs/API';
import { axiosPost, axiosGet, axiosPut, axiosDelete } from '../../utils/apis/axios';
import { ToastTopHelper } from '../../utils/utils';
import { Modal } from 'antd';
import LabelInput from '../LabelInput'
import no_group from '../../images/no-group.png'


const SideBar = () => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [groups, setGroups] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [isActive, setIsActive] = useState({});
  const [dataGroupTemp, setDataGroupTemp] = useState();


  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const getOwnerGroup = useCallback(async () => {
    const { success, data } = await axiosGet(API.GROUP.OWNER);
    if (success) {
      setGroups((data?.data).sort(function (a, b) { return b - a }))
    }
  }, [])
  useEffect(() => {
    getOwnerGroup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const createGroup = () => {
    setDataGroupTemp((pre) => ({ ...pre, title: '', sub_title: '' }))
    setIsModalVisible(true);
    setTitleModal('Create group')
  }
  const deleteGroup = async () => {
    setIsModalVisible(false);
    const { success } = await axiosDelete(API.GROUP.DELETE(dataGroupTemp?.id));
    if (success) {
      ToastTopHelper.success(t('Group delete successfully'));
      getOwnerGroup()
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const inforGroup = (item) => {
    setIsModalVisible(true);
    setTitleModal('Information group')
    const foundGround = groups?.filter((group) => item?.id === group?.id)
    setDataGroupTemp((pre) => ({ ...pre, title: foundGround[0]?.title, sub_title: foundGround[0]?.sub_title, id: foundGround[0]?.id }))
  }
  const onChangeInput = (e, title = '') => {
    switch (title) {
      case 'title':
        setDataGroupTemp((pre) => ({ ...pre, title: e.target.value }))
        break;
      case 'sub_title':
        setDataGroupTemp((pre) => ({ ...pre, sub_title: e.target.value }))
        break;
      default:
        return
    }
  }
  const activeGroup = useCallback((item) => {
    setIsActive(item)
    navigate('/', {
      state: {
        group: item
      }
    })
  }, [navigate])
  const handleOk = useCallback(async (type) => {
    setIsModalVisible(false);
    if (titleModal?.includes('Information group')) {
      const { success, data } = await axiosPut(API.GROUP.UPDATE(dataGroupTemp?.id), {
        title: dataGroupTemp?.title,
        sub_title: dataGroupTemp?.sub_title,
      });
      if (success) {
        setDataGroupTemp(data?.data)
        getOwnerGroup()
        ToastTopHelper.success(t('Group update successfully'));
      }
      return;
    }
    const { success, data } = await axiosPost(API.GROUP.CREATE, {
      title: dataGroupTemp?.title,
      sub_title: dataGroupTemp?.sub_title,
    });
    if (success) {
      setDataGroupTemp(data?.data)
      getOwnerGroup()
      ToastTopHelper.success(t('Create group successfully'));
    }
  }, [dataGroupTemp?.id, dataGroupTemp?.sub_title, dataGroupTemp?.title, getOwnerGroup, t, titleModal]);

  const CurrentGroup = useCallback(({ item, index }) => {
    const isActives = isActive?.id === item?.id
    return <Button className={[classes.currentGroup, isActives && classes.active]} onClick={() => activeGroup(item, index)}>
      <div className={classes.imgCurrentGroup}>
        <img width={50} height={50} src={no_group} alt={'noGroup'} />
      </div>
      <div className={classes.contentCurrentGroup}>
        <div className={classes.textCurrentGroup}>
          {
            item?.title
          }

        </div>
        <div className={classes.textCurrentGroup}>
          {
            item?.sub_title
          }
        </div>
      </div>
      <Button className={classes.buttonEdit} onClick={() => inforGroup(item)}>
        Edit
      </Button>
    </Button>

  }, [activeGroup, classes.active, classes.buttonEdit, classes.contentCurrentGroup, classes.currentGroup, classes.imgCurrentGroup, classes.textCurrentGroup, inforGroup, isActive])
  return (
    <div className={classes.wrapper}>
      <div className={classes.sideBar}>
        <Text type="H4" bold style={{ paddingBottom: 16 }}>Group</Text>
        <div className={classes.groupRow}>
          <Button className={classes.createGroup} onClick={createGroup}>
            <Text type="H3" bold>+</Text>
          </Button>
          {
            !!groups && groups?.length > 0 && groups?.map((item, index) => {
              return <CurrentGroup item={item} index={index} key={index?.toString()} />
            })
          }
        </div>
      </div>
      <Modal title={titleModal} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <LabelInput
          textLabel={'Title'}
          typeLabel="H4"
          onChange={(e) => onChangeInput(e, 'title')}
          value={dataGroupTemp?.title}
          valueDe
        />
        <div style={{ paddingBottom: 16 }}></div>
        <LabelInput
          textLabel={'Sub title'}
          typeLabel="H4"
          onChange={(e) => onChangeInput(e, 'sub_title')}
          value={dataGroupTemp?.sub_title}
        />
        <div style={{ display: 'flex', flex: 1, width: '100%', height: '100%' }}>
          {

            titleModal?.includes('Information group') && <Button className={classes.deleteGroup} onClick={deleteGroup}>
              <Text type="H3" bold color="black">Delete</Text>
            </Button>
          }
        </div>

      </Modal>
    </div>
  );
};

export default memo(SideBar);
