import { call, put, takeLatest } from 'redux-saga/effects';
import { getRequest, postRequest,patchRequest, deleteRequest } from '../api/APICalls';
import {
   getNomineeRelationSuccess,getCountryListSuccess,getStateListSuccess,getOccupationListSuccess,
   getWealthListSuccess,getBankAccountTypesSuccess,getIncomeSlabListSuccess,updateBSEAccountCreationSuccess,
   addBSEAccountNomineeSuccess,updateBSEAccountNomineeSuccess,getBSEAccountNomineeSuccess,deleteBSEAccountNomineeSuccess,
   addBSEBankAccountSuccess,updateBSEBankAccountSuccess,getBSEBankAccountSuccess,deleteBSEBankAccountSuccess
} from '../actions/BSEAccountManagement';
import * as constants from '../constants/BSEAccountManagement';

//Masters

function* getNomineeTypesSaga({ meta: { resolve, reject } }) {
    try {
      const res = yield call(getRequest, 'NomineeRelation/');
      yield put(getNomineeRelationSuccess(res));
      yield call(resolve);
    } catch (error) {
      yield call(reject, error);
    }
  }

  function* getOccupationTypesSaga({ meta: { resolve, reject } }) {
    try {
      const res = yield call(getRequest, 'OccupationTypes/');
      yield put(getOccupationListSuccess(res));
      yield call(resolve);
    } catch (error) {
      yield call(reject, error);
    }
  }

  function* getWealthTypesSaga({ meta: { resolve, reject } }) {
    try {
      const res = yield call(getRequest, 'SourceOfWealth/');
      yield put(getWealthListSuccess(res));
      yield call(resolve);
    } catch (error) {
      yield call(reject, error);
    }
  }

  function* getCountryTypesSaga({ meta: { resolve, reject } }) {
    try {
      const res = yield call(getRequest, 'BseCountryCode/');
      yield put(getCountryListSuccess(res));
      yield call(resolve);
    } catch (error) {
      yield call(reject, error);
    }
  }

  function* getStateTypesSaga({ meta: { resolve, reject } }) {
    try {
      const res = yield call(getRequest, 'BseStateCode/');
      yield put(getStateListSuccess(res));
      yield call(resolve);
    } catch (error) {
      yield call(reject, error);
    }
  }

  function* getBankAccountTypesSaga({ meta: { resolve, reject } }) {
    try {
      const res = yield call(getRequest, 'BseAccountType/');
      yield put(getBankAccountTypesSuccess(res));
      yield call(resolve);
    } catch (error) {
      yield call(reject, error);
    }
  }
  
  function* getIncomeSlabTypeSaga({ meta: { resolve, reject } }) {
    try {
      const res = yield call(getRequest, 'BSEIncomeSlab/');
      yield put(getIncomeSlabListSuccess(res));
      yield call(resolve);
    } catch (error) {
      yield call(reject, error);
    }
  }

//BSE User Creation

  function* updateUserSaga({ payload,meta: { resolve, reject } }) {
    try {
      const res = yield call(patchRequest, 'User/add/bse/data', payload);
      yield put(updateBSEAccountCreationSuccess(res));
      yield call(resolve);
    } catch (error) {
      yield call(reject, error);
    }
  }

  //Nominess

  function* addUserNomineeSaga({ payload,meta: { resolve, reject } }) {
    try {
      const res = yield call(postRequest, 'BseClientNominee/', payload);
      yield put(addBSEAccountNomineeSuccess(res));
      yield call(resolve);
    } catch (error) {
      yield call(reject, error);
    }
  }

  function* getUserNomineeSaga({ payload,meta: { resolve, reject } }) {
    try {
      const res = yield call(getRequest, 'BseClientNominee/', payload);
      yield put(getBSEAccountNomineeSuccess(res));
      yield call(resolve);
    } catch (error) {
      yield call(reject, error);
    }
  }

  function* updateUserNomineeSaga({ payload,meta: { resolve, reject } }) {
    try {
      const res = yield call(patchRequest, 'BseClientNominee/', payload);
      yield put(updateBSEAccountNomineeSuccess(res));
      yield call(resolve);
    } catch (error) {
      yield call(reject, error);
    }
  }
  function* deleteUserNomineeSaga({ payload,meta: { resolve, reject } }) {
    try {
      const res = yield call(deleteRequest, `BseClientNominee/${payload.uuid}`);
      yield put(deleteBSEAccountNomineeSuccess(res));
      yield call(resolve);
    } catch (error) {
      yield call(reject, error);
    }
  }

  //Bank Account

  function* addBankAccountSaga({ payload,meta: { resolve, reject } }) {
    try {
      const res = yield call(postRequest, 'BseClientAccount/', payload);
      yield put(addBSEBankAccountSuccess(res));
      yield call(resolve);
    } catch (error) {
      yield call(reject, error);
    }
  }

  function* getBankAccountSaga({ payload,meta: { resolve, reject } }) {
    try {
      const res = yield call(getRequest, 'BseClientAccount/', payload);
      yield put(getBSEBankAccountSuccess(res));
      yield call(resolve);
    } catch (error) {
      yield call(reject, error);
    }
  }
   
  function* updateBankAccountSaga({ payload,meta: { resolve, reject } }) {
    try {
      const res = yield call(patchRequest, 'BseClientAccount/', payload);
      yield put(updateBSEBankAccountSuccess(res));
      yield call(resolve);
    } catch (error) {
      yield call(reject, error);
    }
  }

  function* deleteBankAccountSaga({ payload,meta: { resolve, reject } }) {
    try {
      const res = yield call(deleteRequest, 'BseClientAccount/', payload);
      yield put(deleteBSEBankAccountSuccess(res));
      yield call(resolve);
    } catch (error) {
      yield call(reject, error);
    }
  }
  
  

export default function* sagas() {
  //Master
  yield takeLatest(constants.GET_NOMINEE_RELEATION_REQUEST, getNomineeTypesSaga);
  yield takeLatest(constants.GET_OCCUPATION_LIST_REQUEST,getOccupationTypesSaga);
  yield takeLatest(constants.GET_WEALTH_LIST_REQUEST,getWealthTypesSaga);
  yield takeLatest(constants.GET_COUNTRY_LIST_REQUEST,getCountryTypesSaga);
  yield takeLatest(constants.GET_STATE_LIST_REQUEST,getStateTypesSaga);
  yield takeLatest(constants.GET_BANK_ACCOUNT_TYPES_REQUEST,getBankAccountTypesSaga);
  yield takeLatest(constants.GET_INCOME_SLAB_LIST_REQUEST,getIncomeSlabTypeSaga);

  yield takeLatest(constants.UPDATE_BSE_ACCOUNT_CREATION_REQUEST,updateUserSaga);
  //Nominess
  yield takeLatest(constants.ADD_BSE_ACCOUNT_NOMINEE_REQUEST,addUserNomineeSaga);
  yield takeLatest(constants.GET_BSE_ACCOUNT_NOMINEES_REQUEST,getUserNomineeSaga);
  yield takeLatest(constants.UPDATE_BSE_ACCOUNT_NOMINEE_REQUEST,updateUserNomineeSaga);
  yield takeLatest(constants.DELETE_BSE_ACCOUNT_NOMINEE_REQUEST,deleteUserNomineeSaga);

  //Bank
  yield takeLatest(constants.ADD_BSE_BANK_ACCOUNT_REQUEST,addBankAccountSaga);
  yield takeLatest(constants.GET_BSE_BANK_ACCOUNT_REQUEST,getBankAccountSaga);
  yield takeLatest(constants.UPDATE_BSE_BANK_ACCOUNT_REQUEST,updateBankAccountSaga);
  yield takeLatest(constants.DELETE_BSE_BANK_ACCOUNT_REQUEST,deleteBankAccountSaga);



}