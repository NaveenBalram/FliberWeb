import cn from 'classnames';
import { change } from 'redux-form';
import PropTypes from 'prop-types';
import moment from 'moment';
import qs from 'query-string';
import React, { Component } from 'react';
import { notify } from 'react-notify-toast';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  registerUserRequest, getGenderListRequest, getMartialStatusRequest, getRetirementStatusRequest,
  updatePhoneVerificationRequest,getUserPhoneVerifiedRequest
} from '../../actions/UserManagement'
import { setAuthStatus, setUserName } from '../../actions/Header';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import Spinner from '../../components/Spinner/Spinner';
import styles from './SignUpPage.module.scss';
import { Auth } from "aws-amplify";
import { update } from 'lodash';


class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      genderTypes: [],
      RetireTypes: [],
      maritalStatus: [],
      isResidentConfirmed: false,
      isOn: false,
    };
  }

  componentDidMount() {
    const { getGenderListRequest, getMartialStatusRequest, getRetirementStatusRequest } = this.props;
    const res1 = new Promise((resolve, reject) =>
      getGenderListRequest({ reject, resolve })
    );

    const res2 = new Promise((resolve, reject) =>
      getMartialStatusRequest({ reject, resolve })
    );
    const res3 = new Promise((resolve, reject) =>
      getRetirementStatusRequest({ reject, resolve })
    );

    Promise.all([res1, res2, res3])
      .then(() => this.handleVerifyUserIsAvailable())
      .catch(error => {
        if (error.response.status === 400) {
          notify.show(`${error.response.data.message}`, 'error', 10000);
        } else {
          notify.show(` ${error}`, 'error', 5000);
        }
      });
  }

  handleSuccess() {
    const { genderTypes, maritalStatus, retireTypes } = this.props;
  
    this.setState({
      RetireTypes: retireTypes,
      genderTypes: genderTypes,
      maritalStatus: maritalStatus
    });
  }

  handleToggle = () => {
    this.setState({
      isOn: !this.state.isOn
    });
  }


  handleVerifyUserIsAvailable = () => {
    const { getUserPhoneVerifiedRequest } = this.props;
    const res = new Promise((resolve, reject) =>
      getUserPhoneVerifiedRequest(
        { reject, resolve }
      )
    );
    res.then(() => {
      this.handleSuccess();
    });
    res.catch((error) => {
      if (error.response.status === 500) {
      }
    });
  }

  handleUpdateUserPhoneVerification = (value) => {
    const { updatePhoneVerificationRequest, userPhoneVerifiedInfo } = this.props;
    const phone_number = sessionStorage.getItem("mobileNumber").substring(2);
    const userExit = userPhoneVerifiedInfo.filter(x => x.Phone === phone_number);
    const resUser = new Promise((reject, resolve) =>
      updatePhoneVerificationRequest(
        {
          "Phone": phone_number,
          "Password": "",
          "IsMobileVerified": true,
          "CreatedOn": userExit[0].CreatedOn,
          "UpdatedOn": moment().format(),
          "IsDeleted": false,
          "IsResidentialInformation": value,
          Id: userExit[0].Id
        },
        { reject, resolve }
      ));
    resUser.then(() => {
      this.setState({ isLoading: value });
    });
    resUser.catch((error) => {
      this.setState({
        isLoading: false,
      })
    });
  }

  handleSubmit = value => {

    const { isResidentConfirmed } = this.state;
    if (isResidentConfirmed === false) {
      this.setState({
        isResidentConfirmed: true,
      });
      this.handleUpdateUserPhoneVerification(true);
    } else {
      //this.handleSigUpCognito(value);
     
      this.handleSubmitWithDatabase(value)
    }
  }

  handleSigUpCognito = async (values) => {
    //const phone_number = "+91" + values.mobileNumber.replace(/\D+g/,"");
    const phone_number = "+91" + sessionStorage.getItem("mobileNumber");
    const email = values.email
    sessionStorage.setItem("email", values.email);
    sessionStorage.setItem("tempPwd", values.firstName + '100');
    try {
      await Auth.signUp({
        username: email,
        password: values.firstName + '100',
        phone_number: phone_number,
        attributes: {
          email,
          phone_number
        }
      });
     
      this.handleSubmitSuccess()
    } catch (error) {
      this.handleUpdateUserPhoneVerification(false);
      notify.show(
        `An error occurred. ${error.message}`,
        'error',
        5000
      );
      this.setState({ isLoading: false });
    }
  }


  handleSubmitWithDatabase = value => {

    const { registerUserRequest } = this.props;

    const dateFormate = moment(value.dateOfBirth).format();
    this.setState({
      isLoading: true,
    });
    const res = new Promise((resolve, reject) =>
      registerUserRequest(
        {
          "Email": value.email,
          "FirstName": value.firstName,
          "LastName": value.lastName,
          "Phone": sessionStorage.getItem("mobileNumber").substring(2),
          "ResidentStatus": "Indian",
          "DateOfBirth": dateFormate,
        },
        { reject, resolve }
      )
    );
    res.then(() => this.handleSigUpCognito(value));
    res.catch(error => {
      this.handleUpdateUserPhoneVerification(false);
      if (error.response.status === 400) {
        notify.show(
          `An error occurred. ${error.response.data.Message}`,
          'error',
          5000
        );
      } else {
        if(error.response.status=== 409){
          notify.show(
            `EmailId is already exist. Please try with correct emailId.`,
            'error',
            5000
          );
        }else{
          notify.show(
            `An error occurred. Please try again. Technical Information: ${error.response.data.Message}`,
            'error',
            5000
          );
        }
      }
      this.setState({
        isLoading: false,
      });
    });


  }

  handleSubmitSuccess = () => {
    const { history, setAuthStatus, setUserName, userInfo } = this.props;
    this.handleUpdateUserPhoneVerification(true);
    history.push("/confirmUserPage")
  }



  render() {
    const {
      isLoading, RetireTypes, genderTypes, maritalStatus, isResidentConfirmed, isOn
    } = this.state;
    const containerStyle = isResidentConfirmed === true ? styles.container : styles.containerNoMargin;

    return (
      <div className={containerStyle}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Welcome Fliber</title>
        </Helmet>
        {isLoading
          ? <Spinner />
          : (<div>
            <div className={styles.heading}>
              <h1 className={styles.heroText}>{isResidentConfirmed === true ? (`We required few information about you.`) : (`Confirm your Resident Information`)}</h1>
              {isResidentConfirmed === true ? (<p className={styles.heroSubText}>
                No worries your information is very safe with us.
              </p>) : (null)}
            </div>
            <div className={styles.heroImageOverlay}>
              <SignUpForm
                genderTypes={genderTypes}
                handleCSISuccess={this.handleCSISuccess}
                highContrast={true}
                loading={false}
                onSubmit={this.handleSubmit}
                maritalStatus={maritalStatus}
                RetireTypes={RetireTypes}
                isResidentConfirmed={isResidentConfirmed}
                isOn={isOn}
                handleToggle={this.handleToggle}
              />
            </div>
          </div>)}
      </div>
    );
  }
}

SignUpPage.propTypes = {
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
  setAuthStatus: PropTypes.func.isRequired,
  registerUserRequest: PropTypes.func.isRequired,
  userInfo: PropTypes.shape({}),
  genderTypes: PropTypes.arrayOf({}).isRequired,
  retireTypes: PropTypes.arrayOf({}).isRequired,
  maritalStatus: PropTypes.arrayOf({}).isRequired,
  getRetirementStatusRequest: PropTypes.func.isRequired,
  getMartialStatusRequest: PropTypes.func.isRequired,
  getRetirementStatusRequest: PropTypes.func.isRequired,
  updatePhoneVerificationRequest: PropTypes.func.isRequired,
  getUserPhoneVerifiedRequest:PropTypes.func.isRequired
};

SignUpPage.defaultProps = {};

const mapStateToProps = state => ({
  userInfo: state.userManagement.userInfo,
  genderTypes: state.userManagement.genderTypes,
  retireTypes: state.userManagement.retireTypes,
  maritalStatus: state.userManagement.maritalStatus,
  userPhoneVerifiedInfo: state.userManagement.userPhoneVerifiedInfo
});

const mapDispatchToProps = {
  change,
  registerUserRequest,
  setAuthStatus,
  setUserName,
  getGenderListRequest,
  getMartialStatusRequest,
  getRetirementStatusRequest,
  updatePhoneVerificationRequest,
  getUserPhoneVerifiedRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);

