import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './redux/rootReducer';
import createSagaMiddleware from 'redux-saga'
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import InitialState from './state/initialState';


// import { programsWatcherSaga } from './redux/programs/sagas';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const sagaMiddleware = createSagaMiddleware();

const storeInstance = createStore(
  rootReducer, 
  InitialState,  
  composeEnhancers(
    // applyMiddleware(sagaMiddleware),
  )
);

// sagaMiddleware.run(programsWatcherSaga);


ReactDOM.render(
  <Provider store={storeInstance}>
    <App /> 
  </Provider>, 
  document.getElementById('root')
);
  
registerServiceWorker();

