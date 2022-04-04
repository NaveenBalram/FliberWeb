import cn from "classnames";
import { change } from "redux-form";
import PropTypes from "prop-types";
import React, { Component, createRef } from "react";
import { notify } from "react-notify-toast";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ResetPasswordForm from "../../components/ReserPasswordForms/ResetPasswordForms";
import Spinner from "../../components/Spinner/Spinner";
import styles from "./ResetPasswordPage.module.scss";
import { Auth } from "aws-amplify";
// import {isEmailExistRequest} from "../../actions/Auth";
import { setAuthStatus } from "../../actions/Header";
import { delay } from "lodash";


class ResetPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.divToFocus = createRef();
    this.state = {
      isInitialLoading: false,
      isLoading: false,
      stageOne:false,
      isEmailExists:true,
      
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleCSISuccess = (values) => {
   const {isEmailExist} = this.props;

   this.setState({
     isEmailExists:isEmailExist
   });
   this.handleInvalidErrorMessage(values)
  };

 handleCognitoWithForgot = async (values) => {
    const {stageOne} = this.state;
   const {history,setAuthStatus,userInfo} = this.props;

  if(stageOne===true){
    try {
      await Auth.forgotPassword(values.email);
      this.setState({
        stageOne:false
      });
    } catch (error) {
      this.setState({
        stageOne:false
      });
        notify.show(`error confirming Reset MPIN: ${error.message}`, 'error',3000);
    }
   }else{
    try {
      await Auth.forgotPasswordSubmit(
        userInfo.Email,
        values.Confirmation_Code,
        values.password
      );
        setAuthStatus({ payload: { isAuthenticated: false } });
        const myColor = { background: "#43A047", text: "#FFFFFF" };
        notify.show(
          `New MPIN updated successfully. Please Login`,
          `custom`,
          5000,
          myColor
        );
        history.push('/LoginWithAuthPage');
    } catch (error) {
      this.setState({
        stageOne:false
      });
      notify.show(`error confirming Reset MPIN: ${error.message}`, 'error',3000);
    }
  }
};

handleInvalidErrorMessage = (values) =>{
   const {isEmailExists} = this.state;
  
   if(isEmailExists===false){
     notify.show(`Emailid not found in our records. Please verify.`,"error",5000);
   }else{
     this.handleCognitoWithForgot(values);
  }

}


  handleSubmit = async (values) => {
    const {isLoading} = this.props;
    this.setState({
      isLoading:false,
      stageOne:false
    });
    this.handleCognitoWithForgot(values);

  };

  render() {
    const { isInitialLoading, isLoading,stageOne } = this.state;
    // const isInitialLoading = false;
    const { highContrast } = this.props;
    const containerStyle = highContrast ? styles.darkContainer : null;
    return (
      <div className={cn(styles.primaryContainer,containerStyle)}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Reset Password</title>
        </Helmet>

        <div className={styles.heroImage} id="Skip-content">
          <div className={styles.heroImageOverlay}>
            <h1 className={styles.heroText}>{stageOne===true?(`Forgot MPIN`):(`Reset MPIN`)}</h1>
            <p className={styles.heroSubText}>
           {stageOne===true? (`Enter your email address and we will send verification code to reset your MPIN`):(
             `Enter verification code and reset your MPIN.`
           )} 
            </p>
            <ResetPasswordForm
              loading={isLoading}
              handleCSISuccess={this.handleCSISuccess}
              onSubmit={this.handleSubmit}
              stageOne = {false}
            />
          </div>
        </div>
      </div>
    );
  }
}
ResetPasswordPage.propTypes = {
  change: PropTypes.func.isRequired,
  userInfo:PropTypes.func.isRequired,
  customerInfo: PropTypes.arrayOf({
    AddressLine1: PropTypes.string,
    AddressLine2: PropTypes.string,
    BirthDate: PropTypes.string,
    CityName: PropTypes.string,
    CustomerID: PropTypes.number,
    ContactEmail: PropTypes.string,
    FirstName: PropTypes.string,
    GenderID: PropTypes.number,
    LastName: PropTypes.string,
    LoginPWD: PropTypes.string,
    MiddleInitial: PropTypes.string,
    Password: PropTypes.string,
    CellPhone: PropTypes.string,
    OtherPhone: PropTypes.string,
    OtherPhoneId: PropTypes.string,
    CellPhoneId: PropTypes.string,
    Code: PropTypes.string,
    SSN: PropTypes.string,
    StateAbbr: PropTypes.string,
  }),
  highContrast: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string,
    }),
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string,
  }).isRequired,
  UpdateCustomerCognitoKeyRequest: PropTypes.func.isRequired,
  setAuthStatus: PropTypes.func.isRequired,
};

ResetPasswordPage.defaultProps = {};

const mapStateToProps = (state) => ({
  // customerInfo: state.auth.customerInfo,
  // highContrast: state.header.highContrast,
  // isCmsPage: state.cmsPage.isCmsPage,
  // isEmailExist: state.auth.isEmailExist,
  userInfo: state.userManagement.userInfo,
});

const mapDispatchToProps = {
  change,
  //isEmailExistRequest,
  setAuthStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);
