import evaluateRange from './range';
import evaluateBoolean from './range';

const valueEvaluationFuncs = {
  range: evaluateRange,
  boolean: evaluateBoolean,
};

export const evaluateValue = (value, valueEvaluation) => {
  if (!valueEvaluation) {
    return { text: value };
  }

  const evaluateFunc = valueEvaluationFuncs[valueEvaluation.template];
  if (!evaluateFunc) {
    return { text: value };
  }

  try {
    return evaluateFunc(value, valueEvaluation.configuration);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Wrong value evaluation', valueEvaluation);
    return { text: value };
  }
};
