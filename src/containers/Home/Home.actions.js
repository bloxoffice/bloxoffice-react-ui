import { INITIALACTION } from './Home.constants';

export const callAction = () => (dispatch) => {
  dispatch({
    type: INITIALACTION
  });
};
