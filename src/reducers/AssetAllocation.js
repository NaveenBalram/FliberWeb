import * as constants from '../constants/AssetAllocation';

const initialState = {
assetAllocationScore : [],
retirementCorpus:{}
};

const reducer = (state = initialState, action) => {
  
  switch (action.type) {
    
    case constants.GET_ASSET_SUCCESS: {
      return {  
        ...state,
        assetAllocationScore: action.payload.data,
      };
    }
    case constants.GET_PRE_CORPUS_CALCULATION_SUCCESS: {
      return {  
        ...state,
        retirementCorpus: action.payload.data,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
