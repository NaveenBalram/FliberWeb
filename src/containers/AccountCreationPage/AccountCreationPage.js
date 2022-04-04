import React, { Component } from "react";
import styles from "./AccountCreationPage.module.scss";
import PropTypes from "prop-types";
import Button from "../../components/Button/Button";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { change } from "redux-form";
import cn from "classnames";
import { connect } from "react-redux";
import { notify } from "react-notify-toast";
import Spinner from "../../components/Spinner/Spinner";
import CustomerBasicDetails from "../../components/CustomerBasicDetails/CustomerBasicDetails";
import { Helmet } from "react-helmet";
import { scroller } from "react-scroll";
import kycVerification from "../../assets/img/family.png"
import { getCountryListRequest, getStateListRequest, updateBSEAccountCreationRequest } from "../../actions/BSEAccountManagement"
import { getGenderListRequest, getMartialStatusRequest,loginUserRequest } from '../../actions/UserManagement';
import moment from 'moment';
import Stepper from 'react-stepper-horizontal';


class AccountCreationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isInitialLoading: false,
            isLoading: false,
            genderTypes: [],
            maritalStatus: [],
            countryList: [],
            stateList: [],
            isSpouseShow: false,
        };

    }

    componentDidMount() {

        const { getGenderListRequest, getMartialStatusRequest, getStateListRequest, getCountryListRequest } = this.props;

        const res1 = new Promise((resolve, reject) =>
            getGenderListRequest({ reject, resolve })
        );
        const res2 = new Promise((resolve, reject) =>
            getMartialStatusRequest({ reject, resolve })
        );
        const res3 = new Promise((resolve, reject) =>
            getStateListRequest({ reject, resolve })
        );
        const res4 = new Promise((resolve, reject) =>
            getCountryListRequest({ reject, resolve })
        );
        Promise.all([res1, res2, res3, res4])
            .then(() => this.handleSuccess())
            .catch(error => {
                if (error.response.status === 400) {
                    notify.show(`${error.response.data.message}`, 'error', 10000);
                } else {
                    notify.show(` ${error}`, 'error', 5000);
                }
            });
        // if (!isAuthenticated) {
        //     history.push(`/`);
        // }
    }

    handleSuccess() {
        const { genderTypes, maritalStatus, isProfessionalClicked, stateList, countryList,userInfo } = this.props;
        this.setState({
            genderTypes: genderTypes,
            maritalStatus: maritalStatus,
            stateList: stateList,
            countryList: countryList
        });

        if(userInfo.MartialStatusId==='3eb8b50f-c4bf-4981-9d4e-283dc9b09e74'){
            this.setState({
                isSpouseShow:true
            });
        }

        this.handleLoad(true);


    }

    handleLoad = (value) => {
        const { change, genderTypes, userInfo, panVerified } = this.props;
        value = true;

        this.setState({
            genderTypes: genderTypes,
            isInitialLoading: !this.isInitialLoading,
        });

        change(
            "customerBasicForm",
            "fullName",
            Object.keys(panVerified).length===0? userInfo.FirstName:panVerified.F_PAN_NAME
        );


        change(
            "customerBasicForm",
            "mobileNumber",
            value ? userInfo.Phone : null
        );

        change(
            "customerBasicForm",
            "dateOfBirth",
            value ? moment(userInfo.DateOfBirth).format("MM/DD/YYYY") : null
        );
        change("customerBasicForm", "gender", value ? userInfo.GenderId : null);

        change(
            "customerBasicForm",
            "maritalStatus",
            value ? userInfo.MartialStatusId : null
        );

        change(
            "customerBasicForm",
            "fatherName",
            value ? userInfo.FatherName : null
        );

        change(
            "customerBasicForm",
            "motherName",
            value ? userInfo.MotherName : null
        );
        change(
            "customerBasicForm",
            "spouseName",
            value ? userInfo.SpouseName : null
        );
        change(
            "customerBasicForm",
            "SpousedateOfBirth",
            value ? userInfo.SpouseDOB : null
        );
        change(
            "customerBasicForm",
            "pancardNumber",
            value ? userInfo.SpousePan : null
        );
        change(
            "customerBasicForm",
            "bornCity",
            value ? userInfo.BornCityId : null
        );
        change(
            "customerBasicForm",
            "bornCountry",
            value ? userInfo.BornStateId : null
        );
        change(
            "customerBasicForm",
            "nationality",
            value ? userInfo.Nationality : null
        );

    };

    handleSubmit = async (value) => {
        const { history, updateBSEAccountCreationRequest,userInfo } = this.props;

        const res = new Promise((resolve, reject) =>
            updateBSEAccountCreationRequest(
                {
                    "UserId": userInfo.Id ,
                    "FatherName": value.fatherName,
                    "MotherName": value.motherName,
                    "SpouseName": value.spouseName,
                    "SpouseDOB": moment(value.SpousedateOfBirth).format(),
                    "SpousePan": value.pancardNumber,
                    "BornCityId": value.bornCity,
                    "BornStateId": value.bornCountry,
                    "Nationality": value.nationality,
                    "SourceOfWealth": userInfo.SourceOfWealth,
                    "OccupationTypes": userInfo.OccupationTypes,
                    "ResidentStatus": userInfo.ResidentStatus,
                    "IncomeSlab": userInfo.IncomeSlab,
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
        history.push('/ProfessionalDetailPage');}
      );
      res.catch(error => {
        console.log(error);
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
        history.push('/KYCInformationPage');
    }

    handlemaritalStatus = (value) => {
        console.log(value);
        if (value === '3eb8b50f-c4bf-4981-9d4e-283dc9b09e74') {
            this.setState({
                isSpouseShow: true
            });
        } else {
            this.setState({
                isSpouseShow: false
            });
        }
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
        const { isLoading, genderTypes, maritalStatus, isSpouseShow, countryList, stateList } = this.state;
        const { isBSEAccountCreated } = this.props;
        //const {genderTypes,maritalStatus } = this.props;
        //const containerStyle = highContrast ? styles.darkContainer : null;
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
                            <title>Basic Details</title>
                        </Helmet>
                        <div className={styles.heading} name="maindiv">

                            {isBSEAccountCreated ? (<Stepper
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
                                activeStep={1}
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
                                            onClick: () => { this.handleSelection('address') }
                                        },

                                    ]}
                                    activeStep={0}
                                    activeColor={'#527318'}
                                    completeColor={'#87bd28'} />

                            )}

                            <h1 className={styles.heroText}>
                                Personal Information
                            </h1>

                            <div className={styles.productInformationContainer}>
                                <img
                                    alt={`kycLogo`}
                                    className={styles.productLogo}
                                    title={`KycLogo`}
                                    src={kycVerification}
                                />
                            </div>
                            <p className={styles.heading}>This details will be used to set-up your investment Account.</p>
                            <CustomerBasicDetails
                                genderTypes={genderTypes}
                                maritalStatus={maritalStatus}
                                countryList={countryList}
                                stateList={stateList}
                                handleLoad={this.handleLoad}
                                isSpouseShow={isSpouseShow}
                                handlemaritalStatus={this.handlemaritalStatus}
                                onSubmit={this.handleSubmit}
                                handleExit={this.handleExit}
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
AccountCreationPage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    history: PropTypes.shape({
        location: PropTypes.shape({
            search: PropTypes.string,
        }),
        push: PropTypes.func.isRequired,
    }).isRequired,
    userInfo: PropTypes.shape({}).isRequired,
    getGenderListRequest: PropTypes.func.isRequired,
    getMartialStatusRequest: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    isBSEAccountCreated: PropTypes.bool.isRequired,
    getCountryListRequest: PropTypes.func.isRequired,
    getStateListRequest: PropTypes.func.isRequired,
    updateBSEAccountCreationRequest: PropTypes.func.isRequired,
    loginUserRequest:PropTypes.func.isRequired

};

AccountCreationPage.defaultProps = {
    // getGenderListRequest:PropTypes.func.isRequired,
    // getMartialStatusRequest:PropTypes.func.isRequired
    change: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.header.isAuthenticated,
    userInfo: state.userManagement.userInfo,
    panVerified: state.userManagement.panVerified,
    genderTypes: state.userManagement.genderTypes,
    retireTypes: state.userManagement.retireTypes,
    maritalStatus: state.userManagement.maritalStatus,
    isBSEAccountCreated: state.userManagement.isBSEAccountCreated,
    countryList: state.bseManagement.countryList,
    stateList: state.bseManagement.stateList
});

const mapDispatchToProps = {
    getGenderListRequest,
    getMartialStatusRequest,
    getStateListRequest,
    getCountryListRequest,
    updateBSEAccountCreationRequest,
    loginUserRequest,
    change
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountCreationPage);
