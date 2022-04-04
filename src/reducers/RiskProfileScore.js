import * as constants from '../constants/RiskProfileScore';

const initialState = {
  riskProfileScoreResult:{},
  riskProfileScoreQuestions:[],
  riskProfileScoreUserAnswers:[],
  responseAnswers:[]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    case constants.GET_RISKPROFILESCORE_SUCCESS: {
      return {  
        ...state,
        riskProfileScoreResult: action.payload.data,
      };
    }

    case constants.GET_RISKPROFILESCORE_QUESTIONS_SUCCESS: {
      return {
        ...state,
        riskProfileScoreQuestions: action.payload.data,
      };
    }
    case constants.SAVE_RISKPROFILESCORE_REDUCER: {
      
      return {
        ...state,
        riskProfileScoreUserAnswers: action.payload,
      }
    }

    case constants.SAVE_RISKPROFILE_ANSWERS_SUCCESS: {

      return {
        ...state,
        responseAnswers: action.payload,
      }
    }

    case constants.UPDATE_QUESTIONS: {

      return {
        ...state,
        riskProfileScoreQuestions: action.payload,
      }
    }

    case constants.CLEAR_ANSWERS: {

      return {
        ...state,
        responseAnswers: [],
        riskProfileScoreUserAnswers:[],
      }
    }

    default: {
      return state;
    }
  }
};

export default reducer;
