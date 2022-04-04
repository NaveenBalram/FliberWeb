import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { change } from "redux-form";
import { notify } from "react-notify-toast";
import styles from "./MyAccountInformation.module.scss";
import Spinner from "../../components/Spinner/Spinner";
import {
  registerUserRequest, getGenderListRequest, getMartialStatusRequest, getRetirementStatusRequest,
  updatePhoneVerificationRequest,getUserPhoneVerifiedRequest
} from '../../actions/UserManagement'
import { Helmet } from "react-helmet";
import EditCustomerInfo from "../../components/EditCustomerInfo/EditCustomerInfo";
import cn from 'classnames';
// import { Auth } from "aws-amplify";
import {setAuthStatus} from "../../actions/Header";



class MyAccountInformation extends Component {
  constructor() {
    super();
    this.state = {
      accountInformation: true,
      genderTypes: [],
      isInitialLoading: false,
      isLoading: false,
      RetireTypes:[],
      states: [],
    };
  }
  

  componentDidMount() {
    const {  isAuthenticated, history } = this.props;

    if (!isAuthenticated) {
     
      history.push(`/`);
    }else{
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
      .then(() => this.handleCSISuccess(null))
      .catch(error => {
        if (error.response.status === 400) {
          notify.show(`${error.response.data.message}`, 'error', 10000);
        } else {
          notify.show(` ${error}`, 'error', 5000);
        }
      });
    //this.handleCSISuccess();
    }
  }

  handleCSISuccess = (value) => {
   
    value = true;
    const { change, userInfo  } = this.props;
    const { genderTypes, maritalStatus, retireTypes } = this.props;
  
    this.setState({
      RetireTypes: retireTypes,
      genderTypes: genderTypes,
      maritalStatus: maritalStatus,
      isInitialLoading: false,
    });
   
    change(
      "editCustomerInfo",
      "firstName",
      value ?  userInfo.FirstName:null    //customerInfo.FirstName : null
    );
    change(
      "editCustomerInfo",
      "middleName",
      value ? "B" : null
    );
    change(
      "editCustomerInfo",
      "lastName",
      value ? userInfo.LastName: null
    );
    change(
      "editCustomerInfo",
      "dateOfBirth",
      value ? moment(userInfo.DateOfBirth).format("MM/DD/YYYY") : null
    );
    change("editCustomerInfo", "gender", value ? userInfo.GenderId : null);
    change("editCustomerInfo","RetirementStatus",value ? userInfo.RetirementStatusId :null);
   
    change(
      "editCustomerInfo",
      "phoneNumber",
      value ? userInfo.Phone : null
    );
    change(
      "editCustomerInfo",
      "maritalStatus",
      value ? userInfo.MartialStatusId : null
    );
  };

  handleSubmit = () =>{
    // const myColor = { background: "#43A047", text: "#FFFFFF" };
    // notify.show(
    //   `Information has been successfully updated. Thank you`,
    //   `custom`,
    //   5000,
    //   myColor
    // );
    this.navigate();
  }

  navigate = () => {
    const { userInfo, history } = this.props;
  
    if ( userInfo.RetirementStatusId === 'd597ffe5-5c2d-4f9f-bc04-b12c3176c10f') {
      history.push("/productHomePage");
      //}
    } else {
      history.push("/PostRetireeDashboardPage");
    }
  }

  render() {
    const { isInitialLoading, isLoading } = this.state;
    const { customerInfo, signUpInitialData,highContrast,retireTypes,genderTypes,maritalStatus } = this.props;
    const textStyle = highContrast ? styles.darkContainer : null;
    return (
      <div className={cn(styles.container, textStyle)} id="Skip-content">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Account Information</title>
        </Helmet>
        {isInitialLoading ? (
          <Spinner className={styles.spinner} />
        ) : (
          <div className={styles.subContainer}>
            <h1 className={styles.heroText}>Account Information</h1>
            <EditCustomerInfo
              highContrast={null}
              customerDetails={null}
              genderTypes={genderTypes}
              handleCSISuccess={this.handleCSISuccess}
              loading={isLoading}
              onSubmit={this.handleSubmit}
              RetireTypes ={retireTypes}
              maritalStatus={maritalStatus}
            />
          </div>
        )}
      </div>
    );
  }
}

MyAccountInformation.propTypes = {
  change: PropTypes.func.isRequired,
  authProviderRequest: PropTypes.func.isRequired,
  getCustomerServiceInfo: PropTypes.func.isRequired,
  highContrast : PropTypes.bool.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string,
    }),
    push: PropTypes.func.isRequired,
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  updateCustomerDetailsRequest: PropTypes.func.isRequired,
  userInfo: PropTypes.shape({}).isRequired,
  getRetirementStatusRequest: PropTypes.func.isRequired,
  getMartialStatusRequest: PropTypes.func.isRequired,
  getRetirementStatusRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
 
  isAuthenticated: state.header.isAuthenticated,
  userInfo: state.userManagement.userInfo,
  genderTypes: state.userManagement.genderTypes,
  retireTypes: state.userManagement.retireTypes,
  maritalStatus: state.userManagement.maritalStatus,

});

const mapDispatchToProps = {
  change,
  setAuthStatus,
  getGenderListRequest,
  getMartialStatusRequest,
  getRetirementStatusRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyAccountInformation);
