import { combineReducers } from 'redux';

import session from './sessionReducer';
import { campaignData, previewData } from 'containers/Preview/Preview.redux';
import { CampaignsReducer } from 'containers/Campaigns/Campaigns.redux';
import { LoadingReducer } from './LoadingReducer';
import { AuthReducer } from 'containers/Login/Login.redux';
import { fpReducer } from 'containers/ForgotPassword/ForgotPassword.redux';
import { DonateReducer } from 'containers/Donate/Donate.redux';
import { paymentReducer } from 'containers/Payment/Payment.redux';
import { RegisterReducer } from 'containers/Register/Register.redux';
import { NpoReducer } from 'containers/Npo/Npo.redux';

const appReducer = combineReducers({
  session,
  campaignData,
  previewData,
  campaigns: CampaignsReducer,
  isLoading: LoadingReducer,
  auth: AuthReducer,
  fp: fpReducer,
  donate: DonateReducer,
  payment: paymentReducer,
  signup: RegisterReducer,
  npo: NpoReducer,
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
