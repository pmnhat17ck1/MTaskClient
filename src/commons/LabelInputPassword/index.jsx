/* eslint-disable import/no-cycle */
import React, { memo } from 'react';
import { Input } from 'antd';
import styles from './styles';

const LabelInputPassword = ({
  isRequireLabel = true,
  textLabel = '',
  onChange,
  refInput,
  value = '',
  isShowPassword = false,
}) => {
  return (
    <div style={styles.labelInputPassword}>
      <Input.Password
        style={styles.input}
        onChange={onChange}
        ref={refInput}
        value={value}
        type="password"
        visibilityToggle={isShowPassword}
      />
    </div>
  );
};

export default memo(LabelInputPassword);
