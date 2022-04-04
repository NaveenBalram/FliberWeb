import { call, put, takeLatest } from 'redux-saga/effects';
import { getRequest, postRequest } from '../api/APICalls';
import {
  getCustomerRRScoreSuccess, getRRScoreQuestionsSuccess,saveRRScoreAnswersSuccess,getCustomerSScoreSuccess
} from '../actions/RRScore';
import * as constants from '../constants/RRScore';

function* getCustomerRRScoreSaga({ payload,meta: { resolve, reject } }) {
    try {
      const res = yield call(getRequest, 'Calculations/RRScoreCalculation',payload);
      yield put(getCustomerRRScoreSuccess(res));
      yield call(resolve);
    } catch (error) {
      yield call(reject, error);
    }
  }

  
function* getRRScoreQuestionsSaga({payload, meta: { resolve, reject } }) {
  try {
    const res = yield call(getRequest, 'QuestionType/module/type',payload);
    yield put(getRRScoreQuestionsSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* SaveRRScoreAnswersSaga({payload, meta: { resolve, reject } }) {
  try {
    const res = yield call(postRequest, 'SubmitQuestion/bulk/create',payload.finalAnswers);
    yield put(saveRRScoreAnswersSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* getCustomerSScoreSaga({payload, meta: { resolve, reject } }) {
  try {
    const res = yield call(postRequest, 'RRCal/SustainabilityScore/',payload);
    yield put(getCustomerSScoreSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

export default function* sagas() {
  yield takeLatest(constants.GET_RRSCORE_REQUEST, getCustomerRRScoreSaga);
  yield takeLatest(constants.GET_RRSCORE_QUESTIONS_REQUEST, getRRScoreQuestionsSaga);
  yield takeLatest(constants.SAVE_RRSCORE_ANSWERS_REQUEST,SaveRRScoreAnswersSaga);
  yield takeLatest(constants.GET_SSCORE_REQUEST, getCustomerSScoreSaga);
 
}
