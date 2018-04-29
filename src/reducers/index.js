import { combineReducers } from 'redux';

import session from './sessionReducer';
import { HomeReducer } from 'containers/Home/Home.redux';

const appReducer = combineReducers({
  session,
  home: HomeReducer,
});

if (typeof window === 'undefined') {
  global.window = {}
}

const rootReducer = (state, action) => {
  if (action.type === 'DESTROY_SESSION') {
    state = undefined;
    window.__INITIAL_STATE__ = undefined;
  }

  return appReducer(state || window.__INITIAL_STATE__, action);
};

export default rootReducer;

export * from './sessionReducer';
