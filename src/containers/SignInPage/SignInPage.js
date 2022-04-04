import React, { Component } from "react";
import { Helmet } from "react-helmet";
//import { notify } from 'react-notify-toast';
//import { Link } from 'react-router-dom';
import SignInForm from "../../components/SignInForm/SignInForm";
import SignInWithMobileForm from "../../components/SignInWithMobileForm/SignInWithMobileForm"
import styles from "./SignInPage.module.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAuthStatus, setUserName } from "../../actions/Header";
import {InputText} from "../../components/InputText/InputText";

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      beforeOtpEntered: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const {isAuthenticated,history} = this.props;
    if (!isAuthenticated) {
      history.push(`/`);
    }
  }

  handleSubmit = () => {
    const { setAuthStatus, history,userInfo } = this.props;
    setAuthStatus({ payload: { isAuthenticated: true } });
    
  };

  handleSubmitSuccess = (values) => {
 
    const { setAuthStatus, history } = this.props;
    const {beforeOtpEntered } = this.state;
    if(values.mobileNumber!==undefined || values.mobileNumber!=""){
      this.setState({
        beforeOtpEntered:!beforeOtpEntered
      });
    }
    // setAuthStatus({ payload: { isAuthenticated: true } });
    // history.push("/productHomePage");

  };

  //   redirectLocation = base => {
  //     const { location } = this.props;
  //     if (location) {
  //       if (location.pathname !== `/signIn` && location.pathname !== `/signUp`) {
  //         return `/${base}?redirect=${location.pathname}${
  //           location.search ? encodeURIComponent(location.search) : ''
  //         }`;
  //       }
  //       return `/${base}${location.search ? location.search : '?redirect=/'}`;
  //     }
  //     return `/${base}?redirect=/`;
  //   };

  redirectLocation = () => {};

  render() {
    const { isLoading,beforeOtpEntered } = this.state;
    return (
      <div className={styles.primaryContainer}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Login</title>
        </Helmet>

        <div className={styles.heroImage}>
          <div className={styles.welcomeBanner}>
            <h1 className={styles.welcomeText}>
              Sign in to <b>Fliber</b> Explore more solutions to manage your
              wealth investment wisely.
            </h1>
            
            <h1 className={styles.heroTextForMobile}>Would you prefer login with your Mobile Number <b>Click here</b></h1>
            
          </div>
          <div className={styles.heroImageOverlay}>
            <h1 className={styles.heroText}>Sign In</h1>
            <SignInForm loading={isLoading} onSubmit={this.handleSubmit} />
            <p className={styles.overlayTextContent}>
              Forgot Password?{" "}
              <Link
                aria-label="ForgetPassword"
                className={styles.link}
                to={"/resetPasswordPage"}
              >
                Click Here.
              </Link>
            </p>
            <p className={styles.overlayTextContent}>
              New to fliber?{" "}
              <Link
                aria-label="sign up"
                className={styles.link}
                to={"/signUpPage"}
              >
                Sign up.
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

SignInPage.propTypes = {
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
};

SignInPage.defaultProps = {};

const mapStateToProps = (state) => ({
  userInfo: state.userManagement.userInfo
});

const mapDispatchToProps = {
  setAuthStatus,
  setUserName,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
