import React from 'react';
import Colors from '../../configs/Colors';
import Text from '../Text';
import styles from './styles';

const ButtonStyle = {
  orange: {
    backgroundColor: Colors.Orange,
    borderRadius: '2px',
  },
  disabled: {
    backgroundColor: Colors.Gray4,
    borderRadius: '2px',
  },
  primary: {
    backgroundColor: Colors.Primary,
    borderRadius: '7px',
  },
};

const TextColor = {
  orange: Colors.White,
  disabled: Colors.Gray6,
  primary: Colors.White,
};

const TextSize = {
  H1: 30,
  H2: 24,
  H3: 20,
  H4: 16,
  Body: 14,
  Label: 12,
};

// Type
// orange, disabled

const Button = ({
  onClick,
  width,
  height,
  type,
  Icon,
  styleIcon,
  textType = 'H4',
  textSemiBold = true,
  style,
  title,
  children,
  testID,
}) => {
  const styleButton = ButtonStyle[type];
  const textColor = TextColor[type];

  const isDisabled = type === 'disabled' || type === 'disabledBorder';
  const isUnderline = type === 'underline';
  const textSize = TextSize[textType];
  return (
    <button
      data-testid={testID}
      style={{
        width,
        height,
        ...styles.button,
        ...styleButton,
        ...style,
      }}
      onClick={onClick}
      disabled={isDisabled}
      type="button"
    >
      <div style={styles.wrap}>
        {!!Icon && <Icon style={{ color: textColor, ...styleIcon }} />}
        {!!title && (
          <Text
            type={textType}
            semibold={textSemiBold}
            color={textColor}
            size={textSize}
            underline={isUnderline}
            style={Icon && styles.marginIcon}
            fontWeight={400}
          >
            {title}
          </Text>
        )}
        {children}
      </div>
    </button>
  );
};

export default Button;
