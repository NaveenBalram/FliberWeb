import { call, put, takeLatest } from 'redux-saga/effects';
import { getRequest, postRequest,deleteRequest } from '../api/APICalls';
import {
  
  getIncomeCategorySuccess,
  getIncomeFrequencySuccess,
  getIncomeTypeSuccess,
  addUserIncomeSuccess,
  getUserIncomeSuccess,
  deleteIncomeRequestSuccess,
} from '../actions/IncomeManagement';
import * as constants from '../constants/IncomeManagement';


function* getIncomeCategorySaga({meta: { resolve, reject } }) {
    try {
      const res = yield call(getRequest, 'IncomeCategory/');
      yield put(getIncomeCategorySuccess(res));
      yield call(resolve);
    } catch (error) {
      yield call(reject, error);
    }
}
function* getIncomeFrequencySaga({meta: { resolve, reject } }) {
    try {
      const res = yield call(getRequest, 'Frequency/');
      yield put(getIncomeFrequencySuccess(res));
      yield call(resolve);
    } catch (error) {
      yield call(reject, error);
    }
}
function* getIncomeTypeSaga({meta: { resolve, reject } }) {
    try {
      const res = yield call(getRequest, 'IncomeType/');
      yield put(getIncomeTypeSuccess(res));
      yield call(resolve);
    } catch (error) {
      yield call(reject, error);
    }
}
function* addUserIncomeSaga({payload,meta: { resolve, reject } }) {
  try {
    const res = yield call(postRequest, 'UserIncomes/',payload);
    yield put(addUserIncomeSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* getUserIncomeSaga({payload,meta: { resolve, reject } }) {
  try {
    const res = yield call(getRequest, 'RRCal/GetUserIncome/',payload);
    yield put(getUserIncomeSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* deleteUserIncomeSaga({payload,meta: { resolve, reject } }) {
  try {
    const res = yield call(deleteRequest, 'RRCal/DeleteUserIncome',payload);
    yield put(deleteIncomeRequestSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

export default function* sagas() {
 yield takeLatest(constants.GET_INCOME_CATEGORY_REQUEST,getIncomeCategorySaga);
  yield takeLatest(constants.GET_INCOME_FREQUENCY_REQUEST,getIncomeFrequencySaga);
  yield takeLatest(constants.GET_INCOME_TYPE_REQUEST,getIncomeTypeSaga);
  yield takeLatest(constants.SAVE_USER_INCOME_REQUEST,addUserIncomeSaga);
  yield takeLatest(constants.GET_USER_INCOME_REQUEST,getUserIncomeSaga);
  yield takeLatest(constants.DELETE_USER_INCOME_REQUEST,deleteUserIncomeSaga);
}
