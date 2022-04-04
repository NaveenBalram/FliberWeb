import React, { Component } from "react";
import styles from "./KYCInformationPage.module.scss";
import PropTypes from "prop-types";
import Button from "../../components/Button/Button";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import cn from "classnames";
import { connect } from "react-redux";
import { notify } from "react-notify-toast";
import Spinner from "../../components/Spinner/Spinner";
import PanCardVerificationForm from "../../components/PanCardVerificationForm/PanCardVerificationForm";
import { Helmet } from "react-helmet";
import { scroller } from "react-scroll";
import kycVerification from "../../assets/img/fingerprint_Primary.png"
import user_Confirmed from "../../assets/img/user_confirmed.png"

import {setPaymentProcessClicked,setBSEAccount,panVarificationRequest} from '../../actions/UserManagement';


class KYCInformationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isInitialLoading: false,
            isLoading: false,
            isPanVerified: false
        };

    }

    componentDidMount() {
        const { history, isAuthenticated } = this.props;
        this.setState({
            isPanVerified: false
        });
        if (!isAuthenticated) {
            history.push(`/`);
        }
    }
    handleSubmit = async (value) => {
        const { panVarificationRequest } = this.props;
        this.setState({
            isLoading: true,
        });

        const res = new Promise((resolve, reject) =>
            panVarificationRequest(
                {
                    "FirstPan": value.pancardNumber,
                    "SecPan": "",
                    "ThirdPan": ""
                },
                { reject, resolve }
            )
        );
        res.then(() => {
            this.handleSubmitSuccess();
        });
        res.catch(error => {

            if (error.response.status === 400) {
                if (error.response.data === 'PENDING') {
                    notify.show(
                        `An error occurred. PANNumber is not valid. Please enter valid number.`,
                        'error',
                        5000
                    );
                } else {
                    notify.show(
                        `An error occurred.  ${error.response.data}`,
                        'error',
                        5000
                    );
                }
            } else {
                notify.show(
                    `An error occurred. Please try again. Technical Information: ${error.response.data}`,
                    'error',
                    5000
                );
            }
            this.setState({
                isLoading: false,
            });
        });

    }

    handleSubmitSuccess = () => {

        const { panVerified, history } = this.props;
        //notify.show('Pancard Verification completed successfully. Please visit other KYC validation website', 'success', 5000);
        this.setState({
            isLoading: false,
        });

        if (panVerified.STATUS === "0" || panVerified.STATUS === "2") {
            history.push("/SignzyIntegrationPage");

        } else {
            this.setState({
                isPanVerified: true,
            });
        }
    }

    handleExit = async () => {

        this.setState({
            isPanVerified: !this.state.isPanVerified
        });
    }

    handleNext = async () =>{
        const {history,setBSEAccount,setPaymentProcessClicked} = this.props;
        setPaymentProcessClicked({ payload: { isPaymentClicked: true } });
        setBSEAccount({payload: {isBSEAccountCreated:true}})
        history.push('/AccountCreationPage');
    }



    render() {
        const isInitialLoading = true;
        const { isLoading, isPanVerified } = this.state;
        const { panVerified } = this.props;
        //const containerStyle = highContrast ? styles.darkContainer : null;

        return (
            <div className={styles.productListContainer}>
                {!isInitialLoading ? (
                    <div className={cn(styles.Spinner, styles.LabelInfo)}>
                        <p className={styles.heroSubTextMedium}>
                            Just a moment, We're getting things ready for you
                        </p>
                        <Spinner />
                    </div>
                ) : (
                    <div
                        className={styles.productListContainer}
                        id="Skip-content"
                    >
                        <Helmet>
                            <meta charSet="utf-8" />
                            <title>Kyc Page</title>
                        </Helmet>

                        {isPanVerified === false ? (<div className={styles.heading} name="maindiv">
                            <h1>
                                Fliber KYC Verification
                            </h1>
                            <div className={styles.productInformationContainer}>
                                <img
                                    alt={`kycLogo`}
                                    className={styles.productLogo}
                                    title={`KycLogo`}
                                    src={kycVerification}
                                />
                            </div>
                            <p className={styles.heading}>We request every unit holder to have their KYC updated in their folio at the earliest. Non-updation of the same will lead to restriction of future financial and non-financial transactions.</p>
                            <PanCardVerificationForm
                                loading={isLoading}
                                onSubmit={this.handleSubmit}
                            />
                        </div>) : (
                            <div className={styles.heading} name="maindiv">
                                <h1>
                                    Great! your pan number is verified with KYC Compliant.
                                </h1>
                                <div className={styles.productInformationContainer}>
                                    <img
                                        alt={`kycLogo`}
                                        className={styles.productLogo}
                                        title={`KycLogo`}
                                        src={user_Confirmed}
                                    />
                                </div>
                                <p className={styles.paragraphInfo}>Hello, <b>{panVerified.F_PAN_NAME} !    </b></p>
                                <p className={styles.paragraphInfo}>  Investments will be made in the following names as per PAN</p>
                                <div className={styles.actionBar}>
                                    <Button
                                        className={styles.next}
                                        onClick={() => this.handleExit()}
                                        type="submit"
                                    >
                                        <span>Wrong name ? Re-enter PAN</span>
                                    </Button>
                                    <Button
                                        className={styles.next}
                                        onClick={() => this.handleNext()}
                                        type="submit"
                                    >
                                        <span>I Confirmed, I AM {panVerified.F_PAN_NAME}</span>
                                    </Button>
                                </div>
                            </div>)}
                    </div>
                )}
            </div>
        );
    }
}
KYCInformationPage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    history: PropTypes.shape({
        location: PropTypes.shape({
            search: PropTypes.string,
        }),
        push: PropTypes.func.isRequired,
    }).isRequired,
    userInfo: PropTypes.shape({}).isRequired,
    panVarificationRequest: PropTypes.func.isRequired,
    setBSEAccount: PropTypes.func.isRequired,
    setPaymentProcessClicked: PropTypes.func.isRequired
};

KYCInformationPage.defaultProps = {
    panVarificationRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.header.isAuthenticated,
    userInfo: state.userManagement.userInfo,
    panVerified: state.userManagement.panVerified

});
const mapDispatchToProps = {
    panVarificationRequest,
    setBSEAccount,
    setPaymentProcessClicked
};

export default connect(mapStateToProps, mapDispatchToProps)(KYCInformationPage);
