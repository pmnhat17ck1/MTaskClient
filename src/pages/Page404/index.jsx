import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from '@material-ui/core/Link';
import Colors from '../../configs/Colors';
import Text from '../../commons/Text';
import styles from './styles';

export default function Page404() {
  const { t } = useTranslation();

  return (
    <div style={styles.wrapper}>
      <div style={styles.text404}>
        <Text fontSize="56px" center bold color={Colors.Primary}>
          404
        </Text>
      </div>
      <Text type="H2" center style={styles.textSorry}>
        {t('sorry_page_not_found')}
      </Text>
      <Link style={styles.text404} href="/" color="secondary">
        {t('back_to_home')}
      </Link>
    </div>
  );
}
