import * as constants from '../constants/UserManagement';

const initialState = {
  userInfo:{},
  genderTypes:[],
  retireTypes:[],
  maritalStatus:[],
  panVerified:{},
  ifscCode:{},
  isPaymentClicked: false,
  isBSEAccountCreated: false,
  userPhoneVerifiedInfo:[]
};

const reducer = (state = initialState, action) => {
  
  switch (action.type) {
    
    case constants.REGISTER_USER_SUCCESS: {
      return {  
        ...state,
        userInfo: action.payload.data,
      };
    }

    case constants.LOGIN_USER_SUCCESS: {
      //action.payload.data.MPIN = "123456"
      return {
        ...state,
        userInfo: action.payload.data,
      };
    }
    case constants.GET_GENDER_LIST_SUCCESS: {
      return {
        ...state,
        genderTypes: action.payload.data,
      };
    }
    case constants.GET_MARITAL_STATUS_SUCCESS: {
      return {
        ...state,
        maritalStatus: action.payload.data,
      };
    }
    case constants.GET_RETIREMENT_STATUS_SUCCESS: {
      return {
        ...state,
        retireTypes: action.payload.data,
      };
    }

    case constants.LOGOUT_USER_SUCCESS: {
      return {
        ...state,
        userInfo:{},
        genderTypes:[],
        retireTypes:[],
        maritalStatus:[]
      };
    }

    case constants.UPDATE_USER: {
      //action.payload.data.MPIN = "123456"
      return {
        ...state,
        userInfo:{
          ...state.userInfo,
          ModuleType: action.payload.moduleType,
          Status: action.payload.status,
        },
      };
    }

    case constants.PANCARD_VERIFICATION_SUCCESS:{
      return{
         ...state,
         panVerified:action.payload.data
      };
    }

    case constants.IFSC_CODE_SUCCESS:{
     
      return{
         ...state,
         ifscCode:action.payload.data
      };
    }


    case constants.SET_PAYMENT_SUCCESS:{
      return{
        ...state,
        isPaymentClicked:action.payload.isPaymentClicked
      }
    }

    case constants.SET_BSE_ACCOUNT_SUCCESS:{
      return{
        ...state,
        isBSEAccountCreated:action.payload.isBSEAccountCreated
      }
    }

    case constants.GET_USER_PHONE_VERIFIED_SUCCESS:{
      return{
        ...state,
        userPhoneVerifiedInfo:action.payload.data,
      }
    }

    // case constants.UPDATE_USER_INFORMATION_SUCCESS:{
    //   return{
    //     ...state,
    //     userInfo:action.payload.data,
    //   }
    //}

    default: {
      return state;
    }
  }
};

export default reducer;
