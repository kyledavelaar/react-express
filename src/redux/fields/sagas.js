import { select, takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import * as types from './types';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* fieldsWatcherSaga() {
  yield takeLatest(types.API_CALL_REQUEST, workerSaga);
}


export function fetchData(account_id) {
  const url = `https://mppqa-prgapi.mpulsemobile.com/api/accounts/${account_id}/custom_fields`;
  const headers = {
    "withCredentials": true,
    "oauth-token": '0d82ff83-6339-412f-bf60-bbe9faeaf669',
    "backdoor": "*world_number_one_sport=cricket!!"
  }

  return axios.get(url, {headers})
    .then(val => val)
    .catch(err => console.log('GET custom fields error: ', err))
}

// worker saga: makes the api call when watcher saga sees the action
export function* workerSaga() {
  try {
    const state = yield select();
    const account_id = state.user.user.account_id;
    const response = yield call(fetchData, account_id);
    if (response) {
      const data = response;
      // dispatch a success action to the store with the new data
      yield put({ type: types.API_CALL_SUCCESS, data });
    } else {
      yield put({ type: types.API_CALL_FAILURE, error: 'error getting fields' });
    }
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: types.API_CALL_FAILURE, error });
  }

}