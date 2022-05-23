import { useEffect } from 'react';

export const useIntervalCall = (callback, intervalTime) => {
  useEffect(() => {
    callback();
    const intervalWatchMultiConfigsId = setInterval(callback, intervalTime);

    return () => {
      clearInterval(intervalWatchMultiConfigsId);
    };
  }, [callback, intervalTime]);
};
