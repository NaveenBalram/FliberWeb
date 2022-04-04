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
  registerUserRequest, getGenderListRequest, getMartialStatusRequest, getRetirementStatusRequest, updateUserInformationRequest,loginUserRequest
} from '../../actions/UserManagement'
import { setAuthStatus, setUserName } from '../../actions/Header';
import UserInformationForm from '../../components/UserInformationForm/UserInformationForm';
import Spinner from '../../components/Spinner/Spinner';
import styles from './UserInformationPage.module.scss';



class UserInformationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      genderTypes: [],
      RetireTypes: [],
      maritalStatus: [],
      isResidentConfirmed: false,
      isOn: false,
      retirementStatus:""
    };
  }

  componentDidMount() {
    const { getGenderListRequest, getMartialStatusRequest, getRetirementStatusRequest,loginUserRequest,userInfo } = this.props;
    const res1 = new Promise((resolve, reject) =>
      getGenderListRequest({ reject, resolve })
    );

    const res2 = new Promise((resolve, reject) =>
      getMartialStatusRequest({ reject, resolve })
    );
    const res3 = new Promise((resolve, reject) =>
      getRetirementStatusRequest({ reject, resolve })
    );
    const res4 = new Promise((resolve,reject) =>
       loginUserRequest(
        {
          "PhoneNumber": sessionStorage.getItem("mobileNumber").substring(2),
          "EmailId": ""
        },
        { reject, resolve }
       )
    );

    Promise.all([res1, res2, res3,res4])
      .then(() => this.handleSuccess())
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
    })
  }

  handleSubmit = value => {
    this.handleUpdateUserInformation(value)
  }

  handleUpdateUserInformation = value => {

    const { updateUserInformationRequest,userInfo } = this.props;
    this.setState({
      retirementStatus:value.retirementStatus,
      isLoading:true
    });
    const res = new Promise((resolve, reject) =>
      updateUserInformationRequest(
        {
          "Email": userInfo.Email,
          "FirstName": userInfo.FirstName,
          "LastName": userInfo.LastName,
          "Password": "",
          "StartDate": userInfo.StartDate,
          "Phone": userInfo.Phone,
          "ResidentStatus": "Indian",
          "IsStaff": true,
          "IsActive": true,
          "GenderId": value.gender,
          "RoleId": "775dd51b-4979-45ed-8a58-231830b28351",
          "RetirementStatusId": value.retirementStatus,
          "AdvisorId": "459a48dd-8fd6-4744-9155-236943c1867f",
          "MaritalStatusId": value.maritalStatus,
          "IsMobileNumberValidated": true,
          "IsEmailValidated": true,
          "DateOfBirth": userInfo.DateOfBirth,
          "MPIN": 0,
          "IMEINumber": "string",
          "CreatedOn":  moment().format(),
          "UpdatedOn": moment().format(),
          "Id": userInfo.Id
        },
        { reject, resolve }
      )
    );
    res.then(() => {
      this.setState({
        isLoading: false,
      });
      this.handleSubmitSuccess()
    });
    res.catch((error) => {
      this.setState({
        isLoading: false,
      })
    });

  }

  handleSubmitSuccess = () => {
    const { setAuthStatus, userInfo, history } = this.props;
   
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
    const {retirementStatus} = this.state;
    if (retirementStatus === 'd597ffe5-5c2d-4f9f-bc04-b12c3176c10f') {
      history.push("/productHomePage");
      //}
    } else {
      history.push("/PostRetireeDashboardPage");
    }
  }

  render() {
    const {
      isLoading, RetireTypes, genderTypes, maritalStatus
    } = this.state;


    return (
      <div className={styles.container}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>User Information</title>
        </Helmet>
        {isLoading
          ? <Spinner />
          : (<div>
            <div className={styles.heading}>
              <h1 className={styles.heroText}>Fliber requires few more information.</h1>
            </div>
            <div className={styles.heroImageOverlay}>
              <UserInformationForm
                genderTypes={genderTypes}
                handleCSISuccess={this.handleCSISuccess}
                loading={false}
                onSubmit={this.handleSubmit}
                maritalStatus={maritalStatus}
                RetireTypes={RetireTypes}
              />
            </div>
          </div>)}
      </div>
    );
  }
}

UserInformationPage.propTypes = {

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
  updateUserInformationRequest: PropTypes.func.isRequired,
  loginUserRequest:PropTypes.func.isRequired
};

UserInformationPage.defaultProps = {};

const mapStateToProps = state => ({
  userInfo: state.userManagement.userInfo,
  genderTypes: state.userManagement.genderTypes,
  retireTypes: state.userManagement.retireTypes,
  maritalStatus: state.userManagement.maritalStatus,
});

const mapDispatchToProps = {
  change,
  registerUserRequest,
  setAuthStatus,
  setUserName,
  getGenderListRequest,
  getMartialStatusRequest,
  getRetirementStatusRequest,
  updateUserInformationRequest,
  loginUserRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInformationPage);
//export default SignUpPage;
