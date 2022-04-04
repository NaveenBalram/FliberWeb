import React, { Component } from "react";
import styles from "./AddressDetailsPage.module.scss";
import PropTypes from "prop-types";
import Button from "../../components/Button/Button";
import { change } from "redux-form";
import cn from "classnames";
import { connect } from "react-redux";
import { notify } from "react-notify-toast";
import Spinner from "../../components/Spinner/Spinner";
import { Helmet } from "react-helmet";
import { scroller } from "react-scroll";
import Professional from "../../assets/img/homeAddress.png"
import moment from 'moment';
import ProfessionalDetailsForm from "../../components/ProfessionalDetailsForm/ProfessionalDetailsForm";
import Stepper from 'react-stepper-horizontal';
import AddressDetailsForm from "../../components/AddressDetailsForm/AddressDetailsForm";
import { loginUserRequest } from '../../actions/UserManagement';
import { updateBSEAccountCreationRequest, getStateListRequest } from "../../actions/BSEAccountManagement"


const residentTypes = [
    { Id: 1, Description: "Residential" },
    { Id: 2, Description: "Office" }
]

class AddressDetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isInitialLoading: false,
            isLoading: false,
            stateList: [],

        };

    }

    componentDidMount() {
        const { getStateListRequest } = this.props;

        const res = new Promise((resolve, reject) =>
            getStateListRequest({ reject, resolve })
        );
        res.then(() => this.handleLoad(true));
        res.catch(error => {
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
    }

    handleSubmit = async (value) => {
        const { history, updateBSEAccountCreationRequest, userInfo } = this.props;

        const res = new Promise((resolve, reject) =>
            updateBSEAccountCreationRequest(
                {
                    "UserId": userInfo.Id,
                    "FatherName": userInfo.FatherName,
                    "MotherName": userInfo.MotherName,
                    "SpouseName": userInfo.SpouseName,
                    "SpouseDOB": userInfo.SpouseDOB,
                    "SpousePan": userInfo.SpousePan,
                    "BornCityId": userInfo.BornCityId,
                    "BornStateId": userInfo.BornStateId,
                    "Nationality": userInfo.Nationality,
                    "SourceOfWealth": userInfo.SourceOfWealth,
                    "OccupationTypes": userInfo.OccupationTypes,
                    "ResidentStatus": userInfo.ResidentStatus,
                    "IncomeSlab": userInfo.IncomeSlab,
                    "AddressType": value.addressType,
                    "AddressLine1": value.Address1,
                    "AddressLine2": value.Address2,
                    "CityId": value.city,
                    "StateId": value.state, 
                    "PinCode": value.Pincode
                },
                { reject, resolve }
            )
        );
        res.then(() => this.handleSubmitSuccess());
        res.catch(error => {
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
        //history.push('/AddressDetailsPage');
    }

    handleSubmitSuccess = () => {
        const { userInfo, loginUserRequest } = this.props;
        var mobileNumber = userInfo.Phone;
        const res = new Promise((resolve, reject) =>
            loginUserRequest(
                {
                    mobileNumber,
                },
                { reject, resolve }
            )
        );
        res.then(() => {
            this.handleNavigation()
        }
        );
        res.catch(error => {
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

    }

    handleNavigation = async (value) => {
        const { history, isBSEAccountCreated } = this.props;

        if (isBSEAccountCreated === false) {
            history.push('/TermsAndConditionPage')
        } else {
            history.push('/NomineesDetailPage');
        }
    }

   handleLoad = (value) =>{
    const {stateList,change,userInfo,bseUSerInfo} = this.props;
    this.setState({
        stateList:stateList
    });
    
    change(
        "AddressDetailsForm",
        "addressType",
        value ? parseInt(userInfo.AddressType) :null       
    );
    change(
        "AddressDetailsForm",
        "Address1",
        value ? userInfo.AddressLine1 :null       
    );
    change(
        "AddressDetailsForm",
        "Address2",
        value ? userInfo.AddressLine2 :null       
    );
    change(
        "AddressDetailsForm",
        "city",
        value ? userInfo.CityId :null       
    );
    change(
        "AddressDetailsForm",
        "state",
        value ? userInfo.StateId :null       
    );
    change(
        "AddressDetailsForm",
        "Pincode",
        value ? bseUSerInfo.PinCode :null       
    );


   }

    handleExit = async () => {
        const { history } = this.props;
        history.push('/AccountCreationPage');
    }

    handleSelection = (value) => {

        const { history } = this.props;

        switch (value) {
            case 'pan':
                history.push('/KYCInformationPage');
                break;
            case 'personal':
                history.push('/AccountCreationPage');
                break;
            case 'professional':
                history.push('/ProfessionalDetailPage');
                break;
            case 'nominee':
                history.push('/NomineesDetailPage');
                break;
            case 'bank':
                history.push('/BankDetailPage');
                break;
            case 'address':
                history.push('/AddressDetailsPage');
                break;
        }
    }


    render() {
        const isInitialLoading = true;
        const { isLoading,stateList } = this.state;
        const { isBSEAccountCreated } = this.props;

        return (
            <div className={styles.productListContainer}>
                {isInitialLoading === false ? (
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
                            <title>Professional Details</title>
                        </Helmet>

                        <div className={styles.heading} name="maindiv">
                            {isBSEAccountCreated === true ? (<Stepper
                                steps={[
                                    {
                                        title: 'Pan Verification',
                                        onClick: () => { this.handleSelection('pan') }
                                    },
                                    {
                                        title: 'Personal Information',
                                        onClick: () => { this.handleSelection('personal') }
                                    },
                                    {
                                        title: 'Professional Information',
                                        onClick: () => { this.handleSelection('professional') }
                                    },
                                    {
                                        title: 'Address Information',
                                        onClick: () => { this.handleSelection('professional') }
                                    },
                                    {
                                        title: 'Nominees Information',
                                        onClick: () => { this.handleSelection('nominee') }
                                    },
                                    {
                                        title: 'Bank Information',
                                        onClick: () => { this.handleSelection('bank') }
                                    },
                                    {
                                        title: 'Upload E-Signature',
                                        onClick: () => { this.handleSelection('esign') }
                                    },
                                ]}
                                activeStep={3}
                                activeColor={'#527318'}
                                completeColor={'#87bd28'} />) : (
                                <Stepper
                                    steps={[

                                        {
                                            title: 'Personal Information',
                                            onClick: () => { this.handleSelection('personal') }
                                        },
                                        {
                                            title: 'Professional Information',
                                            onClick: () => { this.handleSelection('professional') }
                                        },
                                        {
                                            title: 'Address Information',
                                            onClick: () => { this.handleSelection('professional') }
                                        },

                                    ]}
                                    activeStep={2}
                                    activeColor={'#527318'}
                                    completeColor={'#87bd28'} />

                            )}
                            <h1>
                                Address details
                            </h1>
                            <div className={styles.productInformationContainer}>
                                <img
                                    alt={`kycLogo`}
                                    className={styles.productLogo}
                                    title={`KycLogo`}
                                    src={Professional}
                                />
                            </div>
                            <p className={styles.heading}>This details are used as your communication Address.</p>
                            <AddressDetailsForm
                                onSubmit={this.handleSubmit}
                                handleExit={this.handleExit}
                                residentTypes={residentTypes}
                                stateList={stateList}
                                onLoad={this.handleLoad}
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
AddressDetailsPage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    history: PropTypes.shape({
        location: PropTypes.shape({
            search: PropTypes.string,
        }),
        push: PropTypes.func.isRequired,
    }).isRequired,
    userInfo: PropTypes.shape({}).isRequired,
    change: PropTypes.func.isRequired,
    updateBSEAccountCreationRequest: PropTypes.func.isRequired,
    loginUserRequest: PropTypes.func.isRequired,
    getStateListRequest: PropTypes.func.isRequired
};

AddressDetailsPage.defaultProps = {
    change: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.header.isAuthenticated,
    userInfo: state.userManagement.userInfo,
    isBSEAccountCreated: state.userManagement.isBSEAccountCreated,
    stateList: state.bseManagement.stateList,
    bseUSerInfo: state.bseManagement.bseUSerInfo

});

const mapDispatchToProps = {
    change,
    updateBSEAccountCreationRequest,
    loginUserRequest,
    getStateListRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressDetailsPage);
