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
import styles from "./ChangePasswordPage.module.scss";
import { Auth } from "aws-amplify";
import { setAuthStatus } from "../../actions/Header";
import { registerUserRequest } from '../../actions/UserManagement';
import { loginUserRequest } from "../../actions/UserManagement";

class ChangePasswordPage extends Component {
  constructor(props) {
    super(props);
    this.divToFocus = createRef();
    this.state = {
      isInitialLoading: false,
      isLoading: false,
      EmailChange: false,
      MPINChange: false,
      currentUser:{}
    };
  }

  componentDidMount() {
    const {userInfo,isAuthenticated} = this.props;
    window.scrollTo(0, 0);
    if(!isAuthenticated){
      this.handleSignIn();
    }
    
  }
 
  handleSignIn = async ()=>
  {
    try{
      const user = await Auth.signIn(sessionStorage.getItem("email"),sessionStorage.getItem("tempPwd"));
      this.setState({
        currentUser:user
      });
    }catch(error){
      notify.show(`Error in MPIN Update: ${error}`, "error", 3000);
    }
    
  }

  handleSubmit = async (values) => {
    const { history,isAuthenticated } = this.props;
    const prevPassword = isAuthenticated===true?values.old_mpin: sessionStorage.getItem("tempPwd")
    try {
    const currentUser = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(
        currentUser,
        prevPassword,
        values.new_mpin
      );
      const myColor = { background: "#43A047", text: "#FFFFFF" };
      
      //sessionStorage.clear();
      if(!isAuthenticated){
        history.push("/UserInformationPage");
        notify.show(
          `New MPIN updated successfully.`,
          `custom`,
          5000,
          myColor
        );
      }else{
        history.push("/LoginWithAuthPage");
        notify.show(
          `New MPIN updated successfully. Please login`,
          `custom`,
          5000,
          myColor
        );
      }
      
    } catch (error) {
      var errorMessage = error.message == 'Incorrect username or password.' ? 'In-Correct MPIN' : error.message;
      notify.show(`Error in MPIN Update: ${errorMessage}`, "error", 3000);
    }
  };

  render() {
   
    const { isInitialLoading, isLoading, EmailChange, MPINChange } = this.state;
    
    // const isInitialLoading = false;
    const { highContrast, userInfo,isAuthenticated } = this.props;
    const containerStyle = highContrast ? styles.darkContainer : null;
    return (
      <div className={cn(styles.primaryContainer, containerStyle)}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>User MPIN Setting</title>
        </Helmet>
        <div className={styles.heroImage} id="Skip-content">
          <div className={styles.heroImageOverlay}>
            <h1 className={styles.heroText}>Password Settings</h1>
            <p className={styles.heroSubText}>
              Manage your MPIN Information
            </p>
            <ChangeEmailPasswordForm
              loading={isLoading}
              handleCSISuccess={this.handleCSISuccess}
              onSubmit={this.handleSubmit}
              EmailChange={false}
              MPINChange={!isAuthenticated}
            />
          </div>
        </div>
      </div>
    );
  }
}
ChangePasswordPage.propTypes = {
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
  loginUserRequest: PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool.isRequired
};

ChangePasswordPage.defaultProps = {};

const mapStateToProps = (state) => ({
  userInfo: state.userManagement.userInfo,
  isAuthenticated: state.header.isAuthenticated,
});

const mapDispatchToProps = {
  change,
  setAuthStatus,
  loginUserRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordPage);
