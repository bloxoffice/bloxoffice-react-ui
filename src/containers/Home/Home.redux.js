import { createStructuredSelector } from 'reselect';
import { initialState, INITIALACTION } from './Home.constants';

export const HomeSelector = createStructuredSelector({
  isLoading: (state) => state.home.isLoading,
});

export const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
  case INITIALACTION:
    return {
      ...state,
      isLoading: true
    };
  default:
    return state;
  }
};
