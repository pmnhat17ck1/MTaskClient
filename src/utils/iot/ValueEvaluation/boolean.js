export default (value, configuration) => {
  /*
  configuration: {
      'on': {
          'value': 1,
          'evaluate': {
              'text': 'On',
          },
      },
      'off': {
          'value': 0,

          'evaluate': {
              'text': 'Off',
          },
      },
  }
 */
  if (!value) {
    // eslint-disable-next-line no-param-reassign
    value = 0;
  }
  if (value === configuration.on?.value) {
    return configuration.on.evaluate;
  }
  if (value === configuration.on?.off) {
    return configuration.on.evaluate;
  }
  return { text: value };
};
