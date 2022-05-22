import React from 'react';
import Colors from '../../configs/Colors';
import LoadingBar from 'react-top-loading-bar';

const Loading = React.forwardRef((_, ref) => {
  return <LoadingBar ref={ref} color={Colors.Primary} height={4} />;
});
const globalLoadingRef = React.createRef();

const GlobalLoading = () => {
  return <Loading ref={globalLoadingRef} />;
};
GlobalLoading.start = () => {
  globalLoadingRef.current?.continuousStart();
};
GlobalLoading.complete = () => {
  globalLoadingRef.current?.complete();
};

export default GlobalLoading;
