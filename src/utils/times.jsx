import { useTranslation } from 'react-i18next';

export const useTimeDifference = (current, previous, symbol = false) => {
  const { t } = useTranslation();
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < msPerMinute) {
    let second = Math.round(elapsed / 1000);
    if (second < 0) {
      second = 0;
    }
    return `${second} ${symbol ? t('secs_ago') : t('seconds_ago')}`;
  }
  if (elapsed < msPerHour) {
    return `${Math.round(elapsed / msPerMinute)} ${
      symbol ? t('mins_ago') : t('minutes_ago')
    }`;
  }
  if (elapsed < msPerDay) {
    return `${Math.round(elapsed / msPerHour)} ${t('hours_ago')}`;
  }
  if (elapsed < msPerMonth) {
    return `${Math.round(elapsed / msPerDay)} ${t('days_ago')}`;
  }
  if (elapsed < msPerYear) {
    return `${Math.round(elapsed / msPerMonth)} ${t('months_ago')}`;
  }
  return `${Math.round(elapsed / msPerYear)} ${t('years_ago')}`;
};
