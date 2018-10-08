import reducer, { updateFields, getFields } from './reducer.js';
import * as types from './types';
import { fields } from './initialState';

describe('actions', () => {

  it('sends correct action', () => {
    const fields = {
      first_name: {
        name: 'First Name',
        type: 'string',
        used: true,
        custom: false,
      },
    };
    const updated = updateFields(fields);
    expect(updated).toEqual({type: types.UPDATE, data: fields})
    expect(reducer(undefined, updated)).toMatchSnapshot('updates a field')
  })

  it('updates the field correctly', () => {
    const fields = {
      address2: {
        name: 'Address2',
        type: 'string',
        used: true,
        custom: false,
      },
    };
    const action = updateFields(fields)
    const expected = reducer({}, action)
    expect(expected.fields.address2.used).toEqual(true);
  })

  it('getsInitial', ()=> {
    const action = getFields();
    const expected = reducer({}, action);
    expect(expected.fetching).toEqual(true);
  })
})