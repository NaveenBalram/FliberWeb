import { call, put, takeLatest } from 'redux-saga/effects';
import { getRequest, postRequest } from '../api/APICalls';
import {
  getCustomerRiskProfileScoreSuccess, getRiskProfileScoreQuestionsSuccess , saveRiskProfileAnswersSuccess
} from '../actions/RiskProfileScore';
import * as constants from '../constants/RiskProfileScore';

function* getCustomerRiskProfileScoreSaga({payload, meta: { resolve, reject } }) {
    try {
      const res = yield call(getRequest, 'master/CalculateRiskProfile',payload);
      yield put(getCustomerRiskProfileScoreSuccess(res));
      yield call(resolve);
    } catch (error) {
      yield call(reject, error);
    }
  }

  
function* getRiskProfileScoreQuestionsSaga({payload, meta: { resolve, reject } }) {
  try {
    const res = yield call(getRequest, 'QuestionType/module/type',payload);
    yield put(getRiskProfileScoreQuestionsSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* saveRiskProfileScoreAnswersSaga({payload, meta: { resolve, reject } }) {
  try {
    const res = yield call(postRequest, 'SubmitQuestion/',payload);
    yield put(saveRiskProfileAnswersSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

export default function* sagas() {
  yield takeLatest(constants.GET_RISKPROFILESCORE_REQUEST, getCustomerRiskProfileScoreSaga);
  yield takeLatest(constants.GET_RISKPROFILESCORE_QUESTIONS_REQUEST, getRiskProfileScoreQuestionsSaga);
  yield takeLatest(constants.SAVE_RISKPROFILE_ANSWERS_REQUEST, saveRiskProfileScoreAnswersSaga);
 
}
