import * as constants from '../constants/RRScore';

const initialState = {
  retirementReadinessScore: [],
  rrScoreQuestions: [],
  rrScoreUserAnswers: [],
  sustainabilityScore: {},
  sustainabilityScoreAnswers:[]
};

const reducer = (state = initialState, action) => {

  switch (action.type) {

    case constants.GET_RRSCORE_SUCCESS: {
      return {
        ...state,
        retirementReadinessScore: action.payload.data,
      };
    }

    case constants.GET_RRSCORE_QUESTIONS_SUCCESS: {
      return {
        ...state,
        rrScoreQuestions: action.payload.data,
      };
    }
    case constants.SAVE_RRSCORE_REDUCER: {

      return {
        ...state,
        rrScoreUserAnswers: action.payload,
      }
    }
    case constants.CLEAR_RRSCORE_REDUCER: {

      return {
        ...state,
        rrScoreUserAnswers: [],
      }
    }
    case constants.GET_SSCORE_SUCCESS: {

      return {
        ...state,
        sustainabilityScore: action.payload.data,
      }
    }

    case constants.SAVE_SS_SCORE_REDUCER: {

      return {
        ...state,
        sustainabilityScoreAnswers: action.payload,
      }
    }

    default: {
      return state;
    }
  }
};

export default reducer;
