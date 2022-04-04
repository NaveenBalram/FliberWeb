import { call, put, takeLatest } from 'redux-saga/effects';
import { getRequest, postRequest } from '../api/APICalls';
import {
  getAssetAllocationSuccess, getPreCalculationSuccess
} from '../actions/AssetAllocation';
import * as constants from '../constants/AssetAllocation';

function* getAssetAllocationSaga({ payload,meta: { resolve, reject } }) {
    try {
      const res = yield call(postRequest, 'master/Asset',payload);
      yield put(getAssetAllocationSuccess(res));
      yield call(resolve);
    } catch (error) {
      yield call(reject, error);
    }
  }

  
function* getPreCorpusCalculationSaga({ payload,meta: { resolve, reject } }) {
  try {
    const res = yield call(postRequest, 'cashladder/PreCashLadder/',payload);
    yield put(getPreCalculationSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

export default function* sagas() {
  yield takeLatest(constants.GET_ASSET_REQUEST, getAssetAllocationSaga);
  yield takeLatest(constants.GET_PRE_CORPUS_CALCULATION_REQUEST,getPreCorpusCalculationSaga);
}
