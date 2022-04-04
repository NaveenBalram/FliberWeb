import React, { Component } from "react";
import styles from "./ProfessionalDetailsPage.module.scss";
import PropTypes from "prop-types";
import Button from "../../components/Button/Button";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { change } from "redux-form";
import cn from "classnames";
import { connect } from "react-redux";
import { notify } from "react-notify-toast";
import Spinner from "../../components/Spinner/Spinner";
import { Helmet } from "react-helmet";
import { scroller } from "react-scroll";
import Professional from "../../assets/img/Professional.png"
import moment from 'moment';
import ProfessionalDetailsForm from "../../components/ProfessionalDetailsForm/ProfessionalDetailsForm";
import Stepper from 'react-stepper-horizontal';
import { getOccupationListRequest, getIncomeSlabListRequest, getWealthListRequest, updateBSEAccountCreationRequest, } from "../../actions/BSEAccountManagement"
import {loginUserRequest } from '../../actions/UserManagement';


const residentStatus = [
    { Id: 1, Description: "Resident Indian" },
    { Id: 2, Description: "Non-Resident Indian" }
]

class ProfessionalDetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isInitialLoading: false,
            isLoading: false,
            incomeRange: [],
            occupationTypes: [],
            sourceOfWealth: [],

        };

    }

    componentDidMount() {

        const { getIncomeSlabListRequest, getOccupationListRequest, getWealthListRequest } = this.props;

        const res1 = new Promise((resolve, reject) =>
            getIncomeSlabListRequest({ reject, resolve })
        );

        const res2 = new Promise((resolve, reject) =>
            getOccupationListRequest({ reject, resolve })
        );

        const res3 = new Promise((resolve, reject) =>
            getWealthListRequest({ reject, resolve })
        );

        Promise.all([res1, res2, res3])
            .then(() => this.handleSuccess())
            .catch(error => {
                if (error.response.status === 400) {
                    notify.show(`${error.response.data.message}`, 'error', 10000);
                } else {
                    notify.show(` ${error}`, 'error', 5000);
                }
            });

    }

    handleLoad = (value) => {
        const { change, genderTypes, userInfo, panVerified } = this.props;
        value = true;

        this.setState({
            genderTypes: genderTypes,
            isInitialLoading: !this.isInitialLoading,
        });

        change(
            "professionalDetailsForm",
            "sourceofWealth",
            value ? userInfo.SourceOfWealth :null       
        );


        change(
            "professionalDetailsForm",
            "occupationTypes",
            value ? userInfo.OccupationTypes : null
        );

        change(
            "professionalDetailsForm",
            "residentStatus",
            value ? parseInt(userInfo.ResidentStatus) : null
        );
        change("professionalDetailsForm", "incomeSlab", value ? userInfo.IncomeSlab : null);
    };

    handleSuccess = async () => {
        const { sourceOfWealth, occupationTypes, incomeSlabList } = this.props;
        this.setState({
            sourceOfWealth: sourceOfWealth,
            occupationTypes: occupationTypes,
            incomeRange: incomeSlabList
        });        
        scroller.scrollTo('main', {
            delay: 100,
            duration: 500,
            smooth: 'easeInOutQuart',
        });
        this.handleLoad(true);
    }

    handleSubmit = async (value) => {
        const { history, updateBSEAccountCreationRequest,userInfo} = this.props;

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
                    "SourceOfWealth": value.sourceofWealth,
                    "OccupationTypes": value.occupationTypes,
                    "ResidentStatus": value.residentStatus,
                    "IncomeSlab": value.incomeSlab,
                    "AddressType": userInfo.AddressType,
                    "AddressLine1": userInfo.AddressLine1 ,
                    "AddressLine2": userInfo.AddressLine2,
                    "CityId": userInfo.CityId,
                    "StateId": userInfo.StateId,
                    "PinCode": `570013`
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
        const {history,userInfo,loginUserRequest} = this.props;
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
        history.push('/AddressDetailsPage');}
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
        const { isLoading, occupationTypes, incomeRange, sourceOfWealth } = this.state;
        const { isBSEAccountCreated } = this.props;

        return (
            <div className={styles.productListContainer} name="main">
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

                        <div className={styles.heading} >
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
                                        onClick: () => { this.handleSelection('address') }
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
                                activeStep={2}
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
                                    activeStep={1}
                                    activeColor={'#527318'}
                                    completeColor={'#87bd28'} />

                            )}
                            <h1>
                                Professional details
                            </h1>
                            <div className={styles.productInformationContainer}>
                                <img
                                    alt={`kycLogo`}
                                    className={styles.productLogo}
                                    title={`KycLogo`}
                                    src={Professional}
                                />
                            </div>
                            <p className={styles.heading}>These details are required for getting your investment started with the mutual funds companies.</p>
                            <ProfessionalDetailsForm
                                occupationTypes={occupationTypes}
                                incomeRange={incomeRange}
                                sourceOfWealth={sourceOfWealth}
                                residentStatus={residentStatus}
                                handleExit={this.handleExit}
                                onSubmit={this.handleSubmit}
                                onLoad={this.handleLoad}
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
ProfessionalDetailsPage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    history: PropTypes.shape({
        location: PropTypes.shape({
            search: PropTypes.string,
        }),
        push: PropTypes.func.isRequired,
    }).isRequired,
    userInfo: PropTypes.shape({}).isRequired,
    change: PropTypes.func.isRequired,
    getOccupationListRequest: PropTypes.func.isRequired,
    getWealthListRequest: PropTypes.func.isRequired,
    getIncomeSlabListRequest: PropTypes.func.isRequired,
    occupationTypes: PropTypes.shape({}).isRequired,
    incomeSlabList: PropTypes.shape({}).isRequired,
    sourceOfWealth: PropTypes.shape({}).isRequired,
    updateBSEAccountCreationRequest: PropTypes.func.isRequired,
    loginUserRequest:PropTypes.func.isRequired

};

ProfessionalDetailsPage.defaultProps = {
    change: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.header.isAuthenticated,
    userInfo: state.userManagement.userInfo,
    isBSEAccountCreated: state.userManagement.isBSEAccountCreated,
    occupationTypes: state.bseManagement.occupationTypes,
    incomeSlabList: state.bseManagement.incomeSlabList,
    sourceOfWealth: state.bseManagement.wealthType,
});

const mapDispatchToProps = {
    change,
    getWealthListRequest,
    getIncomeSlabListRequest,
    getOccupationListRequest,
    updateBSEAccountCreationRequest,
    loginUserRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalDetailsPage);
