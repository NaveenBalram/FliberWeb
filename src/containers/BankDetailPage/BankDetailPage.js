import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { notify } from 'react-notify-toast';
import { connect } from 'react-redux';
import { change, reset } from 'redux-form';
import moment from 'moment';
import { scroller } from 'react-scroll';
import Button from '../../components/Button/Button';
import Spinner from '../../components/Spinner/Spinner';
import styles from './BankDetailPage.module.scss';
import kycVerification from "../../assets/img/BankInfo.png";
import { Link, NavLink } from "react-router-dom";
import BankDetailsForm from '../../components/BankDetailsForm/BankDetailsForm';
import Stepper from 'react-stepper-horizontal';
import { SaveBankCard } from '../../components/SaveBankCard/SaveBankCard';
import { ifscCodeRequest } from '../../actions/UserManagement'

import { addBSEBankAccountRequest, getBSEBankAccountRequest, updateBSEBankAccountRequest, deleteBSEBankAccountRequest } from '../../actions/BSEAccountManagement'

import BankList from '../../utilities/BankList.json';

const SavedUserBankAccounts = [
    {
        "bankId": 1,
        "accountNumber": "0690000031",
        "bankName": "Citi Bank",
        "branch": "Bangalore",
        "ifsc": "CITI0000004",
        "city": "Bangalore",
        "state": "Karnataka",
        "bankAddress": "506-507, Level 5, Prestige Meridian 2, # 30 M G Road, Bangalore - 560001",
        "color": "citiBank",
        "isDefaultAccount": true
    },
    {
        "bankId": 2,
        "accountNumber": "0690000032",
        "bankName": "Axis Bank",
        "branch": "Mysore",
        "ifsc": "UTIB0000151",
        "city": "Mysore",
        "state": "Karnataka",
        "bankAddress": "Haripriya Complex, Temple Road  V V Mahalla",
        "color": "axisBank",
        "isDefaultAccount": false
    },
];

const BankLists = BankList.bank_name;

const accountTypes = [
    { "Id": 1, "Description": "Savings Account" },
    { "Id": 2, "Description": "Current Account" },

];

class BankDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasErrors: false,
            isInitialLoading: true,
            isLoading: false,
            onLoadform: false,
            showAddForm: false,
            nomineeId: '',
            initialBankDetails: false,
            setIfscCode: '',
            isDefaultAccount: false,
            SavedUserBankAccounts: []

        };
    }
    componentDidMount() {

        const { history, isAuthenticated } = this.props;
        if (!isAuthenticated) {
            history.push(`/`);
        } else {
            this.handleInitialMasterLists();
            this.handleAddedSuccess();
            scroller.scrollTo('main', {
                delay: 100,
                duration: 500,
                smooth: 'easeInOutQuart',
            });
        }
    }



    handleInitialMasterLists() {
        const { panVerified, change } = this.props;

        change(
            'BankDetailsForm',
            'accountHolderName',
            panVerified !== null ? panVerified.F_PAN_NAME : null
        );
        this.setState({
            isInitialLoading: false
        });



    }

    handleLoad(value) {
        const { change } = this.props;
    }

    handleSubmit = (value) => {

        const { addBSEBankAccountRequest, userInfo } = this.props;
        const { initialBankDetails, isDefaultAccount } = this.state;

        if (initialBankDetails === true) {

            const res = new Promise((resolve, reject) =>
                addBSEBankAccountRequest(
                    {
                        "UserId": userInfo.Id,
                        "AccountTypeNumber": 1,
                        "AccountType": value.accountTypes.toString(),
                        "AccountNo": value.accountNumber,
                        "MICRNo": "",
                        "IFSCCode": value.ifscCode,
                        "DefaultBankFlag": isDefaultAccount,
                        "CreatedOn": moment().format()
                    },
                    { reject, resolve }
                )
            );
            res.then(() => this.handleAddedSuccess());
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


        } else {
            this.setState({
                initialBankDetails: !this.state.initialBankDetails
            });
        }

    }

    handleAddedSuccess = () => {
        const { getBSEBankAccountRequest, userInfo } = this.props;

        var userId = userInfo.Id;

        const res = new Promise((resolve, reject) =>
            getBSEBankAccountRequest(
                {
                    userId
                },
                { reject, resolve }
            )
        );
        res.then(() => this.handleGetBankDetails());
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

    handleGetBankDetails = () => {
        const { userBankAccounts } = this.props;
        this.setState({
            SavedUserBankAccounts: userBankAccounts
        });
    }

    handleCancelBtn = () => {
        const { reset, change } = this.props;

        //change('addGoalOrIncomeForm','goalPriority',goalPriorities[0].id);

        reset("addIncomeForm");
        this.setState({
            onLoadform: false,
            endOfLifeChecked: false,
        });
        this.forceUpdate();
        scroller.scrollTo("Heading", {
            delay: 100,
            duration: 500,
            smooth: "easeInOutQuart",
        });

    }

    handleEditSuccess = (values, information) => {

        const { change } = this.props;
        change(
            'BankDetailsForm',
            'bankName',
            information ? information.bankName.toString() : null
        );

        change(
            'BankDetailsForm',
            'accountNumber',
            information ? information.accountNumber.toString() : null
        );

        change(
            'BankDetailsForm',
            'city',
            information ? moment(information.city).toString() : null
        );
        change(
            'BankDetailsForm',
            'ifsc',
            information ? information.ifsc : null
        );
        change(
            'BankDetailsForm',
            'defaultAccount',
            information.isDefaultAccount === true ? (this.setState({ isDefaultAccount: true })) : (this.setState({ isDefaultAccount: false }))
        );


        this.setState({
            nomineeId: information.nomineeId,
            showAddForm: true,
            onLoadform: true
        });
        scroller.scrollTo('addBankForm', {
            delay: 100,
            duration: 500,
            smooth: 'easeInOutQuart',
        });


    };

    handleDeleteConfirm = information => {
        notify.show(
            <div
                aria-hidden="true"
                aria-label="Are you sure you want to delete this Goal?"
                aria-labelledby="exampleModalLabel"
                aria-modal="true"
                className={styles.alertMsg}
                id="exampleModal"
                role="dialog"
                title="Are you sure you want to delete this Goal?"
            >
                Are you sure you want to delete this Goal ?
                <div className={styles.alertBtn}>
                    <Button
                        autoFocus
                        className={styles.alertDeleteBtn}
                        onClick={() => this.handleDeleteSuccess(information)}
                    >
                        Delete
                    </Button>

                    <button
                        className={styles.cancelBtn}
                        onClick={notify.hide}
                        type="submit"
                    >
                        Cancel
                    </button>
                </div>
            </div>,
            'error',
            10000000
        );
    };


    handleDeleteSuccess = information => {
        // const { deleteIncomeRequest, userInfo } = this.props;
        // const res = new Promise((resolve, reject) =>
        //     deleteIncomeRequest(
        //         {
        //             income_id: information.id,
        //         },
        //         { reject, resolve }
        //     )
        // );
        // res.then(() => {
        //     this.handleSaveIncomeSuccess()
        //     notify.hide();
        //     notify.show('The Goal deleted successfully', 'error', 5000);
        // });
        // res.catch(error => {
        //     if (error.response.status === 400) {
        //         notify.show(
        //             `An error occurred. Goal not deleted successfully: ${error.response.data.message}`,
        //             'error',
        //             5000
        //         );
        //     } else {
        //         notify.show(`${error}`, 'error', 5000);
        //     }
        // });
    };

    handleSubmitSuccess = () => {
    }

    handleExit = () => {
    }

    ShowAddForm = (value, cancelCliked) => {
        const { initialBankDetails } = this.state;
        this.setState({
            showAddForm: !this.state.showAddForm,
        });

        if (cancelCliked === true) {
            this.setState({
                initialBankDetails: false
            });
        }

        if (value === true) {
            scroller.scrollTo('addBankForm', {
                delay: 100,
                duration: 500,
                smooth: 'easeInOutQuart',
            });
        } else {


            scroller.scrollTo('main', {
                delay: 100,
                duration: 500,
                smooth: 'easeInOutQuart',
            });
        }

    }

    handleSelection = (value) => {

        const { history, setProfessionalClicked } = this.props;

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
            case 'esign':
                history.push('/EsignatureUploadPage');
                break;
            case 'address':
                history.push('/AddressDetailsPage');
                break;

        }
    }

    handleIFscCode = () => {
        const { setIfscCode } = this.state;
        const { ifscCodeRequest } = this.props;
        let ifscode = setIfscCode
        const res = new Promise((resolve, reject) =>
            ifscCodeRequest(
                {
                    ifscode

                },
                { reject, resolve }
            )
        );
        res.then(() => {
            this.handleIFSCCodeSuccess();
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
    setIfscCodeName = (value) => {

        this.setState({
            setIfscCode: value.currentTarget.value
        });
    }

    handleIFSCCodeSuccess = () => {
        const { ifscCode, change } = this.props;
        change(
            'BankDetailsForm',
            'bankName',
            ifscCode !== null ? ifscCode.Bank : null
        );
        change(
            'BankDetailsForm',
            'branchName',
            ifscCode !== null ? ifscCode.Branch : null
        );
        change(
            'BankDetailsForm',
            'branchCity',
            ifscCode !== null ? ifscCode.City : null
        );

        change(
            'BankDetailsForm',
            'bankaddress',
            ifscCode !== null ? ifscCode.Address : null
        );

        change(
            'BankDetailsForm',
            'branchState',
            ifscCode !== null ? ifscCode.State : null
        );
    }

    handleNext = () => {
        const { history } = this.props;
        history.push('/EsignatureUploadPage')
    }

    makeItDefault = () => {
        const { isDefaultAccount } = this.props;
        this.setState({
            isDefaultAccount: !isDefaultAccount
        });
    }

    render() {
        const {
            hasErrors,
            isInitialLoading,
            isLoading,
            onLoadform,
            showAddForm,
            initialBankDetails,
            isDefaultAccount
        } = this.state;


        return (
            <div className={styles.container} id="Skip-content" name="main">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Bank Information</title>
                </Helmet>
                {isInitialLoading ? (
                    <Spinner className={styles.spinner} />
                ) : (
                    <div className={cn(styles.subContainer)} name={'Heading'}>
                        <div className={styles.divContainer}>
                            <Stepper
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
                                activeStep={5}
                                activeColor={'#527318'}
                                completeColor={'#87bd28'}
                            />
                            <h1 className={styles.heroText}>Bank Information</h1>
                            <div className={styles.productInformationContainer}>
                                <img
                                    alt={`kycLogo`}
                                    className={styles.productLogo}
                                    title={`KycLogo`}
                                    src={kycVerification}
                                />
                            </div>

                        </div>
                        <div className={styles.heroSubText}>
                            <b>Fliber</b> Prefers to use this bank account to invest in mutual funds and all your withdrawals will be credited to this bank account.
                        </div>
                        <h2 className={styles.textLight}>User Accounts</h2>
                        {SavedUserBankAccounts.length === 0 ? (
                            <div className={styles.subContainer2}>
                                {initialBankDetails === false ? (<div className={styles.heroSubText}>
                                    No Account found. Please Add Bank Account Information <b><Link onClick={() => this.ShowAddForm(true, false)}>here</Link></b>.
                                </div>) : (<div className={styles.heroSubText}>
                                    If you know <b>IFSC code</b> please enter below it will get Bank Details.
                                </div>)}
                            </div>
                        ) : (
                            <div className={styles.subContainer2}>
                                <div className={styles.subContainer2}>
                                    {SavedUserBankAccounts.map((nominee, index) => (
                                        <SaveBankCard
                                            key={`SD_${index}`}
                                            handleDeleteSuccess={this.handleDeleteConfirm}
                                            handleEditSuccess={this.handleEditSuccess}
                                            information={nominee}
                                        />
                                    ))}
                                </div>
                                <div className={styles.heroSubText}>
                                    {showAddForm === false ? (<div>Add Bank Details <b><Link onClick={() => this.ShowAddForm(true, false)}>here</Link></b></div>) : (
                                        <div>
                                            <b><Link onClick={() => this.ShowAddForm(false, true)}>Cancel here</Link></b>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        {showAddForm === true ? (<div className={styles.subContainer} >
                            <BankDetailsForm
                                accountTypes={accountTypes}
                                onSubmit={this.handleSubmit}
                                initialBankDetails={initialBankDetails}
                                handleIFscCode={this.handleIFscCode}
                                setIfscCodeName={this.setIfscCodeName}
                                isDefaultAccount={isDefaultAccount}
                                makeItDefault={this, this.makeItDefault}
                            />
                        </div>) : (null)}
                        <div className={styles.actionBar} name="addBankForm">
                            <Button
                                className={styles.next}
                                disabled={hasErrors}
                                onClick={() => this.handleExit()}
                                type="submit"
                            >
                                <span>Back</span>
                            </Button>
                            <Button
                                className={styles.next}
                                disabled={hasErrors}
                                onClick={() => this.handleNext()}
                                type="submit"
                            >
                                <span>Skip Now</span>
                            </Button>
                        </div>
                    </div>
                )}
            </div>)
    }
}

// demo

BankDetailPage.propTypes = {
    change: PropTypes.func.isRequired,
    history: PropTypes.shape({
        location: PropTypes.shape({
            search: PropTypes.string,
        }),
        push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    reset: PropTypes.func.isRequired,
    ifscCodeRequest: PropTypes.func.isRequired,
    addBSEBankAccountRequest: PropTypes.func.isRequired,
    getBSEBankAccountRequest: PropTypes.func.isRequired,
    updateBSEBankAccountRequest: PropTypes.func.isRequired,
    deleteBSEBankAccountRequest: PropTypes.func.isRequired
}


BankDetailPage.defaultProps = {
    ifscCodeRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.header.isAuthenticated,
    userInfo: state.userManagement.userInfo,
    panVerified: state.userManagement.panVerified,
    ifscCode: state.userManagement.ifscCode,
    userBankAccounts: state.bseManagement.userBankAccounts
});

const mapDispatchToProps = {
    change,
    reset,
    ifscCodeRequest,
    addBSEBankAccountRequest,
    getBSEBankAccountRequest,
    deleteBSEBankAccountRequest,
    updateBSEBankAccountRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(BankDetailPage);
