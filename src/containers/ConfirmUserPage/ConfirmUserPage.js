import cn from "classnames";
import { change } from "redux-form";
import PropTypes from "prop-types";
import React, { Component, createRef } from "react";
import { notify } from "react-notify-toast";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ConfirmUserForm from "../../components/ConfirmUserForm/ConfirmUserForm";
import Spinner from "../../components/Spinner/Spinner";
import styles from "./ConfirmUserPage.module.scss";
// import {UpdateCustomerCognitoKeyRequest} from "../../actions/Auth";
import { Auth } from "aws-amplify";
import session from "redux-persist/lib/storage/session";


class ConfirmUserPage extends Component {
  constructor(props) {
    super(props);
    this.divToFocus = createRef();
    this.state = {
      genderTypes: [],
      isInitialLoading: false,
      isLoading: false,
      phoneTypes: [],
      states: [],
      isConfirmed: false,
    };
  }

  componentDidMount() {
    // Auth.currentSession().then(data=>sessionStorage.setItem("token",data.accessToken.jwtToken));
    // window.scrollTo(0, 0);
  }

  handleCSISuccess = (value) => {
    value = true;
    const { change, customerInfo } = this.props;
    change(
      "confirmUserForm",
      "email",
      value ? sessionStorage.getItem("email"): null
    );
  };

  handleSubmit = async (values) => {
  
    const {isConfirmed} = this.state;
    const {history} = this.props;
   
    try {
    await Auth.confirmSignUp(values.email, values.passcode);
    const myColor = { background: "#43A047", text: "#FFFFFF" };
      notify.show(
        `Email verification done successfully.`,
        `custom`,
        5000,
        myColor
      );
    history.push("/resetMpinPage");
    } catch (error) {
        notify.show(`error confirming sign up: ${error.message}`, 'error',3000);
    }
  };

  render() {
    const { isLoading,isConfirmed } = this.state;
    // const isInitialLoading = false;
    const { highContrast,isCmsPage,isMigrateUserReset } = this.props;
    const containerStyle = highContrast ? styles.darkContainer : null;
    return (
      <div className={cn(styles.primaryContainer,containerStyle)}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Confirm Page</title>
        </Helmet>
        {isConfirmed===false?(<div className={styles.heroImage} id="Skip-content">
          <div className={styles.heroImageOverlay}>
            <h1 className={styles.heroText}>Confirm Verification code</h1>
            <p className={styles.heroSubText}>
              Verification code has sent to your Email
            </p>
            <ConfirmUserForm
              loading={isLoading}
              handleCSISuccess={this.handleCSISuccess}
              onSubmit={this.handleSubmit}
            />
          </div>
        </div>):
       (<div className={styles.heroImage} id="Skip-content">
         <div className={styles.heroImageOverlay}>
        <p className={styles.heroSubText}>
              {isMigrateUserReset===false?(`Registration process successfully completed.`):(`Password Reset is Successfull.`)} Please{" "}
              {isCmsPage===true?(<Link className={styles.link} to= {"cmsSignInPage"} aria-label="signin">
                Sign In
              </Link>):(<Link className={styles.link} to= {"/"} aria-label="signin">
                Sign In
              </Link>)}{" "}
              with your credentials.
            </p>
        </div>
        </div>)}
      </div>
    );
  }
}
ConfirmUserPage.propTypes = {
  change: PropTypes.func.isRequired,
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
  isCmsPage: PropTypes.bool.isRequired,
  isMigrateUserReset: PropTypes.bool.isRequired,
};

ConfirmUserPage.defaultProps = {};

const mapStateToProps = (state) => ({
  // customerInfo: state.auth.customerInfo,
  // highContrast: state.header.highContrast,
  // isCmsPage: state.cmsPage.isCmsPage,
  // isMigrateUserReset: state.auth.isMigrateUserReset,
});

const mapDispatchToProps = {
  change,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmUserPage);
