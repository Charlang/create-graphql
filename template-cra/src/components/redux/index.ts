import { createStore as defaultCreateStore, compose as defaultCompose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import rootReducer from './reducers';

export const history = createBrowserHistory();

declare const module: INodeModule;
interface INodeModule {
  hot: any;
}

const createStore = () => {
  const composeEnhancers = composeWithDevTools({});
  const mids = applyMiddleware(routerMiddleware(history));

  const compose = process.env.NODE_ENV !== 'production' ? composeEnhancers : defaultCompose;

  const store = defaultCreateStore(rootReducer(history), compose(mids));

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        const nextReducers = rootReducer;
        store.replaceReducer(nextReducers(history));
      });
    }
  }

  return store;
};

export default createStore;