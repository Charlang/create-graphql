import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';

export const rootReducer = (history: any) =>
  combineReducers({
    form: formReducer,
    router: connectRouter(history),
  });

export default rootReducer;
