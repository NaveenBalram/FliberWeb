import * as constants from '../constants/IncomeManagement';

export const getIncomeCategoryRequest = (meta) => ({
    meta,
    type: constants.GET_INCOME_CATEGORY_REQUEST
  });
  
export const getIncomeCategorySuccess = (payload) => ({
    payload,
    type: constants.GET_INCOME_CATEGORY_REQUEST_SUCCESS
  });

export const getIncomeFrequencyRequest = (meta) => ({
    meta,
    type: constants.GET_INCOME_FREQUENCY_REQUEST
  });
  
export const getIncomeFrequencySuccess = (payload) => ({
    payload,
    type: constants.GET_INCOME_FREQUENCY_SUCCESS
  });

export const getIncomeTypeRequest = (meta) => ({
    meta,
    type: constants.GET_INCOME_TYPE_REQUEST
  });
  
export const getIncomeTypeSuccess = (payload) => ({
    payload,
    type: constants.GET_INCOME_TYPE_REQUEST_SUCCESS
  });

export const addUserIncomeRequest =(payload,meta) =>({
    meta,
    payload,
    type: constants.SAVE_USER_INCOME_REQUEST
});

export const addUserIncomeSuccess =(payload) =>({
  payload,
  type: constants.SAVE_USER_INCOME_REQUEST_SUCCESS
});

export const getUserIncomeRequest = (payload,meta) => ({
  meta,
  payload,
  type: constants.GET_USER_INCOME_REQUEST
});

export const getUserIncomeSuccess = (payload) => ({
  payload,
  type: constants.GET_USER_INCOME_REQUEST_SUCCESS
});

export const deleteIncomeRequest = (payload,meta) => ({
  meta,
  payload,
  type: constants.DELETE_USER_INCOME_REQUEST
});

export const deleteIncomeRequestSuccess = (payload) =>({
  payload,
  type:constants.DELETE_USER_INCOME_REQUEST_SUCCESS
});




  