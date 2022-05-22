import { createGlobalState } from 'react-hooks-global-state';

const {
  useGlobalState: useConfigGlobalState,
  setGlobalState: setConfigGlobalState,
  getGlobalState: getConfigGlobalState,
} = createGlobalState({
  configValues: {},
  lang: 'en',
});

const {
  useGlobalState: useChipGlobalState,
  setGlobalState: setChipGlobalState,
  getGlobalState: getChipGlobalState,
} = createGlobalState({
  chipValues: {},
  lang: 'en',
});

export {
  useConfigGlobalState,
  setConfigGlobalState,
  getConfigGlobalState,
  useChipGlobalState,
  setChipGlobalState,
  getChipGlobalState,
};
