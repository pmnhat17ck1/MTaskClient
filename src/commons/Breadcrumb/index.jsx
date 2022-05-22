import React, { memo, useState } from 'react';
import { Typography, Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';
import './styles.css';
import styles from './styles';

const { Text } = Typography;

const BreadcrumbCustom = memo(({ items }) => {
  const location = useLocation();
  const [breadcrumbItem] = useState(items || []);
  const isActive = (index) => {
    const lengthItem = items.length - 1;
    return lengthItem === index;
  };
  return (
    <div style={styles.wrapper}>
      <Breadcrumb separator=">" style={styles.wrapper}>
        {breadcrumbItem?.map((item, index) => {
          return (
            <Breadcrumb.Item
              href={location?.pathname === item?.path ? null : item?.path}
              key={index.toString()}
            >
              <Text
                style={{
                  ...styles.textBreadcrumb,
                  ...(isActive(index) && styles.textBreadcrumbActive),
                }}
              >
                {item?.text}
              </Text>
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </div>
  );
});

export default BreadcrumbCustom;
