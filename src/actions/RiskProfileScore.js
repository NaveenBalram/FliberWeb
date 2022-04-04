import * as constants from '../constants/RiskProfileScore';


export const getCustomerRiskProfileScoreRequest = (payload,meta) => ({
  payload,
  meta,
  type: constants.GET_RISKPROFILESCORE_REQUEST,
});

export const getCustomerRiskProfileScoreSuccess = payload => ({
  payload,
  type: constants.GET_RISKPROFILESCORE_SUCCESS,
});


export const getRiskProfileScoreQuestionsRequest =(payload,meta) =>({
  payload,
  meta,
  type: constants.GET_RISKPROFILESCORE_QUESTIONS_REQUEST,
});

export const getRiskProfileScoreQuestionsSuccess =(payload)=>({
  payload,
  type: constants.GET_RISKPROFILESCORE_QUESTIONS_SUCCESS,
});

export const saveRiskProfileScoreQuestionReducer =(payload)=>({
  payload,
  type: constants.SAVE_RISKPROFILESCORE_REDUCER
})

export const saveRiskProfileAnswersRequest =(payload,meta) =>({
  payload,
  meta,
  type: constants.SAVE_RISKPROFILE_ANSWERS_REQUEST,
});

export const saveRiskProfileAnswersSuccess =(payload)=>({
  payload,
  type: constants.SAVE_RISKPROFILE_ANSWERS_SUCCESS,
});

export const updateQuestions =(payload)=>({
  payload,
  type: constants.UPDATE_QUESTIONS,
});

export const clearAnswers =(payload)=>({
  payload,
  type: constants.CLEAR_ANSWERS,
});
