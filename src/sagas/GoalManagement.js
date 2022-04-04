import { call, put, takeLatest } from 'redux-saga/effects';
import { getRequest, postRequest,deleteRequest } from '../api/APICalls';
import {
  getGoalBucketSuccess,
  getGoalCategorySuccess,
  getGoalFrequencySuccess,
  getGoalTypeSuccess,
  addUserGoalSuccess,
  getUserGoalSuccess,
  deleteGoalRequestSuccess,
  getGoalRateSuccess
} from '../actions/GoalManagement';
import * as constants from '../constants/GoalManagement';

function* getGoalBucketSaga({meta: { resolve, reject } }) {
    try {
      const res = yield call(getRequest, 'GoalBucket/');
      yield put(getGoalBucketSuccess(res));
      yield call(resolve);
    } catch (error) {
      yield call(reject, error);
    }
}

function* getGoalCategorySaga({meta: { resolve, reject } }) {
    try {
      const res = yield call(getRequest, 'GoalCategory/');
      yield put(getGoalCategorySuccess(res));
      yield call(resolve);
    } catch (error) {
      yield call(reject, error);
    }
}
function* getGoalFrequencySaga({meta: { resolve, reject } }) {
    try {
      const res = yield call(getRequest, 'Frequency/');
      yield put(getGoalFrequencySuccess(res));
      yield call(resolve);
    } catch (error) {
      yield call(reject, error);
    }
}
function* getGoalTypeSaga({meta: { resolve, reject } }) {
    try {
      const res = yield call(getRequest, 'GoalType/');
      yield put(getGoalTypeSuccess(res));
      yield call(resolve);
    } catch (error) {
      yield call(reject, error);
    }
}

function* addUserGoalSaga({payload,meta: { resolve, reject } }) {
  try {
    const res = yield call(postRequest, 'UserGoals/',payload);
    yield put(addUserGoalSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* getUserGoalSaga({meta: { resolve, reject } }) {
  
  try {
    const res = yield call(getRequest, 'UserGoals/');
    yield put(getUserGoalSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* deleteUserGoalSaga({payload,meta: { resolve, reject } }) {
  try {
    const res = yield call(deleteRequest, `UserGoals/${payload.uuid}`);
    yield put(deleteGoalRequestSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* getGoalRateSaga({meta: { resolve, reject } }) {
  try {
    const res = yield call(getRequest, 'Rate/');
    yield put(getGoalRateSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}


export default function* sagas() {
  yield takeLatest(constants.GET_GOAL_BUCKET_REQUEST, getGoalBucketSaga);
  yield takeLatest(constants.GET_GOAL_CATEGORY_REQUEST,getGoalCategorySaga);
  yield takeLatest(constants.GET_GOAL_FREQUENCY_REQUEST,getGoalFrequencySaga);
  yield takeLatest(constants.GET_GOAL_TYPE_REQUEST,getGoalTypeSaga);
  yield takeLatest(constants.ADD_GOALS_REQUEST,addUserGoalSaga);
  yield takeLatest(constants.GET_USER_ALL_GOALS_REQUEST,getUserGoalSaga);
  yield takeLatest(constants.DELETE_GOALS_REQUEST,deleteUserGoalSaga);
  yield takeLatest(constants.GET_GOAL_RATE_REQUEST,getGoalRateSaga);
}
