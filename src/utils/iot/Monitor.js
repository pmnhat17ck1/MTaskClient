import Pusher from 'pusher-js';
import { axiosPost } from 'utils/apis/axios';
import API from 'configs/API';
import {
  getChipGlobalState,
  getConfigGlobalState,
  setChipGlobalState,
  setConfigGlobalState,
} from './states';

Pusher.logToConsole = true;
let pusher = null;

const getPusher = () => {
  if (!pusher) {
    pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
      cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
      // eslint-disable-next-line no-unused-vars
      authorizer(channel, option) {
        return {
          async authorize(socketId, callback) {
            const { success, data } = await axiosPost(API.PUSHER_AUTH, {
              channel_name: channel.name,
              socket_id: socketId,
            });
            if (success) {
              callback(null, data);
            }
          },
        };
      },
    });
  }
  return pusher;
};

export const updateGlobalValue = (data) => {
  // eslint-disable-next-line no-console
  console.log('[IoT] update global value', data);
  const configValues = getConfigGlobalState('configValues');
  const newConfigValues = { ...configValues };
  newConfigValues[data.config] = data;
  setConfigGlobalState('configValues', newConfigValues);
};

const beginWatchingData = (user, topic, topicCallback) => {
  const channel = getPusher().subscribe(
    `private-iot-dashboard-user-monitoring-${user.id}`
  );
  channel.bind(topic, topicCallback.bind(channel));
};

let waitWatchConfigTimerId = null;
let waitWatchConfigIds = [];

export const realWatchMultiConfigs = async (user, configIds) => {
  const { success, data } = await axiosPost(API.WATCH_CONFIGS, {
    configs: configIds,
  });
  if (success) {
    const configValues = getConfigGlobalState('configValues');
    const newConfigValues = { ...configValues, ...data };
    setConfigGlobalState('configValues', newConfigValues);

    beginWatchingData(user, 'new-config-value', updateGlobalValue);
  }
};

export const watchMultiConfigs = async (user, configIds) => {
  waitWatchConfigIds = waitWatchConfigIds.concat(configIds);

  if (!waitWatchConfigTimerId) {
    waitWatchConfigTimerId = setTimeout(async () => {
      await realWatchMultiConfigs(user, waitWatchConfigIds);
      // eslint-disable-next-line no-console
      // console.log('[IoT] watch configs', waitWatchConfigIds);
      waitWatchConfigIds = [];
      clearTimeout(waitWatchConfigTimerId);
      waitWatchConfigTimerId = 0;
    }, 100);
  }
};

export const unwatchMultiConfigs = (user) => {
  // stopWatchingData(user);
};

let waitWatchChipTimerId = null;
let waitWatchChipIds = [];

export const updateChipGlobalValue = (data) => {
  // eslint-disable-next-line no-console
  console.log('[IoT] update chip global value', data);

  const chipValues = getChipGlobalState('chipValues');
  const newChipValues = { ...chipValues };
  const chipValue = newChipValues[data.chip];
  const { is_connected } = data;

  newChipValues[data.chip] = { ...chipValue, is_connected };
  setChipGlobalState('chipValues', newChipValues);
};

export const realWatchMultiChips = async (user, chipIds) => {
  const { success } = await axiosPost(API.WATCH_CHIPS, {
    chips: chipIds,
  });
  if (success) {
    beginWatchingData(user, 'new-chip-value', updateChipGlobalValue);
  }
};

export const watchMultiChips = async (user, chipIds) => {
  waitWatchChipIds = waitWatchChipIds.concat(chipIds);

  if (!waitWatchChipTimerId) {
    waitWatchChipTimerId = setTimeout(async () => {
      await realWatchMultiChips(user, waitWatchChipIds);
      // eslint-disable-next-line no-console
      console.log('[IoT] watch chips', waitWatchChipIds);
      waitWatchChipIds = [];
      clearTimeout(waitWatchChipTimerId);
      waitWatchChipTimerId = 0;
    }, 100);
  }
};
