import { call, put, takeLatest } from 'redux-saga/effects';
import { getRequest, postRequest,postPulseLabRequest,getIfscCodeRequest, patchRequest } from '../api/APICalls';
import {
    registerUserSuccess, loginUserSuccess,getGenderListSuccess,
    getMartialStatusSuccess,getRetirementStatusSuccess,logoutUserSuccess,panVarificationSuccess,
    ifscCodeSuccess,getUserPhoneVerifiedSuccess,addUserPhoneVerifiedSuccess,updateUserInformationSuccess,updatePhoneVerificationSuccess
} from '../actions/UserManagement';
import * as constants from '../constants/UserManagement';

function* registerUserSaga({ payload,meta: { resolve, reject } }) {
    try {
      const res = yield call(postRequest, 'User/register', payload);
      yield put(registerUserSuccess(res));
      yield call(resolve);
    } catch (error) {
      yield call(reject, error);
    }
  }

  
function* loginUserSaga({ payload,meta: { resolve, reject } }) {
  try {
    const res = yield call(postRequest, 'User/by/',payload);
    yield put(loginUserSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* getGenderTypesSaga({ meta: { resolve, reject } }) {
  try {
    const res = yield call(getRequest, 'Gender/');
    yield put(getGenderListSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* getMartialTypesSaga({ meta: { resolve, reject } }) {
  try {
    const res = yield call(getRequest, 'MaritalStatus/');
    yield put(getMartialStatusSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* getRetirementTypesSaga({ meta: { resolve, reject } }) {
  try {
    const res = yield call(getRequest, 'RetirementStatus/');
    yield put(getRetirementStatusSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* logoutUserSaga({ payload,meta: { resolve, reject } }) {
  try {
    const res = yield call(postRequest, 'User/logout/status',payload);
    yield put(logoutUserSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* panCardVerificationSaga({ payload,meta: { resolve, reject } }) {
  try {
    const res = yield call(postPulseLabRequest, 'kyc-check',payload);
    yield put(panVarificationSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}


function* ifscCodeSaga({ payload,meta: { resolve, reject } }) {
  try {
    const res = yield call(getIfscCodeRequest, payload.ifscode);
    yield put(ifscCodeSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* getUserPhoneVerifiedSaga({ meta: { resolve, reject } }) {
  try {
    const res = yield call(getRequest, 'PhoneApi/');
    yield put(getUserPhoneVerifiedSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* addUserPhoneVerifiedSaga({ payload,meta: { resolve, reject } }) {
  try {
    const res = yield call(postRequest, 'PhoneApi/', payload);
    yield put(addUserPhoneVerifiedSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* updateUserInformationSaga({ payload,meta: { resolve, reject } }) {
  try {
    const res = yield call(patchRequest, 'User/', payload);
    yield put(updateUserInformationSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

function* updateUserPhoneVerifiedSaga({ payload,meta: { resolve, reject } }) {
  try {
    const res = yield call(patchRequest, 'PhoneApi/', payload);
    yield put(addUserPhoneVerifiedSuccess(res));
    yield call(resolve);
  } catch (error) {
    yield call(reject, error);
  }
}

export default function* sagas() {
  yield takeLatest(constants.REGISTER_USER_REQUEST, registerUserSaga);
  yield takeLatest(constants.LOGIN_USER_REQUEST,loginUserSaga);
  yield takeLatest(constants.GET_GENDER_LIST_REQUEST,getGenderTypesSaga);
  yield takeLatest(constants.GET_MARITAL_STATUS_REQUEST,getMartialTypesSaga);
  yield takeLatest(constants.GET_RETIREMENT_STATUS_REQUEST,getRetirementTypesSaga);
  yield takeLatest(constants.LOGOUT_USER_REQUEST,logoutUserSaga);
  yield takeLatest(constants.PANCARD_VERIFICATION_REQUEST,panCardVerificationSaga);
  yield takeLatest(constants.IFSC_CODE_REQUEST,ifscCodeSaga);
  yield takeLatest(constants.GET_USER_PHONE_VERIFIED_REQUEST,getUserPhoneVerifiedSaga);
  yield takeLatest(constants.ADD_USER_PHONE_VERIFIED_REQUEST, addUserPhoneVerifiedSaga);
  yield takeLatest(constants.UPDATE_USER_INFORMATION_REQUEST,updateUserInformationSaga);
  yield takeLatest(constants.UPDATE_USER_PHONE_VERIFIED_REQUEST,updateUserPhoneVerifiedSaga);

}
