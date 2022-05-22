import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './redux/reducers/index';
import sagas from './redux/sagas/index';
import './utils/i18n';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import AppRouter from './AppRouter';
import GlobalLoading from './commons/Loading/globalLoading';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const pReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
const store = createStore(
  pReducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
    // other store enhancers if any
  )
);

const persistor = persistStore(store);

sagaMiddleware.run(sagas);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <GlobalLoading />
      <ToastContainer />
      <AppRouter />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
