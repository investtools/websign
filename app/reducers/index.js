// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import certificatesDuck from '../CertSelector/certificatesDuck';
import certSelectorDuck from '../CertSelector/certSelectorDuck';

const rootReducer = combineReducers({
  counter,
  router,
  certificates: certificatesDuck.reducer,
  certSelector: certSelectorDuck.reducer,
});

export default rootReducer;
