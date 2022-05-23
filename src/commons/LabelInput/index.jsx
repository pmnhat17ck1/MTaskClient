/* eslint-disable import/no-cycle */
import React, { memo } from 'react';
import { Input } from 'antd';
import styles from './styles';
import Text from '../Text';

const LabelInput = ({
  isRequireLabel = true,
  textLabel = '',
  typeLabel = 'Label',
  styleLabel,
  onChange,
  refInput,
  value,
  placeholder,
}) => {
  return (
    <div style={styles.labelInput}>
      <Text type={typeLabel} style={styleLabel}>{textLabel}</Text>
      <Input
        placeholder={placeholder}
        value={value}
        style={styles.input}
        onChange={onChange}
        ref={refInput}
        type="text"
      />
    </div>
  );
};

export default memo(LabelInput);
