import * as constants from '../constants/BSEAccountManagement';

const initialState = {
  bseUSerInfo:{},
  bseUserNominess:[],
  nomineeTypes:[],
  occupationTypes:[],
  stateList:[],
  countryList:[],
  incomeSlabList:[],
  accountTypes:[],
  wealthType:[],
  userBankAccounts:[],
};

const reducer = (state = initialState, action) => {
  
  switch (action.type) {
    
    case constants.GET_NOMINEE_RELEATION_SUCCESS: {
      return {  
        ...state,
        nomineeTypes: action.payload.data,
      };
    }

    case constants.GET_OCCUPATION_LIST_SUCCESS:{
      return{
        ...state,
        occupationTypes: action.payload.data
      };
    }
    
    case constants.GET_STATE_LIST_SUCCESS:{
      return{
        ...state,
        stateList: action.payload.data
      };
    }

    case constants.GET_COUNTRY_LIST_SUCCESS:{
      return{
        ...state,
        countryList: action.payload.data
      };
    }

    case constants.GET_INCOME_SLAB_LIST_SUCCESS:{
      return{
        ...state,
        incomeSlabList: action.payload.data
      };
    }

    case constants.GET_BANK_ACCOUNT_TYPES_SUCCESS:{
      return{
        ...state,
        accountTypes: action.payload.data
      };
    }

    case constants.GET_WEALTH_LIST_SUCCESS:{
      return{
        ...state,
        wealthType: action.payload.data
      };
    }
    case constants.UPDATE_BSE_ACCOUNT_CREATION_SUCCESS:{
      return{
        ...state,
        bseUSerInfo: action.payload.data
      };
    }

    case constants.GET_BSE_ACCOUNT_NOMINEES_SUCCESS:{
      return{
        ...state,
        bseUserNominess: action.payload.data
      };
    }

    
    case constants.GET_BSE_BANK_ACCOUNT_SUCCESS:{
      return{
        ...state,
        userBankAccounts: action.payload.data
      };
    }
    
    
    default: {
      return state;
    }
  }
};

export default reducer;
