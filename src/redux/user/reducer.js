import * as types from './types';
import { user } from './initialState';
import { cloneDeep } from '../../utils/utils';

const initialState = {
  fetching: false,
  error: false,
  user,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE:
      return {
        fetching: false,
        error: false,
        user: {...action.data},
      }
    case types.API_CALL_REQUEST:
      const clonedState = cloneDeep(state);
      return { 
        ...clonedState, 
        fetching: true, 
        error: false 
      };
    case types.API_CALL_SUCCESS:
      return { 
        fetching: false,
        error: false, 
        user: {...action.data}
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


// ACTION CREATORS
export const getUser = data => ({ type: types.API_CALL_REQUEST })
export const updateUser = data => ({ type: types.UPDATE, data })


export default reducer