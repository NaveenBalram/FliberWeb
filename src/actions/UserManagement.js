import * as constants from '../constants/UserManagement';

export const registerUserRequest = (payload, meta) => ({
  meta,
  payload,
  type: constants.REGISTER_USER_REQUEST,
});

export const registerUserSuccess = (payload) => ({
  payload,
  type: constants.REGISTER_USER_SUCCESS,
});

export const loginUserRequest = (payload, meta) => ({
  meta,
  payload,
  type: constants.LOGIN_USER_REQUEST,
});


export const loginUserSuccess = (payload) => ({
  payload,
  type: constants.LOGIN_USER_SUCCESS,
});

export const getGenderListRequest = (meta) => ({
  meta,
  type: constants.GET_GENDER_LIST_REQUEST
});

export const getGenderListSuccess = (payload) => ({
  payload,
  type: constants.GET_GENDER_LIST_SUCCESS
});

export const getRetirementStatusRequest = (meta) => ({
  meta,
  type: constants.GET_RETIREMENT_STATUS_REQUEST
});

export const getRetirementStatusSuccess = (payload) => ({
  payload,
  type: constants.GET_RETIREMENT_STATUS_SUCCESS
});

export const getMartialStatusRequest = (meta) => ({
  meta,
  type: constants.GET_MARITAL_STATUS_REQUEST
});

export const getMartialStatusSuccess = (payload) => ({
  payload,
  type: constants.GET_MARITAL_STATUS_SUCCESS
});

export const logoutUserRequest = (payload, meta) => ({
  meta,
  payload,
  type: constants.LOGOUT_USER_REQUEST
});

export const logoutUserSuccess = (payload) => ({
  payload,
  type: constants.LOGOUT_USER_SUCCESS
});

export const updateUser = (payload) => ({
  payload,
  type: constants.UPDATE_USER
});

export const panVarificationRequest = (payload, meta) => ({
  meta,
  payload,
  type: constants.PANCARD_VERIFICATION_REQUEST
});

export const panVarificationSuccess = (payload) => ({
  payload,
  type: constants.PANCARD_VERIFICATION_SUCCESS
});

export const ifscCodeRequest = (payload, meta) => ({
  meta,
  payload,
  type: constants.IFSC_CODE_REQUEST
});

export const ifscCodeSuccess = (payload) => ({
  payload,
  type: constants.IFSC_CODE_SUCCESS
});

export const setPaymentProcessClicked = ({ payload }) => ({
  payload,
  type: constants.SET_PAYMENT_SUCCESS
});

export const setBSEAccount = ({ payload }) => ({
  payload,
  type: constants.SET_BSE_ACCOUNT_SUCCESS
});

export const getUserPhoneVerifiedRequest = (meta) => ({
  meta,
  type: constants.GET_USER_PHONE_VERIFIED_REQUEST
});

export const getUserPhoneVerifiedSuccess = (payload) => ({
  payload,
  type: constants.GET_USER_PHONE_VERIFIED_SUCCESS
});

export const addUserPhoneVerifiedRequest = (payload, meta) => ({
  payload,
  meta,
  type: constants.ADD_USER_PHONE_VERIFIED_REQUEST
});

export const addUserPhoneVerifiedSuccess = (payload, meta) => ({
  payload,
  meta,
  type: constants.ADD_USER_PHONE_VERIFIED_SUCCESS
});

export const updateUserInformationRequest = (payload, meta) => ({
  payload,
  meta,
  type: constants.UPDATE_USER_INFORMATION_REQUEST
});

export const updateUserInformationSuccess = (payload, meta) => ({
  payload,
  meta,
  type: constants.UPDATE_USER_INFORMATION_SUCCESS
});

export const updatePhoneVerificationRequest = (payload, meta) => ({
  payload,
  meta,
  type: constants.UPDATE_USER_PHONE_VERIFIED_REQUEST
});

export const updatePhoneVerificationSuccess = (payload) => ({
  payload,
  type: constants.UPDATE_USER_PHONE_VERIFIED_SUCCESS
});