import * as constants from '../constants/BSEAccountManagement';

export const getNomineeRelationRequest = (meta) => ({
  meta,
  type: constants.GET_NOMINEE_RELEATION_REQUEST
});

export const getNomineeRelationSuccess = (payload) => ({
  payload,
  type: constants.GET_NOMINEE_RELEATION_SUCCESS
});

export const getCountryListRequest = (meta) => ({
  meta,
  type: constants.GET_COUNTRY_LIST_REQUEST
});

export const getCountryListSuccess = (payload) => ({
  payload,
  type: constants.GET_COUNTRY_LIST_SUCCESS
});

export const getStateListRequest = (meta) => ({
  meta,
  type: constants.GET_STATE_LIST_REQUEST
});

export const getStateListSuccess = (payload) => ({
  payload,
  type: constants.GET_STATE_LIST_SUCCESS
});

export const getWealthListRequest = (meta) => ({
  meta,
  type: constants.GET_WEALTH_LIST_REQUEST
});

export const getWealthListSuccess = (payload) => ({
  payload,
  type: constants.GET_WEALTH_LIST_SUCCESS
});

export const getOccupationListRequest = (meta) => ({
  meta,
  type: constants.GET_OCCUPATION_LIST_REQUEST
});

export const getOccupationListSuccess = (payload) => ({
  payload,
  type: constants.GET_OCCUPATION_LIST_SUCCESS
});

export const getIncomeSlabListRequest = (meta) => ({
  meta,
  type: constants.GET_INCOME_SLAB_LIST_REQUEST
});

export const getIncomeSlabListSuccess = (payload) => ({
  payload,
  type: constants.GET_INCOME_SLAB_LIST_SUCCESS
});


export const getBankAccountTypesRequest = (meta) => ({
  meta,
  type: constants.GET_BANK_ACCOUNT_TYPES_REQUEST
});


export const getBankAccountTypesSuccess = (payload) => ({
  payload,
  type: constants.GET_BANK_ACCOUNT_TYPES_SUCCESS
});

export const updateBSEAccountCreationRequest = (payload, meta) => ({
  meta,
  payload,
  type: constants.UPDATE_BSE_ACCOUNT_CREATION_REQUEST
});

export const updateBSEAccountCreationSuccess = (payload) => ({
  payload,
  type: constants.UPDATE_BSE_ACCOUNT_CREATION_SUCCESS
});

export const addBSEAccountNomineeRequest = (payload,meta) => ({
  meta,
  payload,
  type:constants.ADD_BSE_ACCOUNT_NOMINEE_REQUEST
});

export const addBSEAccountNomineeSuccess = (payload) => ({
  payload,
  type:constants.ADD_BSE_ACCOUNT_NOMINEE_SUCCESS
});

export const getBSEAccountNomineeRequest = (payload,meta) => ({
  meta,
  payload,
  type:constants.GET_BSE_ACCOUNT_NOMINEES_REQUEST
});

export const getBSEAccountNomineeSuccess = (payload) => ({
  payload,
  type:constants.GET_BSE_ACCOUNT_NOMINEES_SUCCESS
});


export const updateBSEAccountNomineeRequest = (payload,meta) => ({
  meta,
  payload,
  type:constants.UPDATE_BSE_ACCOUNT_NOMINEE_REQUEST
});

export const updateBSEAccountNomineeSuccess = (payload) => ({
  payload,
  type:constants.UPDATE_BSE_ACCOUNT_NOMINEE_SUCCESS
});

export const deleteBSEAccountNomineeRequest = (payload,meta) => ({
  meta,
  payload,
  type:constants.DELETE_BSE_ACCOUNT_NOMINEE_REQUEST
});

export const deleteBSEAccountNomineeSuccess = (payload) => ({
  payload,
  type:constants.DELETE_BSE_ACCOUNT_NOMINEE_SUCCESS
});

export const addBSEBankAccountRequest = (payload,meta) => ({
  meta,
  payload,
  type:constants.ADD_BSE_BANK_ACCOUNT_REQUEST
});

export const addBSEBankAccountSuccess = (payload) => ({
  payload,
  type:constants.ADD_BSE_BANK_ACCOUNT_SUCCESS
});

export const updateBSEBankAccountRequest = (payload,meta) => ({
  meta,
  payload,
  type:constants.UPDATE_BSE_BANK_ACCOUNT_REQUEST
});

export const updateBSEBankAccountSuccess = (payload) => ({
  payload,
  type:constants.UPDATE_BSE_BANK_ACCOUNT_SUCCESS
});

export const getBSEBankAccountRequest = (payload,meta) => ({
  meta,
  payload,
  type:constants.GET_BSE_BANK_ACCOUNT_REQUEST
});

export const getBSEBankAccountSuccess = (payload) => ({
  payload,
  type:constants.GET_BSE_BANK_ACCOUNT_SUCCESS
});

export const deleteBSEBankAccountRequest = (payload,meta) => ({
  meta,
  payload,
  type:constants.DELETE_BSE_BANK_ACCOUNT_REQUEST
});

export const deleteBSEBankAccountSuccess = (payload) => ({
  payload,
  type:constants.DELETE_BSE_BANK_ACCOUNT_SUCCESS
});
