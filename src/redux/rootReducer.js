import { combineReducers } from 'redux';

import fields from './fields/reducer';


const rootReducer = combineReducers({
  fields,
});

export default rootReducer;


// public selectors
