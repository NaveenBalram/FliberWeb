import * as constants from '../constants/AssetAllocation';

export const getAssetAllocationRequest =(payload,meta)=>({
    payload,
    meta,
    type: constants.GET_ASSET_REQUEST,
  });
  
  export const getAssetAllocationSuccess =(payload)=>({
    payload,
    type: constants.GET_ASSET_SUCCESS
  });

  export const getPreCalculationRequest = (payload,meta)=>({
    payload,
    meta,
    type: constants.GET_PRE_CORPUS_CALCULATION_REQUEST
  });

  export const getPreCalculationSuccess = (payload)=>({
    payload,
    type: constants.GET_PRE_CORPUS_CALCULATION_SUCCESS
  });

  


  