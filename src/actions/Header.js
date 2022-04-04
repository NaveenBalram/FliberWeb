import * as constants from "../constants/Header";



export const setUserName = ({ payload }) => ({
  payload,
  type: constants.SET_USER_NAME,
});

export const setAuthStatus = ({ payload }) => ({
  payload,
  type: constants.SET_AUTH_STATUS,
});

export const setPasswordChange = () => ({
  type: constants.SET_PASSWORD_CHANGE,
});

export const setEmailChange = () => ({
  type: constants.SET_EMAIL_CHANGE,
});

export const resetValues = () => ({
  type: constants.RESET_VALUES,
});
