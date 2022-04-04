import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { notify } from 'react-notify-toast';
import { connect } from 'react-redux';
import { change, reset } from 'redux-form';
import moment from 'moment';
import { scroller } from 'react-scroll';
import AddIncomeForm from '../../components/AddIncomeForm/AddIncomeForm';
import Button from '../../components/Button/Button';
import { SaveIncomeCard } from '../../components/SaveIncomeCard/SaveIncomeCard';
import Spinner from '../../components/Spinner/Spinner';
import styles from './IncomeManagementPage.module.scss';
import {
    getIncomeCategoryRequest, getIncomeFrequencyRequest, getIncomeTypeRequest,
    addUserIncomeRequest, getUserIncomeRequest, deleteIncomeRequest
} from '../../actions/IncomeManagement';
import {getGoalRateRequest} from '../../actions/GoalManagement';

import { has } from 'lodash';

const goalPriorities = [
    {
        "id": 1,
        "Name": "1",
    },
    {
        "id": 2,
        "Name": "2"
    },
    {
        "id": 3,
        "Name": "3"
    },
    {
        "id": 4,
        "Name": "4"
    },
    {
        "id": 5,
        "Name": "5"
    }

];


class IncomeManagementPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasErrors: false,
            isInitialLoading: true,
            isLoading: false,
            onLoadform: false,
            isGoalNameFieldEnabled: false,
            selectedValue: "Select Frequency",
            asOfTargetChecked: false,
            asOfTodayChecked: false,
            atAgeDisabled: false,
            tillAgeHidden: false,
            endOfLifeChecked: false,
            endOfLifeHidden: false,
            isAsTodayTargetHidden: false,
            isInflectionRateHidden: false,
            userCurrentAge: 0,
            IncomeCategories: [],
            IncomeFrequencies: [],
            IncomeTypes: [],
            IncomeLists: [],
            isAdhocSelected: false,
            incomeId: 0,
            goalRates: []
        };
    }
    componentDidMount() {

        const { history, userInfo, isAuthenticated } = this.props;
        if (!isAuthenticated) {
            history.push(`/`);
        } else {
            this.setState({
                userCurrentAge: moment().diff(userInfo.DateOfBirth, 'years', false),
                isAsTodayTargetHidden: false,
                tillAgeHidden: false
            });
            this.initialAPICall();

        }
    }

    initialAPICall() {

        const { getUserIncomeRequest, getIncomeTypeRequest, getIncomeFrequencyRequest, getIncomeCategoryRequest, userInfo,getGoalRateRequest } = this.props;
        const res1 = new Promise((resolve, reject) =>
            getIncomeCategoryRequest({ reject, resolve })
        );

        const res2 = new Promise((resolve, reject) =>
            getIncomeTypeRequest({ reject, resolve })
        );
        const res3 = new Promise((resolve, reject) =>
            getIncomeFrequencyRequest({ reject, resolve })
        );
        // const res4 = new Promise((resolve, reject) =>
        //     getUserIncomeRequest({
        //         "user_id": userInfo.id,
        //     }, { reject, resolve }));

        Promise.all([res1, res2, res3])
            .then(() => this.handleInitialMasterLists())
            .catch(error => {
                if (error.response.status === 400) {
                    notify.show(`${error.response.data.message}`, 'error', 10000);
                } else {
                    notify.show(` ${error}`, 'error', 5000);
                }
            });
    }

    handleInitialMasterLists() {
        const { incomeFrequencies, incomeTypes, savedUserIncomes, incomeCategories,goalRates } = this.props;

        this.setState({
            incomeCategories: incomeCategories,
            IncomeLists: savedUserIncomes,
            incomeFrequencies: incomeFrequencies,
            incomeTypes: incomeTypes,
            isInitialLoading: false,
            goalRates:goalRates
        });
    }

    handleLoad(value) {
        const { change } = this.props;
        // //  change(
        // //    "addGoalOrIncomeForm",
        // //    "tillAge",
        // //    "85"
        // //  );
        //  change('addGoalOrIncomeForm','goalFrequency',);

    }


    handleTextBox = (value) => {
        const { change } = this.props;
        if (value.target.value != null) {
            this.setState({
                endOfLifeChecked: false
            });
        }
        if (value.target.value === '') {
            this.setState({
                endOfLifeChecked: true
            });
        }
    }


    handleIncomeName = (value) => {
        console.log(value);
        const { reset, change } = this.props;
        const { userCurrentAge, incomeCategories, incomeFrequencies, incomeTypes,goalRates } = this.state;
        //let inflationRates = incomeTypes.filter(x => x.id === value);

        let goalCateItems = incomeCategories.filter(x => x.Id === value);
        let inflationRates = goalRates.filter(x => x.Id == goalCateItems[0].RateId);
        change('addIncomeForm', 'incomeInflationRate', inflationRates[0].Percentage.toString());
        change('addIncomeForm', 'incomeFrequency', goalCateItems[0].FrequencyId);
        change('addIncomeForm', 'incomeType', goalCateItems[0].IncomeTypeId);
        this.handleIncomeType(goalCateItems[0].IncomeTypeId);
      
    }

    handleIncomeType = (value) => {
       
        const { change } = this.props;
        const { userCurrentAge,incomeTypes } = this.state;
        let inflationRates = incomeTypes.filter(x => x.Id === value);
        
        if (inflationRates[0].Ref_Id === 1) {
            this.setState({
                endOfLifeChecked: true,
                atAgeDisabled: true
            });
            change('addIncomeForm', 'atAge', '');
            change('addIncomeForm', 'tillAge', '85');
        } else {
            this.setState({ endOfLifeChecked: false });
            change('addIncomeForm', 'tillAge', '');
        }

        if (inflationRates[0].Ref_Id  === 2) {
            this.setState({
                endOfLifeChecked: false,
                atAgeDisabled: false,
                endOfLifeHidden: true
            });
            change('addIncomeForm', 'tillAge', '');
            change('addIncomeForm', 'atAge', (userCurrentAge + 1).toString());
        }

        if (inflationRates[0].Ref_Id  === 3) {
            this.setState({
                endOfLifeHidden: true,
                tillAgeHidden: true,
                isAsTodayTargetHidden: true,
                isAdhocSelected: true
            });
            change('addIncomeForm', 'incomeInflationRate', '');
        } else {
            this.setState({
                endOfLifeHidden: false,
                tillAgeHidden: false,
                isAsTodayTargetHidden: false,
                isAdhocSelected: false
            });
        }
    }

    handleSubmit = (value) => {

        const { userCurrentAge, incomeId } = this.state;
        const { addUserIncomeRequest, userInfo } = this.props;
        this.setState({
            hasErrors: false
        });
        this.setState({
            isLoading: true,
        });
        let haserror =  false;  //this.handleErrorCheck(value);
        if (haserror === false) {

            const saveUserIncome = new Promise((resolve, reject) =>
                addUserIncomeRequest(
                    {
                        //"IncomeId": incomeId,
                        "UserId": userInfo.Id,
                        "IncomeInflationRate": Number(value.incomeInflationRate),
                        "IncomeStartAge": Number(value.atAge === undefined ? userCurrentAge : value.atAge),
                        "IncomeEndAge": Number(value.tillAge === undefined ? 85 : value.tillAge),
                        "IncomeAmount": Number(value.incomeAmount),
                        "IncomeAmountType": true,
                        "IncomeCategoryId": value.incomeCategory,
                        "IncomeTypeId": value.incomeType,
                        "IncomeFrequencyId":value.incomeFrequency,
                        "CreatedOn": moment().format(),
                        "UpdatedOn": moment().format()
                        
                    },
                    { reject, resolve }
                )
            );
            saveUserIncome.then(() =>

                this.handleSaveIncomeSuccess())
                .catch(error => {
                    this.setState({
                        isLoading: false
                    });
                    if (error.response.status === 400) {
                        notify.show(`${error.response.data.message}`, 'error', 10000);
                    } else {
                        notify.show(` ${error}`, 'error', 5000);
                    }
                });
        }
    }

    handleSaveIncomeSuccess = () => {
        const { getUserIncomeRequest, userInfo, reset } = this.props;

        this.setState({
            isLoading: true,
            incomeId: 0
        });
        const res = new Promise((resolve, reject) =>
            getUserIncomeRequest({
                "user_id": userInfo.user,
            }, { reject, resolve }));

        res.then(this.handleGetIncomedGoals());

    }

    handleGetIncomedGoals = () => {
        this.setState({
            isLoading: false,
            isInitialLoading: false
        },
            () => {
                scroller.scrollTo("Heading", {
                    delay: 100,
                    duration: 500,
                    smooth: "easeInOutQuart",
                });
                this.handleCancelBtn();
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




    handleErrorCheck = (value) => {
        const { savedUserIncomes, incomeCategories } = this.props;
        const { userCurrentAge } = this.state;

        let categoryId = incomeCategories.filter(x => x.Id === value.incomeCategory);


        let ifCategoryExist = savedUserIncomes!==undefined ? savedUserIncomes.filter(x => x.IncomeCategory__Name === categoryId[0].Name):[];

        let haserrors = false;
        if (value.atAge <= (userCurrentAge)) {
            notify.show(`At age should  be greather than your current age`, 'error');
            haserrors = true;
        }


        if (value.tillAge >= 100) {
            notify.show(`Till age should be lesser than 100`, 'error');
            haserrors = true;
        }

        if (ifCategoryExist.length > 0) {
            notify.show(`Income category already exist in your Income Lists`, 'error');
            haserrors = true;
        }

        if (haserrors === true) {
            this.setState({
                isLoading: false,
            });
        }

        return haserrors;
    }

    handleCancelBtn = () => {
        const { reset } = this.props;
        reset("addIncomeForm");
        this.componentDidMount()
        this.setState({
            onLoadform: false,
            endOfLifeChecked: false,
        });
        scroller.scrollTo("Heading", {
            delay: 100,
            duration: 500,
            smooth: "easeInOutQuart",
        });

    }

    handleEditSuccess = (values, information) => {

        const { change, incomeCategories, incomeTypes, incomeFrequencies } = this.props;

        let incomeId = incomeTypes.filter(x => x.Name === information.IncomeType__Name);
        let incomeCategory = incomeCategories.filter(x => x.Name === information.IncomeCategory__Name);
        let incomeFrequency = incomeFrequencies.filter(x => x.Name === information.IncomeFrequency__Name);

        this.setState({
            incomeId: information.id
        });

        change(
            'addIncomeForm',
            'incomeAmount',
            information ? information.IncomeAmount.toString() : null
        );
        change(
            'addIncomeForm',
            'atAge',
            information ? information.IncomeStartAge.toString() : null
        );
        change(
            'addIncomeForm',
            'tillAge',
            information ? information.IncomeEndAge.toString() : null
        );

        change(
            'addIncomeForm',
            'incomeInflationRate',
            information ? information.IncomeInflationRate.toString() : null
        );
        change(
            'addIncomeForm',
            'incomeCategory',
            information ? incomeCategory[0].id : null
        );

        change(
            'addIncomeForm',
            'incomeFrequency',
            information ? incomeFrequency[0].id : null
        );

        change(
            'addIncomeForm',
            'incomeType',
            information ? incomeId[0].id : null
        );
        this.handleIncomeType(incomeId[0].id);

        this.setState({
            // endOfLifeChecked: information.EndOfLife,
            onLoadform: true
        });
        scroller.scrollTo('addGoalForm', {
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
        const { deleteIncomeRequest, userInfo } = this.props;
        const res = new Promise((resolve, reject) =>
            deleteIncomeRequest(
                {
                    income_id: information.id,
                },
                { reject, resolve }
            )
        );
        res.then(() => {
            this.handleSaveIncomeSuccess()
            notify.hide();
            notify.show('The Goal deleted successfully', 'error', 5000);
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

    handleasOfToday = (value) => {
        const { change } = this.props;
        const { incomeCategories, isAdhocSelected } = this.state;
        this.setState({
            asOfTodayChecked: value,
            asOfTargetChecked: false
        })

        if (isAdhocSelected === true && value === true) {

            let incomeCat = incomeCategories.filter(x => x.id === 1);
            change('addIncomeForm', 'incomeInflationRate', incomeCat[0].IncomeInflationRate.toString());
        } else {
            change('addIncomeForm', 'incomeInflationRate', '');
        }
    }

    handleasOfTarget = (value) => {

        this.setState({
            asOfTargetChecked: value,
            asOfTodayChecked: false
        });
    }

    handleSubmitSuccess = () => {

        const { history, userInfo } = this.props;
        if (userInfo.RetirementStatusId === "d597ffe5-5c2d-4f9f-bc04-b12c3176c10f") {
            history.push('/PreRetirementGoalPage');
        }

        if (userInfo.RetirementStatusId === "e6183675-4723-45a2-8694-3e1e18fcb950") {
            history.push('/PostRetireeDashboardPage');
        }
    }

    handleExit = () => {

        const { history, userInfo } = this.props;
        if (userInfo.RetirementStatusId === "d597ffe5-5c2d-4f9f-bc04-b12c3176c10f") {
            history.push('/productHomePage');
        }

        if (userInfo.RetirementStatusId === "e6183675-4723-45a2-8694-3e1e18fcb950") {
            history.push('/PostRetireeDashboardPage');
        }
    }


    handleEndOfLifeHidden = (value) => {
        const { change } = this.props;

        if (value == true) {
            change('addIncomeForm', 'tillAge', '85');
        } else {
            change('addIncomeForm', 'tillAge', '');
        }
    }


    render() {
        const {
            hasErrors,
            isInitialLoading,
            isLoading,
            onLoadform,
            incomeCategories,
            incomeFrequencies,
            incomeTypes,
            IncomeLists,
            endOfLifeChecked,
            atAgeDisabled,
            endOfLifeHidden,
            tillAgeHidden,
            isAsTodayTargetHidden,
            asOfTargetChecked,
            asOfTodayChecked
        } = this.state;

        //const { savedUserIncomes } = this.props;
        const savedUserIncomes = [];
        return (
            <div className={styles.container} id="Skip-content">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Income Management</title>
                </Helmet>
                {isInitialLoading ? (
                    <Spinner className={styles.spinner} />
                ) : (
                    <div className={cn(styles.subContainer)} name={'Heading'}>
                        <h1 className={styles.heroText}>Income Management</h1>
                        <div className={styles.heroSubText}>
                            This page allows you to View, Add, and Edit your Incomes.
                        </div>
                        <h2 className={styles.textLight}>User Incomes</h2>
                        {savedUserIncomes.length === 0 ? (
                            <div className={styles.subContainer2}>
                                <div className={styles.heroSubText}>
                                    No Income Found. Please create Incomes.
                                </div>
                            </div>
                        ) : (

                            <div className={styles.subContainer2}>

                                <div className={styles.subContainer2}>
                                    {savedUserIncomes.map((beneficiary, index) => (
                                        <SaveIncomeCard
                                            key={`SD_${index}`}
                                            handleDeleteSuccess={this.handleDeleteConfirm}
                                            handleEditSuccess={this.handleEditSuccess}
                                            information={beneficiary}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className={styles.subContainer} name="addGoalForm">
                            <AddIncomeForm
                                incomeCategory={incomeCategories}
                                frequencyTypes={incomeFrequencies}
                                incomeTypes={incomeTypes}
                                formType={"Income"}
                                handleIncomeName={this.handleIncomeName}
                                handleIncomeType={this.handleIncomeType}
                                endOfLifeChecked={endOfLifeChecked}
                                atAgeDisabled={atAgeDisabled}
                                endOfLifeHidden={endOfLifeHidden}
                                tillAgeHidden={tillAgeHidden}
                                handleCancelBtn={this.handleCancelBtn}
                                isAsTodayTargetHidden={isAsTodayTargetHidden}
                                handleasOfToday={this.handleasOfToday}
                                asOfTargetChecked={asOfTargetChecked}
                                asOfTodayChecked={asOfTodayChecked}
                                handleasOfTarget={this.handleasOfTarget}
                                onSubmit={this.handleSubmit}
                                loading={isLoading}
                                onLoadform={onLoadform}
                                handleEndOfLifeHidden={this.handleEndOfLifeHidden}
                            />
                        </div>
                        <div className={styles.actionBar}>
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
                                <span>Next</span>
                            </Button>
                        </div>
                    </div>
                )}
            </div>)
    }
}

// demo

IncomeManagementPage.propTypes = {
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
    getUserIncomeRequest: PropTypes.func.isRequired,
    getIncomeCategoryRequest: PropTypes.func.isRequired,
    getIncomeFrequencyRequest: PropTypes.func.isRequired,
    getIncomeTypeRequest: PropTypes.func.isRequired,
    addUserIncomeRequest: PropTypes.func.isRequired,
    deleteIncomeRequest: PropTypes.func.isRequired,
    getGoalRateRequest: PropTypes.func.isRequired
};

IncomeManagementPage.defaultProps = {

};

const mapStateToProps = state => ({
    incomeFrequencies: state.incomeManagement.incomeFrequencies,
    incomeTypes: state.incomeManagement.incomeTypes,
    incomeCategories: state.incomeManagement.incomeCategories,
    savedUserIncomes: state.incomeManagement.savedUserIncomes.Income,
    isAuthenticated: state.header.isAuthenticated,
    userInfo: state.userManagement.userInfo,
    goalRates: state.goalManagement.goalRates,
    getGoalRateRequest: PropTypes.func.isRequired
});

const mapDispatchToProps = {
    change,
    reset,
    getUserIncomeRequest,
    getIncomeCategoryRequest,
    getIncomeFrequencyRequest,
    getIncomeTypeRequest,
    addUserIncomeRequest,
    deleteIncomeRequest,
    getGoalRateRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomeManagementPage);
