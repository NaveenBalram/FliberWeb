import * as constants from '../constants/GoalManagement';

export const getGoalCategoryRequest = (meta) => ({
  meta,
  type: constants.GET_GOAL_CATEGORY_REQUEST
});

export const getGoalCategorySuccess = (payload) => ({
  payload,
  type: constants.GET_GOAL_CATEGORY_SUCCESS
});

export const getGoalBucketRequest = (meta) => ({
  meta,
  type: constants.GET_GOAL_BUCKET_REQUEST
});

export const getGoalBucketSuccess = (payload) => ({
  payload,
  type: constants.GET_GOAL_BUCKET_SUCCESS
});

export const getGoalFrequencyRequest = (meta) => ({
  meta,
  type: constants.GET_GOAL_FREQUENCY_REQUEST
});

export const getGoalFrequencySuccess = (payload) => ({
  payload,
  type: constants.GET_GOAL_FREQUENCY_SUCCESS
});

export const getGoalTypeRequest = (meta) => ({
  meta,
  type: constants.GET_GOAL_TYPE_REQUEST
});

export const getGoalTypeSuccess = (payload) => ({
  payload,
  type: constants.GET_GOAL_TYPE_SUCCESS
});

export const addUserGoalRequest = (payload, meta) => ({
  meta,
  payload,
  type: constants.ADD_GOALS_REQUEST
});

export const addUserGoalSuccess = (payload) => ({
  payload,
  type: constants.ADD_GOALS_SUCCESS
});

export const getUserGoalRequest = (meta) => ({
  meta,
  type: constants.GET_USER_ALL_GOALS_REQUEST
});

export const getUserGoalSuccess = (payload) => ({
  payload,
  type: constants.GET_USER_ALL_GOALS_SUCCESS
});

export const deleteGoalRequest = (payload, meta) => ({
  meta,
  payload,
  type: constants.DELETE_GOALS_REQUEST
});

export const deleteGoalRequestSuccess = (payload) => ({
  payload,
  type: constants.DELETE_GOALS_REQUEST_SUCCESS
});

export const getGoalRateRequest = (meta) => ({
  meta,
  type: constants.GET_GOAL_RATE_REQUEST
});

export const getGoalRateSuccess = (payload) => ({
  payload,
  type: constants.GET_GOAL_RATE_SUCCESS
});




