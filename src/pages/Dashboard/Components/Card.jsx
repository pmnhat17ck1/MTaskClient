import React, { memo } from 'react';
import { Button } from '@material-ui/core';
import Text from '../../../commons/Text'
import useStyles, { styles } from './CardStyles';

const Card = ({onClickItem, item, dataServer}) => {
  const classes = useStyles();
  const onClickItemCard = () => {
    !!onClickItem && onClickItem()
  }
  return (
    <Button onClick={() => onClickItemCard(item)} className={classes.CardButton}>
      <div style={styles.card}>
        <Text type="H2" style={{ paddingBottom: 16 }} bold>EP-{item?.id}:{` `}{item?.name}</Text>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', width: '100%' }}>
          <Text type="H4" bold style={{ paddingRight: 8 }}>Description:</Text>
          <Text type="H4"  >{item?.description}</Text>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', width: '100%' }}>
          <Text type="H4" bold style={{ paddingRight: 8 }}>reporter:</Text>
          <Text type="H4" > {dataServer?.users?.filter((item1) => item1?.id == item?.reporter)[0]?.username}</Text>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', width: '100%' }}>
          <Text type="H4" bold style={{ paddingRight: 8 }}>Assignee:</Text>
          <Text type="H4" >{dataServer?.users?.filter((item1) => item1?.id == item?.assignee)[0]?.username}</Text>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', width: '100%' }}>
          <Text type="H4" bold style={{ paddingRight: 8 }}>Link issue:</Text>
          <Text type="H4">{item?.link_issue}</Text>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', width: '100%' }}>
          <Text type="H4" bold style={{ paddingRight: 8 }}>Due date:</Text>
          <Text type="H4">{item?.due_date}</Text>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', width: '100%' }}>
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
          <Text type="H4" bold style={{ color: item?.priorityId === 1 ? "blue" : item?.priorityId === 2 ? "pink" : "red" }}>{dataServer?.priorities?.filter((item1) => item1?.id === item?.priorityId)[0]?.name}</Text>
        </div>
      </div>

    </Button>
  );
};

export default memo(Card);
