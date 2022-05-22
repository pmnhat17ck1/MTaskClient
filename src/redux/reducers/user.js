import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

export const reducers = {};

export const initialState = () =>
  Map({
    user: Map({}),
  });

export default handleActions(reducers, initialState());
