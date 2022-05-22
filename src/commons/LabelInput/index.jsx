/* eslint-disable import/no-cycle */
import React, { memo } from 'react';
import { Input } from 'antd';
import styles from './styles';

const LabelInput = ({
  isRequireLabel = true,
  textLabel = '',
  onChange,
  refInput,
  value,
  placeholder,
}) => {
  return (
    <div style={styles.labelInput}>
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
