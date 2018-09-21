import * as types from './types';
import { fields } from './initialState';
import { cloneDeep } from '../../utils/utils';

const initialState = {
  fetching: false,
  error: false,
  fields,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE:
      return {
        fetching: false,
        error: false,
        fields: {...action.data},
      }
    case types.API_CALL_REQUEST:
      const clonedState = cloneDeep(state);
      return { 
        ...clonedState, 
        fetching: true, 
        error: false 
      };
    case types.API_CALL_SUCCESS:
      const clonedFields = cloneDeep(fields);
      const customFields = addUsedProp(action.data.data);
      return { 
        fetching: false,
        error: false, 
        fields: {...clonedFields, ...customFields}
      };
    case types.API_CALL_FAILURE:
      return { 
        ...state, 
        fetching: false, 
        error: action.error 
      };
    default:
      return state;
  }
}

function addUsedProp(data) {
  Object.keys(data).forEach(key => {
    data[key].used = false;
    data[key].custom = true;
  })
  return data
}


// ACTION CREATORS
export const getFields = data => ({ type: types.API_CALL_REQUEST })
export const updateFields = data => ({ type: types.UPDATE, data })


export default reducer