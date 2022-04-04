import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { notify } from "react-notify-toast";
import { Link } from 'react-router-dom';
import SignInForm from "../../components/SignInForm/SignInForm";
import SignInWithMobileForm from "../../components/SignInWithMobileForm/SignInWithMobileForm";
import styles from "./SignInPageWithMobile.module.scss";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAuthStatus, setUserName } from "../../actions/Header";
import { loginUserRequest, getUserPhoneVerifiedRequest, addUserPhoneVerifiedRequest } from "../../actions/UserManagement";
import { delay } from "@redux-saga/core/effects";
import { Auth } from "aws-amplify";
import { before } from "lodash";
import firebase from '../../UserManagement/firebase_config';
import moment from "moment";


class SignInPageWithMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      beforeOtpEntered: false,
      mobileNumber: "",
      otp: "",
      emailId: "",
      isEmailClicked: false,
      userPhoneVerifiedInfo: []
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const {setAuthStatus} = this.props;
    sessionStorage.clear();
    this.handleVerifyUserIsAvailable()
    setAuthStatus({ payload: { isAuthenticated: false } });
  }


  handleEmailClicked = () => {
    const { isEmailClicked } = this.state;
    this.setState({
      isEmailClicked: !isEmailClicked
    });
  }


  handleVerifyUserIsAvailable = (values) => {
    const { getUserPhoneVerifiedRequest } = this.props;
    const res = new Promise((resolve, reject) =>
      getUserPhoneVerifiedRequest(
        { reject, resolve }
      )
    );
    res.then(() => {
      this.handleInitialState();
    });
    res.catch((error) => {
      if (error.response.status === 500) {
      }
    });
  }

  handleInitialState() {
    const { userPhoneVerifiedInfo } = this.props;

    this.setState({
      userPhoneVerifiedInfo: userPhoneVerifiedInfo
    });
  }

  handleAddPhoneVerifiedUser = (mobileNumber) => {
    const { addUserPhoneVerifiedRequest, history } = this.props;

    const res = new Promise((resolve, reject) =>
      addUserPhoneVerifiedRequest(
        {
          "Phone": mobileNumber.substring(2),
          "Password": "",
          "IsMobileVerified": true,
          "CreatedOn": moment().format(),
          "UpdatedOn": moment().format(),
          "IsDeleted": false,
          "IsResidentialInformation": false
        },
        { reject, resolve }
      )
    );
    res.then(() => {
      const myColor = { background: "#43A047", text: "#FFFFFF" };
      delay(3000)
      history.push("/signUpPage");
      notify.show(
        `OTP Validation Completed. Please proceed with registration.`,
        `custom`,
        5000,
        myColor
      );
    });
    res.catch((error) => {
      if (error.response.status === 500) {
      }
    });
  }

  signIn = (mobileNo) => {
    let recaptcha = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
      }
    });
    let number = `+91${mobileNo}`;
    firebase
      .auth()
      .signInWithPhoneNumber(number, recaptcha)
      .then((e) => {
        window.confirmResult = e
      })
      .catch((error) => {
        console.log(error);
      });
  }
  verifyOTP = (otp) => {
    const { mobileNumber } = this.state;
   
    window.confirmResult.confirm(otp).then((result) => {
      const user = result.user;
      this.handleAddPhoneVerifiedUser(mobileNumber);
      this.setState({isLoading:true});
    }).catch((err) => {
      notify.show(
        `Invalid OTP. Please enter correct OTP.`,
        `error`,
        5000,
      );
    })
  }

  handleSignIn = async (value) => {
    const { userInfo } = this.props;
    const { emailId, isEmailClicked } = this.state;

    const email = isEmailClicked === true ? emailId : userInfo.Email;

    try {
      const user = await Auth.signIn(email, value);
      this.handleSubmitSuccess()
    } catch (error) {
      this.setState({
        isLoading: false
      });
      notify.show(`MPIN is invalid.Kindly enter the correct MPIN.`, "error", 3000);
    }

  }

  handleSubmit = (values) => {
    const { history } = this.props;
    const { beforeOtpEntered, mobileNumber, otp, userPhoneVerifiedInfo, userInfo, emailId, isEmailClicked } = this.state;
    const userPhoneIsAvailable = isEmailClicked === true ? userPhoneVerifiedInfo.filter(x => x.Email === values.email) :
      userPhoneVerifiedInfo.filter(x => x.Phone === values.mobileNumber);

    this.setState({
      mobileNumber: "91" + values.mobileNumber,
      isLoading: true,
    });

    if (userPhoneIsAvailable.length > 0 &&  userPhoneVerifiedInfo.length >0 ) {
      if (userPhoneIsAvailable[0].IsMobileVerified === true && userPhoneIsAvailable[0].IsResidentialInformation === false) {
        history.push('/signUpPage');
      }
    }

    if (isEmailClicked === true) {
      this.setState({
        emailId: values.emailAddress
      })
    }

    if (beforeOtpEntered === false) {   // mobile number is exist, then check with database,
      sessionStorage.setItem("mobileNumber", "91" + values.mobileNumber);
      if (userPhoneIsAvailable.length > 0) {
        if (isEmailClicked === false) {
          this.login(sessionStorage.getItem("mobileNumber"), "");
        } else {
          this.login("", values.emailAddress);
        }
      }
      this.setState({
        isLoading: false,
        beforeOtpEntered: !beforeOtpEntered
      });
      if (userPhoneIsAvailable.length === 0) {  //Verify Mobile number
        this.signIn(values.mobileNumber);
      }
    } else {
      this.setState({
        otp: values.otp,
        isLoading: true
      });

      if (userPhoneIsAvailable.length === 0 || userPhoneVerifiedInfo.length === 0) {
        delay(5000);
        this.verifyOTP(values.otp);

        this.setState({ isLoading: false });
      } else {
        delay(5000)
        this.handleSignIn(values.otp);
      }
    }

  }

  login = async (mobileNumber, email) => {
    const { setAuthStatus, history, loginUserRequest } = this.props;
    const res = new Promise((resolve, reject) =>
      loginUserRequest(
        {
          "PhoneNumber": mobileNumber.substring(2),
          "EmailId": email
        },
        { reject, resolve }
      )
    );
    res.then(() => {
      this.setState({
        isLoading: false,
      });
      this.handleVerifyUserIsAvailable();
    });
    res.catch((error) => {
      this.setState({
        isLoading: false,
      })
    });
  };

  handleSubmitSuccess = () => {
    const { setAuthStatus, userInfo, history } = this.props;
    const { beforeOtpEntered, mobileNumber } = this.state;

    if (userInfo !== undefined || userInfo != null) {
      setAuthStatus({ payload: { isAuthenticated: true } });
      setUserName({
        payload: {
          userName: `${userInfo.FirstName} ${" "}${userInfo.LastName}`,
        },
      });

      this.navigate();
    }

  };

  navigate = () => {
    const { userInfo, history } = this.props;
    if (userInfo.RetirementStatusId === 'd597ffe5-5c2d-4f9f-bc04-b12c3176c10f') {
      history.push("/productHomePage");
    } else {
      history.push("/PostRetireeDashboardPage");
    }
  }

  redirectLocation = () => { };

  render() {
    const { isLoading, beforeOtpEntered, mobileNumber, isEmailClicked, emailId } = this.state;
    const { userInfo } = this.props;
    return (
      <div className={styles.primaryContainer}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Login</title>
        </Helmet>
        <div className={styles.heroImage}>
          <div className={styles.welcomeBanner}>
            <h1 className={styles.welcomeText}>
              Welcome to <b>Fliber</b> Explore more solutions to manage your
              wealth investment wisely.
            </h1>
            {isEmailClicked === false ? <h1 className={styles.heroTextForMobile}>
              {beforeOtpEntered === false
                ? `Give us your contact number you will recieve OTP to get Authenticate.`
                : `We’ve sent you an SMS with a 6-digit verification code on ${mobileNumber}`}
            </h1> : <h1 className={styles.heroTextForMobile}>
              {beforeOtpEntered === false
                ? `Give us your email address you will recieve OTP to get Authenticate.`
                : `We’ve sent you an mail  with a 6-digit verification code on ${emailId}`}
            </h1>}
          </div>
          <div className={styles.heroImageOverlay}>
            <h1 className={styles.heroTextForMobileText}>Authenticate here.</h1>
            {isEmailClicked === false ? (<p className={styles.heroTextForMobilePara}>
              {beforeOtpEntered === false
                ? `Enter your Mobile Number`
                : userInfo != null && userInfo.MPIN ? `Enter the 6 digits master pin(MPIN)` : `Enter OTP which received in your mobile`}
            </p>) : (<p className={styles.heroTextForMobilePara}>
              {beforeOtpEntered === false
                ? `Enter your Email Address`
                : userInfo != null && userInfo.MPIN ? `Enter the 6 digits master pin(MPIN)` : `Enter OTP which received in your Email Address`}
            </p>)}
            <SignInWithMobileForm
              loading={isLoading}
              onSubmit={this.handleSubmit}
              BeforeOTPEnter={beforeOtpEntered}
              userInfo={userInfo}
              isEmailClicked={isEmailClicked}
            />
            <div className={styles.none} id="sign-in-button"></div>
            {(Object.keys(userInfo).length !== 0) ? (
              <p className={styles.overlayTextContent}>
                Forgot Password?{" "}
                <Link
                  aria-label="ForgetPassword"
                  className={styles.link}
                  to={"/DOBValidationPage"}
                >
                  Click Here.
                </Link>
              </p>) : (<p className={styles.overlayTextContent}>
                {isEmailClicked === false ? `Login With Email` : `Login With Mobile Number`}?{" "}
                <Link
                  aria-label="Login with Email"
                  className={styles.link}
                  onClick={this.handleEmailClicked}
                  to={"/LoginWithAuthPage"}
                >
                  click here
                </Link>
              </p>)}

          </div>
        </div>
      </div>
    );
  }
}

SignInPageWithMobile.propTypes = {
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
  setAuthStatus: PropTypes.func.isRequired,
  setUserName: PropTypes.func.isRequired,
  userInfo: PropTypes.shape({}).isRequired,
  auth: PropTypes.func.isRequired,
  getUserPhoneVerifiedRequest: PropTypes.func.isRequired,
  userPhoneVerifiedInfo: PropTypes.shape({}).isRequired,
  addUserPhoneVerifiedRequest: PropTypes.func.isRequired
};

SignInPageWithMobile.defaultProps = {};

const mapStateToProps = (state) => ({
  userInfo: state.userManagement.userInfo,
  userPhoneVerifiedInfo: state.userManagement.userPhoneVerifiedInfo
});

const mapDispatchToProps = {
  setAuthStatus,
  setUserName,
  loginUserRequest,
  getUserPhoneVerifiedRequest,
  addUserPhoneVerifiedRequest
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInPageWithMobile);
