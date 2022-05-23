import React, { memo } from 'react';

import Text from '../Text';
const Logo = memo(() => {
  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
         <Text type="H4" bold color="#2684FF">
              M
            </Text>
            <Text type="H4" bold >
            Task
            </Text>
       
    </div>
  );
});

export default Logo;
