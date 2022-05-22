export default (value, configuration) => {
  /*
  configuration: {
    ranges: [
      { start: 0.5, end: 1.5, evaluate: 'On' },
      { start: -0.5, end: 0.49, evaluate: {text: 'Off'} },
    ]
  }
 */
  if (!value) {
    // eslint-disable-next-line no-param-reassign
    value = 0;
  }

  for (let i = 0; i < configuration?.ranges?.length; i++) {
    const range = configuration.ranges[i];
    if (range.start <= value && value <= range.end) {
      return range.evaluate;
    }
    if (!range.end && range.start <= value) {
      return range.evaluate;
    }
  }
  return { text: value };
};
