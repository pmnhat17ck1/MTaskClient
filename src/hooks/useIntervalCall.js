import { useEffect } from 'react';

export const useIntervalCall = (callback, intervalTime) => {
  useEffect(() => {
    callback();
    const intervalWatchMultiConfigsId = setInterval(callback, intervalTime);

    return () => {
      clearInterval(intervalWatchMultiConfigsId);
      // eslint-disable-next-line no-console
      // console.log('[IoT] unwatch config');
    };
  }, [callback, intervalTime]);
};
