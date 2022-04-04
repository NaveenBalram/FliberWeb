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
import styles from './NomineesDetailPage.module.scss';
import kycVerification from "../../assets/img/Nominess.png";
import { Link, NavLink } from "react-router-dom";
import NomineeDetailsForm from '../../components/NomineeDetailsForm/NomineeDetailsForm';
import Stepper from 'react-stepper-horizontal';
import { SaveNomineeCard } from '../../components/SaveNomineeCard/SaveNomineeCard';
import {
    getNomineeRelationRequest, addBSEAccountNomineeRequest, getBSEAccountNomineeRequest,
    updateBSEAccountNomineeRequest, deleteBSEAccountNomineeRequest
} from '../../actions/BSEAccountManagement';

// const SavedUserNominess = [
//     {
//         "id": 1,
//         "nomineeName": "Namratha D",
//         "nomineeRelationValue": 5,
//         "nomineeShare": "70%",
//         "nomineeDOB": "02/13/1996",
//         "nomineeRelation": "Spouse"
//     },
//     {
//         "id": 2,
//         "nomineeName": "Charvik",
//         "nomineeRelationValue": 6,
//         "nomineeShare": "30%",
//         "nomineeDOB": "07/12/2018",
//         "nomineeRelation": "Son"
//     },
// ];


class NomineesDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasErrors: false,
            isInitialLoading: true,
            isLoading: false,
            onLoadform: false,
            showAddForm: false,
            nomineeId: null,
            nomineeRelation: [],
            savedUserNominess: [],
        };
    }
    componentDidMount() {

        // const { history, userInfo, isAuthenticated } = this.props;
        // if (!isAuthenticated) {
        //     history.push(`/`);
        // } else {
        //     this.initialAPICall();
        // }
        this.handleInitialMasterLists();
        this.handleAddedSuccess();
        scroller.scrollTo('main', {
            delay: 100,
            duration: 500,
            smooth: 'easeInOutQuart',
        });
    }



    handleInitialMasterLists() {
        const { getNomineeRelationRequest } = this.props;
        const res = new Promise((resolve, reject) =>
            getNomineeRelationRequest(
                { reject, resolve }
            )
        );
        res.then(() => {
            this.handleLoadMasterList();
        });
        res.catch(error => {
            if (error.response.status === 400) {
                notify.show(
                    `An error occurred. Goal not deleted successfully: ${error.response.data.message}`,
                    'error',
                    5000
                );
            } else {
                notify.show(`${error}`, 'error', 5000);
            }
        });
        this.setState({
            isInitialLoading: false
        });
    }

    handleLoadMasterList() {
        const { nomineesReleations } = this.props;
        this.setState({
            nomineeRelation: nomineesReleations
        });
    }

    handleLoad(value) {
        const { change } = this.props;
    }

    handleSubmit = (value) => {
        const { nomineeId } = this.state;
        if(nomineeId===null){
            this.AddNominess(value);
        }else{
            this.UpdateNominess(value)
        }
       
    }

    AddNominess(value) {

        const { addBSEAccountNomineeRequest, userInfo } = this.props;
        const res = new Promise((resolve, reject) => addBSEAccountNomineeRequest(
            {
                "UserId": userInfo.Id,
                "NomineeNumber": 1,
                "NomineeName": value.nomineeName,
                "NomineeRelationship": value.nomineeRelation,
                "NomineeApplicablePercent": parseInt(value.nomineeShare),
                "NomineeMinorFlag": "false",
                "NomineeDOB": moment(value.NomineeDOB).format(),
                "NomineeGuardian": "",
                "CreatedOn": moment().format(),
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
    }

    UpdateNominess(value) {

        const { updateBSEAccountNomineeRequest, userInfo } = this.props;
        const { nomineeId } = this.state;
        const res = new Promise((resolve, reject) => updateBSEAccountNomineeRequest(
            {
                "UserId": userInfo.Id,
                "NomineeNumber": 2,
                "NomineeName": value.nomineeName,
                "NomineeRelationship": value.nomineeRelation,
                "NomineeApplicablePercent": parseInt(value.nomineeShare),
                "NomineeMinorFlag": "false",
                "NomineeDOB":  moment().format(),                               //moment(value.NomineeDOB,true).format("YYYY-MM-DD HH:mm:ss"),
                "NomineeGuardian": "",
                "CreatedOn": moment().format(),
                "Id": nomineeId
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
    }

    handleAddedSuccess = () => {
        const { getBSEAccountNomineeRequest, userInfo } = this.props;

        var userId = userInfo.Id;

        const res = new Promise((resolve, reject) =>
            getBSEAccountNomineeRequest(
                {
                    userId
                },
                { reject, resolve }
            )
        );
        res.then(() => this.handleGetNominess());
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

    handleGetNominess = () => {
        const { bseUserNominess } = this.props;
        this.setState({
            savedUserNominess: bseUserNominess
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
            'NomineeDetailsForm',
            'nomineeName',
            information ? information.NomineeName.toString() : null
        );

        change(
            'NomineeDetailsForm',
            'nomineeShare',
            information ? information.NomineeApplicablePercent.toString() : null
        );

        change(
            'NomineeDetailsForm',
            'nomineedateOfBirth',
            information ? moment(information.NomineeDOB).format("MM/DD/YYYY").toString() : null
        );
        change(
            'NomineeDetailsForm',
            'nomineeRelation',
            information ? information.NomineeRelationship : null
        );


        this.setState({
            nomineeId: information.Id,
            showAddForm: true,
            onLoadform: true
        });
        scroller.scrollTo('addNomineeForm', {
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
        const { deleteBSEAccountNomineeRequest, userInfo } = this.props;
        var uuid = information.Id
        const res = new Promise((resolve, reject) =>
            deleteBSEAccountNomineeRequest(
                {
                    uuid,
                },
                { reject, resolve }
            )
        );
        res.then(() => {
            this.handleAddedSuccess()
            notify.hide();
            notify.show('The Nominee deleted successfully', 'error', 5000);
        });
        res.catch(error => {
            if (error.response.status === 400) {
                notify.show(
                    `An error occurred. Goal not deleted successfully: ${error.response.data.message}`,
                    'error',
                    5000
                );
            } else {
                notify.show(`${error}`, 'error', 5000);
            }
        });
    };

    handleSubmitSuccess = () => {
        const { history } = this.props;
        history.push('/BankDetailPage');
    }

    handleExit = () => {
    }

    ShowAddForm = (value) => {
        this.setState({
            showAddForm: !this.state.showAddForm
        });
        if (value === true) {
            scroller.scrollTo('addNomineeForm', {
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
            case 'address':
                history.push('/AddressDetailsPage');
                break;
        }
    }


    render() {
        const {
            hasErrors,
            isInitialLoading,
            isLoading,
            onLoadform,
            showAddForm,
            nomineeRelation,
            savedUserNominess
        } = this.state;


        return (
            <div className={styles.container} id="Skip-content" name="main">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Nominee Information</title>
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
                                activeStep={4}
                                activeColor={'#527318'}
                                completeColor={'#87bd28'}
                            />
                            <h1 className={styles.heroText}>Nominee Information</h1>
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
                            <b>Fliber</b> Prefers to have a nominee so that investor's family can easily claim the transfer of investment value in an unfortunate event of death of the investor.
                        </div>
                        <h2 className={styles.textLight}>User Nominees</h2>
                        {savedUserNominess.length === 0 ? (
                            <div className={styles.subContainer2}>
                                <div className={styles.heroSubText}>
                                    No nominees found. Please create nominees <b><Link onClick={() => this.ShowAddForm(true)}>here</Link></b>.
                                </div>
                            </div>
                        ) : (
                            <div className={styles.subContainer2}>
                                <div className={styles.subContainer2}>
                                    {savedUserNominess.map((nominee, index) => (
                                        <SaveNomineeCard
                                            key={`SD_${index}`}
                                            handleDeleteSuccess={this.handleDeleteConfirm}
                                            handleEditSuccess={this.handleEditSuccess}
                                            information={nominee}
                                            nomineeReleation={nomineeRelation}
                                        />
                                    ))}
                                </div>
                                <div className={styles.heroSubText}>
                                    {showAddForm === false ? (<div>Add nominee <b><Link onClick={() => this.ShowAddForm(true)}>here</Link></b></div>) : (
                                        <div>
                                            <b><Link onClick={() => this.ShowAddForm(false)}>Cancel here</Link></b>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        {showAddForm === true ? (<div className={styles.subContainer} >
                            <NomineeDetailsForm
                                nomineeReleation={nomineeRelation}
                                onSubmit={this.handleSubmit}
                            />
                        </div>) : (null)}
                        <div className={styles.actionBar} name="addNomineeForm">
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
                                onClick={() => this.handleSubmitSuccess()}
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

NomineesDetailPage.propTypes = {
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
    getNomineeRelationRequest: PropTypes.func.isRequired,
    addBSEAccountNomineeRequest: PropTypes.func.isRequired,
    deleteBSEAccountNomineeRequest: PropTypes.func.isRequired,
    getBSEAccountNomineeRequest: PropTypes.func.isRequired,
    updateBSEAccountNomineeRequest: PropTypes.func.isRequired
}


NomineesDetailPage.defaultProps = {
    getNomineeRelationRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.header.isAuthenticated,
    userInfo: state.userManagement.userInfo,
    nomineesReleations: state.bseManagement.nomineeTypes,
    bseUserNominess: state.bseManagement.bseUserNominess

});

const mapDispatchToProps = {
    getNomineeRelationRequest,
    change,
    reset,
    addBSEAccountNomineeRequest,
    getBSEAccountNomineeRequest,
    updateBSEAccountNomineeRequest,
    deleteBSEAccountNomineeRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(NomineesDetailPage);
