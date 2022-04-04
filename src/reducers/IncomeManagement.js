import * as constants from '../constants/IncomeManagement';

const initialState = {

  incomeTypes:[],
  incomeFrequencies:[],
  incomeCategories:[],
  incomeBuckets:[],
  savedUserIncomes:[]
};

const reducer = (state = initialState, action) => {
  
  switch (action.type) {
    case constants.GET_INCOME_TYPE_REQUEST_SUCCESS: {
      return {
        ...state,
        incomeTypes: action.payload.data,
      };
    }
    
    case constants.GET_INCOME_CATEGORY_REQUEST_SUCCESS: {
        return {
          ...state,
          incomeCategories: action.payload.data,
        };
    }
    case constants.GET_INCOME_FREQUENCY_SUCCESS: {
        return {
          ...state,
          incomeFrequencies: action.payload.data,
        };
    }

    case constants.GET_USER_INCOME_REQUEST_SUCCESS:{
        return{
            ...state,
            savedUserIncomes: action.payload.data
        };
    
    }

    default: {
      return state;
    }
  }
};

export default reducer;
