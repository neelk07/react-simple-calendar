import { combineReducers } from 'redux-immutable';

import { reducer as calendarReducer } from './components/Calendar/data/reducer';

export const reducer = combineReducers({
  calendar: calendarReducer
});
