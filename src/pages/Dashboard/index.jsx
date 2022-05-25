import React, { memo, useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@material-ui/core';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../../configs/API';
import { axiosPost, axiosGet, axiosPut, axiosDelete } from '../../utils/apis/axios';
import { ToastTopHelper } from '../../utils/utils';
import Text from '../../commons/Text'
import { useTranslation } from 'react-i18next';
import LabelInput from '../../commons/LabelInput'
import useStyles, { styles } from './styles';
import { useSelector } from 'react-redux';
import { Modal, Select, DatePicker } from 'antd';
const { Option } = Select;


const Dashboard = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [dataTaskTemp, setDataTaskTemp] = useState();
  const [tasks, setTasks] = useState([]);
  const groupActive = useSelector((state) => state.dashboard.group);

  const [dataServer, setDataServer] = useState({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAllTask = async () => {
    const { success, data } = await axiosPost(API.TASK.GETALL_TASK_GROUP, {
      groupId: groupActive?.id
    });
    if (success) {
      setTasks(data?.data)
    }
  }
  const createTask = () => {
    if (!groupActive) {
      return ToastTopHelper.error("Please Choose group or create group before create task!")
    }
    setIsModalVisible(true)
    setTitleModal('Create Task')
    setDataTaskTemp({})
  }
  const deleteTask = async () => {
    setIsModalVisible(false);
    const { success } = await axiosDelete(API.TASK.DELETE(dataTaskTemp?.id));
    if (success) {
      ToastTopHelper.success(t('Task delete successfully'));
      getAllTask()
    }
  }
  const handleOk = useCallback(async (type) => {
    setIsModalVisible(false);
    if (titleModal?.includes('Edit Task')) {
      const { success } = await axiosPut(API.TASK.UPDATE(dataTaskTemp?.id), {
        name: dataTaskTemp?.name,
        description: dataTaskTemp?.description,
        reporter: dataTaskTemp?.reporter,
        assignee: dataTaskTemp?.assignee,
        link_issue: dataTaskTemp?.link_issue,
        due_date: dataTaskTemp?.due_date,
        typeId: dataTaskTemp?.typeId,
        stepId: dataTaskTemp?.stepId,
        priorityId: dataTaskTemp?.priorityId,
      });
      if (success) {
        getAllTask()
        ToastTopHelper.success(t('Task successfully'));
      }
      return;
    }
    const { success } = await axiosPost(API.TASK.CREATE, {
      name: dataTaskTemp?.name,
      description: dataTaskTemp?.description,
      reporter: dataTaskTemp?.reporter,
      assignee: dataTaskTemp?.assignee,
      link_issue: dataTaskTemp?.link_issue,
      due_date: dataTaskTemp?.due_date,
      typeId: dataTaskTemp?.typeId,
      stepId: dataTaskTemp?.stepId,
      priorityId: dataTaskTemp?.priorityId,
      groupId: groupActive?.id
    });
    if (success) {
      getDataHas()
      getAllTask()
      ToastTopHelper.success(t('Create task successfully'));
    }
  }, [dataTaskTemp?.assignee, dataTaskTemp?.description, dataTaskTemp?.due_date, dataTaskTemp?.id, dataTaskTemp?.link_issue, dataTaskTemp?.name, dataTaskTemp?.priorityId, dataTaskTemp?.reporter, dataTaskTemp?.stepId, dataTaskTemp?.typeId, getAllTask, groupActive?.id, t, titleModal]);
  const onChangeInput = (e, title = '') => {
    switch (title) {
      case 'name':
        setDataTaskTemp((pre) => ({ ...pre, name: e.target.value }))
        break;
      case 'description':
        setDataTaskTemp((pre) => ({ ...pre, description: e.target.value }))
        break;
      case 'reporter':
        console.log('value', e)
        setDataTaskTemp((pre) => ({ ...pre, reporter: e }))
        break;
      case 'assignee':
        setDataTaskTemp((pre) => ({ ...pre, assignee: e }))
        break;
      case 'due_date':
        setDataTaskTemp((pre) => ({ ...pre, due_date: e }))
        break;
      case 'link_issue':
        setDataTaskTemp((pre) => ({ ...pre, link_issue: e.target.value }))
        break;
      case 'typeId':
        setDataTaskTemp((pre) => ({ ...pre, typeId: e }))
        break;
      case 'stepId':
        setDataTaskTemp((pre) => ({ ...pre, stepId: e }))
        break;
      case 'priorityId':
        setDataTaskTemp((pre) => ({ ...pre, priorityId: e }))
        break;
      default:
        return
    }
  }
  const listInput = useMemo(() => [
    {
      textLabel: 'Name',
      value: dataTaskTemp?.name,
      onChange: (e) => onChangeInput(e, 'name')
    },
    {
      textLabel: 'Description',
      value: dataTaskTemp?.description,
      onChange: (e) => onChangeInput(e, 'description')
    },
    {
      textLabel: 'Reporter',
      value: dataTaskTemp?.reporter,
    },
    {
      textLabel: 'Assignee',
      value: dataTaskTemp?.assignee,
    },
    {
      textLabel: 'Link issue',
      value: dataTaskTemp?.link_issue,
      onChange: (e) => onChangeInput(e, 'link_issue')
    },
    {
      textLabel: 'Due date',
      value: dataTaskTemp?.due_date,
      onChange: (date) => onChangeInput(date, 'due_date')
    },
    {
      textLabel: 'Type',
      value: dataTaskTemp?.typeId,

    },
    {
      textLabel: 'Step',
      value: dataTaskTemp?.stepId,

    },
    {
      textLabel: 'Priority',
      value: dataTaskTemp?.priorityId,

    },
  ], [dataTaskTemp])
  const handleCancel = () => {
    setIsModalVisible(false);
  }
  const getDataHas = async () => {
    const result1 = await axiosGet(API.TYPE.GETALL);
    if (result1?.success) {
      setDataServer((prev) => ({ ...prev, types: result1?.data?.data }))
    }
    const result2 = await axiosGet(API.STEP.GETALL);
    if (result2?.success) {
      setDataServer((prev) => ({ ...prev, steps: result2?.data?.data }))

    }
    const result3 = await axiosGet(API.PRIORITY.GETALL);
    if (result3?.success) {
      setDataServer((prev) => ({ ...prev, priorities: result3?.data?.data }))
    }
    const result4 = await axiosGet(API.USER.GETALL);
    if (result4?.success) {
      setDataServer((prev) => ({ ...prev, users: result4?.data?.data }))
    }
    const result5 = await axiosGet(API.TASK.GETALL);
    if (result5?.success) {
      setDataServer((prev) => ({ ...prev, tasks: result5?.data?.data }))
    }
  }
  const taskTodo = useMemo(() => {
    return tasks?.filter((item) => item.stepId === 1)
  }, [tasks])
  const taskProcessing = useMemo(() => {
    return tasks?.filter((item) => item.stepId === 2)
  }, [tasks])
  const taskReview = useMemo(() => {
    return tasks?.filter((item) => item.stepId === 3)
  }, [tasks])
  const taskDone = useMemo(() => {
    return tasks?.filter((item) => item.stepId === 4)
  }, [tasks])

  const onClickItem = (item) => {
    setIsModalVisible(true)
    setTitleModal('Edit Task')
    setDataTaskTemp((prev)=>({...prev, ...item}))
  }

  const Card = useCallback(({ item }) => {
    return <Button  onClick={()=>onClickItem(item)} style={{ marginBottom: 16, marginTop: 12,
      boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",}}>
      <div style={styles.card}>
      <Text type="H2" style={{paddingBottom:16}} bold>{item?.name}</Text>
      <div style={{ display: 'flex',alignItems: 'center', flexDirection: 'row', width: '100%' }}>
        <Text type="H4" bold style={{ paddingRight: 8 }}>Description:</Text>
        <Text type="H4"  >{item?.description}</Text>
      </div>
      <div style={{ display: 'flex',alignItems: 'center', flexDirection: 'row', width: '100%' }}>
        <Text type="H4" bold style={{ paddingRight: 8 }}>reporter:</Text>
        <Text type="H4" > {dataServer?.users?.filter((item1) => item1?.id == item?.reporter)[0]?.username}</Text>
      </div>
      <div style={{ display: 'flex',alignItems: 'center', flexDirection: 'row', width: '100%' }}>
        <Text type="H4" bold style={{ paddingRight: 8 }}>Assignee:</Text>
        <Text type="H4" >{dataServer?.users?.filter((item1) => item1?.id == item?.assignee)[0]?.username}</Text>
      </div>
      <div style={{ display: 'flex',alignItems: 'center', flexDirection: 'row', width: '100%' }}>
        <Text type="H4" bold style={{ paddingRight: 8 }}>Link issue:</Text>
        <Text type="H4">{item?.link_issue}</Text>
      </div>
      <div style={{ display: 'flex',alignItems: 'center', flexDirection: 'row', width: '100%' }}>
        <Text type="H4" bold style={{ paddingRight: 8 }}>Due date:</Text>
        <Text type="H4">{item?.due_date}</Text>
      </div>
      <div style={{ display: 'flex',alignItems: 'center' , flexDirection: 'row', width: '100%' }}>
        <Text type="H4" bold style={{ paddingRight: 8 }}>Type:</Text>
        <div style={{ border: 1, backgroundColor: item?.typeId === 1 ? "blue" : "red", paddingLeft: 12, paddingRight: 12 }}>
          <Text type="H4" color="white" bold>
            {
              dataServer?.types?.filter((item1) => item1?.id === item?.typeId)[0]?.name
            }
          </Text>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <Text type="H4" bold style={{ paddingRight: 8 }}>Priority:</Text>
        <Text type="H4" bold style={{ color: item?.priorityId === 1 ? "blue" : item?.priorityId === 2 ? "pink" : "red"}}>{dataServer?.priorities?.filter((item1) => item1?.id === item?.priorityId)[0]?.name}</Text>
      </div>
      </div>
   
    </Button>
  }, [dataServer?.priorities, dataServer?.types, dataServer?.users])

  useEffect(() => {
    getDataHas()
  }, [])

  useEffect(() => {
    if (groupActive) {
      getAllTask()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupActive])


  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'auto' }}>
      <Button onClick={createTask} style={styles.createTask}>
        <Text type="H4" color="white" bold>Create Task</Text>
      </Button>

      <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 16, overflow: 'auto', flexWrap: 'wrap', height: '100%' }}>
        <div style={styles.task}>
          <Text type="H4" bold>To do</Text>
          <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column' }}>
            {taskTodo?.length > 0 && taskTodo?.map((item, index) => {
              return <Card item={item} key={index.toString()}></Card>
            })}
          </div>

        </div>
        <div style={styles.task}>
          <Text type="H4" bold>Proccessing</Text>
          <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column' }}>
            {taskProcessing?.length > 0 && taskProcessing?.map((item, index) => {
              return <Card item={item} key={index.toString()}></Card>
            })}
          </div>
        </div>
        <div style={styles.task}>
          <Text type="H4" bold>Review</Text>
          <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column' }}>
            {taskReview?.length > 0 && taskReview?.map((item, index) => {
              return <Card item={item} key={index.toString()}></Card>
            })}
          </div>
        </div>
        <div style={styles.task}>
          <Text type="H4" bold>Done</Text>
          <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column' }}>
            {taskDone?.length > 0 && taskDone?.map((item, index) => {
              return <Card item={item} key={index.toString()}></Card>
            })}
          </div>

        </div>

      </div>


      <Modal title={titleModal} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        {
          !!listInput && listInput?.length > 0 && listInput.map((item, index) => {
            return <>
              {
                index === 2 && (
                  <>
                    <div style={{ display: 'flex' }}>
                      <Text type="H4" style={{ paddingRight: 16 }}>{item.textLabel}: </Text>
                      <Select
                        onChange={(e) => onChangeInput(e, 'reporter')}
                        style={{ flex: 1, width: 'auto' }}
                      >
                        {
                          dataServer?.users?.map((item, index) => {
                            return <Option key={index} value={item?.id}>{item?.username}</Option>
                          })
                        }

                      </Select>
                    </div>
                    <div style={{ paddingBottom: 16 }}></div>
                  </>
                )
              }
              {
                index === 3 && (
                  <>
                    <div style={{ display: 'flex' }}>
                      <Text type="H4" style={{ paddingRight: 16 }}>{item.textLabel}: </Text>
                      <Select
                        onChange={(e) => onChangeInput(e, 'assignee')}
                        style={{ flex: 1, width: 'auto' }}
                      >
                        {
                          dataServer?.users?.map((item, index) => {
                            return <Option key={index} value={item?.id}>{item?.username}</Option>
                          })
                        }
                      </Select>
                    </div>
                    <div style={{ paddingBottom: 16 }}></div>
                  </>
                )
              }
              {
                index === 5 && (
                  <>
                    <div style={{ display: 'flex' }}>
                      <Text type="H4" style={{ paddingRight: 16 }}>{item.textLabel}: </Text>
                      <DatePicker
                      
                        format={['DD/MM/YYYY']}
                        allowClear
                        style={styles.datePicker}
                        onChange={(date, dateString) => item.onChange(date)}
                      />
                    </div>
                    <div style={{ paddingBottom: 16 }}></div>
                  </>
                )
              }

              {
                index !== 2 && index !== 3 && index !== 5 && index !== 6 && index !== 7 && index !== 8 && <>
                  <LabelInput
                    textLabel={item.textLabel}
                    typeLabel="H4"
                    onChange={item.onChange}
                    value={item.value}
                  />
                  <div style={{ paddingBottom: 16 }}></div>
                </>
              }
              {
                index === 6 && (
                  <>
                    <div style={{ display: 'flex' }}>
                      <Text type="H4" style={{ paddingRight: 16 }}>{item.textLabel}: </Text>
                      <Select
                        onChange={(e) => onChangeInput(e, 'typeId')}
                        style={{ flex: 1, width: 'auto' }}
                      >
                        {
                          dataServer?.types?.map((item, index) => {
                            return <Option key={index} value={item?.id}>{item?.name}</Option>
                          })
                        }
                      </Select>
                    </div>
                    <div style={{ paddingBottom: 16 }}></div>
                  </>
                )
              }
              {
                index === 7 && (
                  <>
                    <div style={{ display: 'flex' }}>
                      <Text type="H4" style={{ paddingRight: 16 }}>{item.textLabel}: </Text>
                      <Select
                        onChange={(e) => onChangeInput(e, 'stepId')}
                        style={{ flex: 1, width: 'auto' }}
                      >
                        {
                          dataServer?.steps?.map((item, index) => {
                            return <Option key={index} value={item?.id}>{item?.name}</Option>
                          })
                        }
                      </Select>
                    </div>
                    <div style={{ paddingBottom: 16 }}></div>
                  </>
                )
              }
              {
                index === 8 && (
                  <>
                    <div style={{ display: 'flex' }}>
                      <Text type="H4" style={{ paddingRight: 16 }}>{item.textLabel}: </Text>
                      <Select
                        defaultValue={''}
                        onChange={(e) => onChangeInput(e, 'priorityId')}
                        style={{ flex: 1, width: 'auto' }}
                      >
                        {
                          dataServer?.priorities?.map((item, index) => {
                            return <Option key={index} value={item?.id}>{item?.name}</Option>
                          })
                        }
                      </Select>
                    </div>
                    <div style={{ paddingBottom: 16 }}></div>
                  </>
                )
              }



            </>
          })
        }


        <div style={{ display: 'flex', flex: 1, width: '100%', height: '100%' }}>
          {
            titleModal?.includes('Edit Task') && <Button className={classes.deleteGroup} onClick={deleteTask}>
              <Text type="H3" bold color="black">Delete</Text>
            </Button>
          }
        </div>

      </Modal>
    </div>
  );
};

export default Dashboard;
