import * as constants from '../constants/RRScore';


export const getCustomerRRScoreRequest = (payload,meta) => ({
  meta,
  payload,
  type: constants.GET_RRSCORE_REQUEST,
});

export const getCustomerRRScoreSuccess = payload => ({
  payload,
  type: constants.GET_RRSCORE_SUCCESS,
});


export const getRRScoreQuestionsRequest =(payload,meta) =>({
  meta,
  payload,
  type: constants.GET_RRSCORE_QUESTIONS_REQUEST,
});

export const getRRScoreQuestionsSuccess =(payload)=>({
  payload,
  type: constants.GET_RRSCORE_QUESTIONS_SUCCESS,
});

export const saveRRScoreQuestionReducer =(payload)=>({
  payload,
  type: constants.SAVE_RRSCORE_REDUCER
});

export const saveRRScoreAnswersRequest =(payload,meta)=>({
  meta,
  payload,
  type: constants.SAVE_RRSCORE_ANSWERS_REQUEST
});

export const saveRRScoreAnswersSuccess = (payload) =>({
payload,
type: constants.SAVE_RRSCORE_ANSWERS_SUCCESS
});

export const clearRRAcoreAnswers = () =>({
  type: constants.CLEAR_RRSCORE_REDUCER
});

export const getCustomerSScoreRequest = (payload,meta) => ({
  meta,
  payload,
  type: constants.GET_SSCORE_REQUEST,
});

export const getCustomerSScoreSuccess = payload => ({
  payload,
  type: constants.GET_SSCORE_SUCCESS,
});

export const saveSSScoreQuestionReducer =(payload)=>({
  payload,
  type: constants.SAVE_SS_SCORE_REDUCER
});