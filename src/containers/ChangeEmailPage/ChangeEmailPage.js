import cn from "classnames";
import { change } from "redux-form";
import PropTypes from "prop-types";
import React, { Component, createRef } from "react";
import { notify } from "react-notify-toast";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ChangeEmailPasswordForm from "../../components/EmailPasswordUpdateForm/EmailPasswordUpdateForm.js";
import Spinner from "../../components/Spinner/Spinner";
import styles from "./ChangeEmailPage.module.scss";
import { setAuthStatus } from "../../actions/Header";
import { registerUserRequest } from '../../actions/UserManagement';

class ChangeEmailPage extends Component {
  constructor(props) {
    super(props);
    this.divToFocus = createRef();
    this.state = {
      isInitialLoading: false,
      isLoading: false,
      EmailChange: false,
      stageOne: true,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    
  }

  

  handleSubmit = async (values) => {
    const {registerUserRequest,userInfo,history} = this.props;
    this.setState({
      isLoading: true,
    });
    
    const res = new Promise((resolve, reject) =>
    registerUserRequest(
      {
       ...userInfo,
       email: values.email
      },
        {reject, resolve}
      )
    );
    res.then(() => {
      notify.show('Email Updated Successfully','success',5000,'green');
      this.setState({
        isLoading: false,
      });
      // if(userInfo.retirementStatus==1)
      // {
      //   history.push("/RiskProfilePage");
      // }else{
      //   history.push("/SustainabilityScorePage");
      // }
      history.push("/productHomePage");
    });
    res.catch(error => {
      alert(error);
        if (error.response.status === 400) {
        notify.show(
          `An error occurred. ${error.response.data.Message}`,
          'error',
          5000
        );
      } else {
        notify.show(
          `An error occurred. Please try again. Technical Information: ${error.response.data.Message}`,
          'error',
          5000
        );
      }
      this.setState({
        isLoading: false,
      });
    });
  };

  render() {
    const { isInitialLoading, isLoading, EmailChange, stageOne } = this.state;
    // const isInitialLoading = false;
    const { highContrast } = this.props;
    const containerStyle = highContrast ? styles.darkContainer : null;
    return (
      <div className={cn(styles.primaryContainer, containerStyle)}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>User Setting</title>
        </Helmet>
        <div className={styles.heroImage} id="Skip-content">
          <div className={styles.heroImageOverlay}>
            <h1 className={styles.heroText}>Email Setting</h1>
            <p className={styles.heroSubText}>
            Enter your  email address and will send the report.
            </p>
            <ChangeEmailPasswordForm
              loading={isLoading}
              handleCSISuccess={this.handleCSISuccess}
              onSubmit={this.handleSubmit}
              EmailChange={true}
              PasswordChange={false}
              stageOne={stageOne}
            />
          </div>
        </div>
      </div>
    );
  }
}
ChangeEmailPage.propTypes = {
 
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
  userInfo: PropTypes.shape({}).isRequired,
  registerUserRequest : PropTypes.func.isRequired
};

ChangeEmailPage.defaultProps = {};

const mapStateToProps = (state) => ({
  userInfo: state.userManagement.userInfo,
});

const mapDispatchToProps = {
  change,
  // UpdateCustomerCognitoKeyRequest,
  setAuthStatus,
  registerUserRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeEmailPage);
