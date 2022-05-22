import CHANGE_LANGUAGE from '../../redux/actions/language';

const initialState = {
  language: 'vi',
};

// eslint-disable-next-line default-param-last
const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE: {
      return { language: action.language };
    }
    default:
      return state;
  }
};

export default languageReducer;
