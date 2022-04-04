import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { notify } from "react-notify-toast";
import { Link, NavLink } from "react-router-dom";
import cn from "classnames";
// import Logo from "../../assets/img/aflac-connect-logo.png";
import styles from "./Header.module.scss";
import highContrastOn from "../../assets/img/high-contrast.svg";
import highContrastOff from "../../assets/img/high-contrast-off.svg";
import login from "../../assets/img/login.svg";
import logout from "../../assets/img/logout.svg";
import user from "../../assets/img/fliber-user-male.svg";
import kycVerification from "../../assets/img/fingerprint_White.png"
import {
  setAuthStatus,
  setEmailChange,
  setPasswordChange,
  resetValues,
} from "../../actions/Header";
import menuImg from "../../assets/img/menu.svg";
import menuOpenImg from "../../assets/img/menuOpen.svg";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { Auth } from "aws-amplify";
import email_icon from "../../assets/img/mailIcon.svg";
import password_change from "../../assets/img/Password_change.svg";

import Button from "../Button/Button";
import { logoutUserRequest } from "../../actions/UserManagement";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHeaderOpen: false,
      contrast: false,
      show: false,
    };
  }

  componentDidMount = () => {
    const { setAuthStatus, isAuthenticated } = this.props;
    if (isAuthenticated) {
      setAuthStatus({ payload: { isAuthenticated: true } });
    }
  };

  

  toggleHeader = () => {
    this.setState({
      isHeaderOpen: !this.state.isHeaderOpen,
    });
  };

  ShowErrorHeader = () => {
    const skipInputRef = React.createRef();
    this.setState({
      isHeaderOpen: !this.state.isHeaderOpen,
    });
    notify.show(
      <div
        className={styles.alertMsg}
        aria-hidden="true"
        aria-label="Please sign in or create an account to continue"
        aria-modal="true"
        role="button"
        ref={skipInputRef}
        title="Please sign in or create an account to continue."
      >
        Please sign in or create an account to continue.
        <div className={styles.alertBtn}>
          <button
            onClick={notify.hide}
            onKeyPress={notify.hide}
            tabIndex="0"
            type="submit"
            autoFocus
          >
            Ok
          </button>
        </div>
      </div>,
      "success",
      1000000
    );
  };

  logoutNotify = () => {
    const skipInputRef = React.createRef();
    this.setState({
      isHeaderOpen: !this.state.isHeaderOpen,
    });
    let logouttext = "Are you sure you want to log out";
    notify.show(
      <div
        className={styles.alertMsg}
        aria-hidden="true"
        aria-label="Are you sure you want to log out?"
        aria-modal="true"
        role="button"
        ref={skipInputRef}
        title="Are you sure you want to log out?"
      >
        Are you sure you want to log out?
        <div className={styles.alertBtn}>
          <button
            onClick={this.logout}
            onKeyPress={notify.hide}
            tabIndex="0"
            type="button"
            autoFocus
          >
            Yes
          </button>

         
          <button
            onClick={notify.hide}
            onKeyPress={notify.hide}
            tabIndex="0"
            type="button"
            autoFocus
          >
            No
          </button>
        </div>
      </div>,
      "warning",
      1000000
    );
  };

  onLogoutClick = async () => {
   // this.setState({ show: true });
   Auth.signOut()
   this.logoutNotify();
  };

  close = () => {
    this.setState({ show: !this.state.show });
  };

  logout = () => {

    notify.hide();
    //api call
    const {
      userName,
      resetValues,
      logoutUserRequest,
      userInfo,
      history,
    } = this.props;

    const payload = {
      ModuleType: 1,
      Status: 1,
      LastQuestion: 0,
      UserId: userInfo.Id,
      LastLogin: userInfo.LastLogin,
    };
    const res = new Promise((resolve, reject) =>
      logoutUserRequest(payload, { reject, resolve })
    );
    res.then(() => {
      resetValues();
      //history.push("/")
      window.location.href = "/";
      
    });
    res.catch((error) => {
      if (error.response.status === 400) {
        notify.show(
          `An error occurred. Please try again. ${error.response.data.errorMessage}`,
          "error",
          5000
        );
      } else {
        notify.show(
          `An error occurred. Please try again. Technical Information: ${error}`,
          "error",
          5000
        );
      }
    });
  };

  handleSkipLinks = () => {
    //var el = document.querySelector('.link')
    this.ref.divToFocus.focus();
  };

  onEmailUpdate = () => {
    const { setEmailChange } = this.props;
    setEmailChange();
  };

  onPasswordUpdate = () => {
    const { setPasswordChange } = this.props;
    setPasswordChange();
  };

  render() {
    const {
      isAuthenticated,
      setHighContrast,
      highContrast,
      location,
      userInfo,
      userName,
    } = this.props;

    const { isHeaderOpen, contrast } = this.state;
    const containerStyle = isHeaderOpen
      ? styles.containerExpand
      : styles.container;
    const mainContainerStyle = highContrast
      ? styles.darkContainer
      : styles.container;
    const menuDarkContainerStyle = highContrast
      ? styles.menusDarkContainer
      : styles.menusContainer;
    return (
      <div className={mainContainerStyle}>
        <div className={containerStyle}>
          <a href="#Skip-content" className={styles.hiddenButton}>
            Skip Navigation
          </a>
          <div className={styles.headerStyle}>
            <div className={styles.headerMainNav}>
              <div className={cn(styles.contrastBlockMenu)}>
                {/* <div className={styles.divider} /> */}
              </div>
              <div className={styles.logoContainer} aria-label="menu">
                <Link to="/">
                  <h1>Fliber</h1>
                </Link>
              </div>
              <div className={menuDarkContainerStyle}>
                <div className={styles.menuItemBlock}>
                  <div className={styles.headerMenu}>
                    <NavLink to="/">Contact Us</NavLink>
                  </div>
                  <div className={styles.headerMenu}>
                    <NavLink to="/">Terms & Conditions</NavLink>
                  </div>
                  {!isAuthenticated ? (
                    <DropdownMenu
                      className={cn(
                        styles.item,
                        styles.itemLink,
                        styles.itemLinkBold,
                        styles.longName
                      )}
                      content={
                        <div className={styles.navAlign}>
                          <div className={styles.iconsAlign}>
                            <img
                              alt="Sign In"
                              className={styles.icons}
                              src={login}
                              width="20"
                              title="Sign In"
                            />
                            <NavLink
                              className={styles.userName}
                              isActive={styles.isActive}
                              to="/LoginWithAuthPage"
                            >
                              Sign In
                            </NavLink>
                          </div>
                        </div>
                      }
                    />
                  ) : (
                    <DropdownMenu
                      className={cn(
                        styles.item,
                        styles.itemLink,
                        styles.itemLinkBold,
                        styles.longName
                      )}
                      content={
                        <div data-test="Logout">
                          <div className={styles.iconsAlign}>
                            <img
                              alt="User Name"
                              className={styles.icons}
                              src={user}
                              title="User Name"
                            />
                            <NavLink
                              className={styles.userName}
                              isActive={styles.isActive}
                              to="/accountInfoPage"
                            >
                              {userInfo.FirstName} <br />
                              <small>{userInfo.Email}</small>
                            </NavLink>
                          </div>
                          <div className={styles.iconsAlign}>
                            <img
                              alt="Reset MPIN"
                              className={styles.icons}
                              src={password_change}
                              title="Reset MPIN"
                            />
                            <NavLink
                              className={styles.userName}
                              isActive={styles.isActive}
                              to="/resetMpinPage"
                            >
                              Reset MPIN
                            
                            </NavLink>
                          </div>
                          <div className={styles.iconsAlign}>
                            <img
                              alt="Kyc Verification"
                              className={styles.icons}
                              src={kycVerification}
                              title="Kyc Verification"
                            />
                            <NavLink
                              className={styles.userName}
                              isActive={styles.isActive}
                              to="/KYCInformationPage"
                            >
                              KYC Information
                            
                            </NavLink>
                          </div>

                          <div className={styles.iconsAlign}>
                            <img
                              alt="Sign out"
                              className={styles.icons}
                              src={logout}
                              title="Sign out"
                            />
                            <NavLink
                              className={styles.userName}
                              isActive={styles.isActive}
                              to="#"
                              onClick={this.onLogoutClick}
                            >
                              Sign out
                            </NavLink>
                          </div>
                        </div>
                      }
                    />
                  )}
                 
                </div>
                <div className={styles.contrastBlock}>
                  <div className={styles.divider} />
                </div>
                <div
                  className={styles.menuComponent}
                  aria-label="menu"
                  onClick={() => this.toggleHeader()}
                  onKeyPress={() => this.toggleHeader()}
                  role="button"
                  tabIndex={0}
                >
                  <img
                    alt="menu"
                    className={styles.menuButtonImg}
                    src={isHeaderOpen ? menuOpenImg : menuImg}
                    title="menu"
                  />
                </div>
              </div>
            </div>
            <div
              className={cn(
                isHeaderOpen && styles.menuResponsiveOpen,
                styles.menuResponsiveClose
              )}
            >
              <div className={styles.menuItemResponsive}>
                <NavLink to="/">Contact Us</NavLink>
              </div>

              <div className={styles.menuItemResponsive}>
                <NavLink to="/">Terms & Conditions</NavLink>
              </div>
              <div className={styles.separator}>User Settings</div>
              {!isAuthenticated ? (
                <div className={styles.menuItemResponsive}>
                  <NavLink to="/signUpPage">Sign up</NavLink>
                </div>
              ) : (
                <div>
                  <div className={styles.menuItemResponsive}>
                    <NavLink to="/accountInfoPage">{userName}</NavLink>
                  </div>
                  <div className={styles.menuItemResponsive}>
                    <NavLink
                      to="/userEmailUpdatePage"
                      onClick={this.onEmailUpdate}
                    >
                      Update Email
                    </NavLink>
                  </div>
                  <div className={styles.menuItemResponsive}>
                    <NavLink
                      to="/userPasswordPage"
                      onClick={this.onPasswordUpdate}
                    >
                      Update Password
                    </NavLink>
                  </div>
                </div>
              )}
              <div className={styles.menuItemResponsive}>
                {!isAuthenticated ? (
                  <NavLink to="/signIn">Sign in</NavLink>
                ) : (
                  <NavLink to="#" onClick={this.onLogoutClick}>
                    Sign out
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string,
    }),
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
  }),
  setAuthStatus: PropTypes.func.isRequired,
  setEmailChange: PropTypes.func.isRequired,
  setPasswordChange: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  resetValues: PropTypes.func.isRequired,
  logoutUserRequest: PropTypes.func.isRequired,
};

Header.defaultProps = {};

const mapStateToProps = (state) => {
  return {
    highContrast: state.header.highContrast,
    isAuthenticated: state.header.isAuthenticated,
    userName: state.header.userName,
    userInfo: state.userManagement.userInfo,
  };
};

const mapDispatchToProps = {
  setAuthStatus,
  // setHighContrast,
  setEmailChange,
  setPasswordChange,
  resetValues,
  logoutUserRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
