// import test from 'tape';
import { takeLatest, call, put, take, select } from "redux-saga/effects";
// import { cloneableGenerator } from 'redux-saga/utils';
import { expectSaga } from 'redux-saga-test-plan';
// import * as matchers from 'redux-saga-test-plan/matchers';
// import { throwError } from 'redux-saga-test-plan/providers';

import * as types from './types';
import { fieldsWatcherSaga, workerSaga, fetchData } from './sagas';
// import { getInitialValues } from './reducer';

describe('Fields Saga Tests', () => {
  const user = {
    account_id: 12,
    email: 'windy@gmail.com',
  }

  // it('calls workerSaga with success message', () => {
  //   const iterator = workerSaga();
  //   expect(iterator.next().value).toEqual(select());
  //   expect(iterator.next().value).toEqual(call(fetchData));
  
  //   const data = {}
  //   expect(iterator.next(data).value)
  //     .toEqual(put({ type: types.API_CALL_SUCCESS, data }))
  
  // it('calls workerSaga with error message', () => {
  //   const iterator = workerSaga();
  //   expect(iterator.next().value).toEqual(call(fetchData))
  
  //   const error = {}
  //   expect(iterator.throw(error).value)
  //     .toEqual(put({ type: types.API_CALL_FAILURE, error }))
  // })
})

