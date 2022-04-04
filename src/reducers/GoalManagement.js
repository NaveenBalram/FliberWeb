import * as constants from '../constants/GoalManagement';

const initialState = {

  goalTypes:[],
  goalFrequencies:[],
  goalCategories:[],
  goalBuckets:[],
  incomeTypes:[],
  savedUserGoals:[],
  goalRates:[]
};

const reducer = (state = initialState, action) => {
  
  switch (action.type) {
    case constants.GET_GOAL_TYPE_SUCCESS: {
      return {
        ...state,
        goalTypes: action.payload.data,
      };
    }
    case constants.GET_GOAL_BUCKET_SUCCESS: {
        return {
          ...state,
          goalBuckets: action.payload.data,
        };
    }
    case constants.GET_GOAL_CATEGORY_SUCCESS: {
     
        return {
          ...state,
          goalCategories: action.payload.data,
        };
    }
    case constants.GET_GOAL_FREQUENCY_SUCCESS: {
        return {
          ...state,
          goalFrequencies: action.payload.data,
        };
    }

    case constants.GET_USER_ALL_GOALS_SUCCESS: {
      return{
        ...state,
        savedUserGoals: action.payload.data
    };
    }

    case constants.GET_GOAL_RATE_SUCCESS: {
      return{
        ...state,
        goalRates: action.payload.data
    };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
