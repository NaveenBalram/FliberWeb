import * as constants from '../constants/Header';

const initialState = {
  isAuthenticated: false,
  userName: null,
  isEmailChangeRequest:false,
  isPasswordChangeRequest:false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
   
    case constants.SET_AUTH_STATUS: {
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
      };
    }
    case constants.SET_USER_NAME: {
      return {
        ...state,
        userName: action.payload.userName,
      };
    }
    
    case constants.SET_EMAIL_CHANGE:{
      return {
        ...state,
        isEmailChangeRequest: true,
        isPasswordChangeRequest: false,
      };
    }

    case constants.SET_PASSWORD_CHANGE:{
      return {
        ...state,
        isPasswordChangeRequest: true,
        isEmailChangeRequest:false
      };
    }

    case constants.RESET_VALUES:{
      return {
       initialState
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
