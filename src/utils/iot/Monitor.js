import Pusher from 'pusher-js';
let pusher = null;

const getPusher = () => {
  if (!pusher) {
    pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY || '92edf92e65868532621f', {
      cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER || 'ap1',
    });
  }
  return pusher;
};

export const beginWatchingData = (topicCallback) => {
  const channel = getPusher().subscribe(
    `mtask`
  );
  channel.bind("notification", topicCallback);
};

