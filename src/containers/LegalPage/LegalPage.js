import cn from 'classnames';
import PropTypes from 'prop-types';
import qs from 'query-string';
import React, { Component } from 'react';
import { notify } from 'react-notify-toast';
import { connect } from 'react-redux';
import ESignatureForm from '../../components/ESignatureForm/ESignatureForm';
import Spinner from '../../components/Spinner/Spinner';
import TermsAndConditions from '../../components/TermsAndConditions/TermsAndConditions';
import styles from './LegalPage.module.scss';
import Button from '../../components/Button/Button';
import {setPaymentProcessClicked,setBSEAccount} from '../../actions/UserManagement';


class LegalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      isFormEnabled: false,
      isInitialLoading: true,
      isLoading: false,
      showPayment: true,
      imgSrc: []
    };
  }

  componentDidMount() {
  }

  handleInitSuccess = () => {

  };

  handleInit = () => {
  };

  verifyEsignature = value => {
    const { fullName } = this.state;

    if (value !== fullName)
      return 'Please enter your full name as mentioned above.';
  };


  handlePaymentAcceptanceChange = (value) => {
    this.setState({
      isFormEnabled: !this.state.isFormEnabled
    });
  };

  formCheck = () => {

  };

  handleSubmit = values => {

  };

  handleSubmitSuccess = () => {
     const {history,setBSEAccount} = this.props;
     setBSEAccount({payload: {isBSEAccountCreated:true}})
     history.push('/KYCInformationPage');
  };

  handlePaymentGateWay = () => {
    const {setPaymentProcessClicked,history} =  this.props;
    const { showPayment } = this.state;
    setPaymentProcessClicked({ payload: { isPaymentClicked: true } });
    this.setState({
      showPayment: !showPayment
    });
    history.push(`/IPSMenuPage`);
    window.open('https://www.cashfree.com/product/2393', '_blank').focus();

  }

  handleOnChange = (value) => {
    //console.log(value);
    var file = value.target.files[0];
    var reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        imgSrc: reader.result,
        fileName: file.name
      });
    }
    console.log(this.state.fileName);
    var url = reader.readAsDataURL(file);
  }

  render() {
    const { isInitialLoading, isFormEnabled, isLoading, showPayment, imgSrc } = this.state;
    const {
      highContrast,
      legalDetails,
      customerDetails,
      downloadDetails,
      userInfo,
      isPaymentClicked
    } = this.props;
    const containerStyle = highContrast ? styles.darkContainer : null;
    return (
      <div className={cn(styles.container, containerStyle)}>
        {!isInitialLoading ? (
          <Spinner />
        ) : (
          <div>

            <h1 className={styles.heroText}>{isPaymentClicked===true ? (`Disclosures`) : (`Payment GateWay`)}</h1>
            <h1 className={styles.heroSubText}>
              {isPaymentClicked===false ? (`Please proceed with payment for Filber Gold by clicking payment here
              .`) : (`Please read and acknowledge the following Integrate Payment system contract  for
              Fliber.`)}
            </h1>
            {isPaymentClicked===true ? (<div className={styles.wrapper}>
              <TermsAndConditions
                //array={legalDetails.paymentTerms.ecomProductPaymentDisclaimer}
                handleChange={(index, value) =>
                  this.handlePaymentAcceptanceChange(value)
                }
                index={1}
                type=""
              />

              {!isFormEnabled ? (
                <div className={styles.heading}>
                  <h1 className={cn(styles.heroSubText, styles.center)}>
                    Please accept all terms and conditions to continue.
                  </h1>
                </div>
              ) : (
                <div className={styles.heading}>
                  <h1 className={cn(styles.heroSubText, styles.center)}>
                    Please Upload your Signature.
                  </h1>
                  <div className={styles.linkFlex}>
                    <label
                      className={styles.downloadLink}
                      htmlFor="upload-photo"
                    >
                      Browse File
                    </label>
                  </div>
                  <input className={styles.upload} type='file' onChange={(value) => this.handleOnChange(value)} id="upload-photo" />
                  {imgSrc.length > 0 ? <img className={styles.productLogoImage} src={imgSrc} /> : null}
                  <div className={styles.signature}>
                  <ESignatureForm/>
                  </div>
                 
                </div>)}

              <div className={styles.actionBar}>
                <Button
                  className={styles.next}
                  //disabled={}
                  onClick={() => this.handleExit()}
                  type="submit"
                >
                  <span>Back</span>
                </Button>
                <Button
                  className={styles.next}
                  disabled={!isFormEnabled}
                  onClick={() => this.handleSubmitSuccess()}
                  type="submit"
                >
                  <span>Continue</span>
                </Button>
              </div>
            </div>) : (<div>
              <div className={styles.cardContainer}>
                <div className={styles.cartItemContainer}>

                  <div className={styles.subItem}>
                    <div className={styles.listHeader}>
                      {`Annual Fee `}
                    </div>
                    <div className={styles.listItem}>
                      `₹` 6000
                    </div>
                  </div>
                  <div className={styles.subItem}>
                    <div className={styles.listHeader}>
                      {`Monthly Fee`}
                    </div>
                    <div className={styles.listItem}>
                      `₹` 500
                    </div>
                  </div>
                  <div className={styles.subItem}>
                    <div className={styles.listHeader}>
                      {`Annual will end`}
                    </div>
                    <div className={styles.listItem}>
                      {`11/30/2022`}
                    </div>
                  </div>
                  <div className={styles.subItem}>
                    <div className={styles.listHeader}>
                      {`Montly will end`}
                    </div>
                    <div className={styles.listItem}>
                      {`12/30/2021`}
                    </div>
                  </div>
                </div>

              </div>
              <div className={styles.actionBarpay}>
                <Button
                  className={styles.next}
                  onClick={() => this.handleExit()}
                  type="submit"
                >
                  <span> Exit  </span>
                </Button>
                <Button
                  className={styles.next}
                  onClick={() => this.handlePaymentGateWay()}
                  type="submit"
                >
                  <span>Check out</span>
                </Button>
              </div>
            </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

LegalPage.propTypes = {

  highContrast: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string,
    }),
    push: PropTypes.func.isRequired,
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  setPaymentProcessClicked:PropTypes.func.isRequired
};

LegalPage.defaultProps = {
  setPaymentProcessClicked:PropTypes.func.isRequired,
  setBSEAccount:PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.header.isAuthenticated,
  userInfo: state.userManagement.userInfo,
  isPaymentClicked: state.userManagement.isPaymentClicked
});

const mapDispatchToProps = {
  setPaymentProcessClicked,
  setBSEAccount
};

export default connect(mapStateToProps, mapDispatchToProps)(LegalPage);
