import { TASK_GROUP } from '../../redux/actions/dashboard';

const initialState = {
    group: {},
};

// eslint-disable-next-line default-param-last
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case TASK_GROUP:
        return {
          ...state,
          group: {
            ...state?.group,
            ...action?.data
          },
        }
    default:
      return state;
  }
};
