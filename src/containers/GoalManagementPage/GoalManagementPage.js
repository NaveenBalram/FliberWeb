import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { notify } from 'react-notify-toast';
import { connect } from 'react-redux';
import { change, reset } from 'redux-form';
import moment from 'moment';
import { scroller } from 'react-scroll';
import AddGoalOrIncomeForm from '../../components/AddGoalOrIncomeForm/AddGoalOrIncomeForm';
import Button from '../../components/Button/Button';
import { SavedGoalsCard } from '../../components/SavedGoalsCard/SavedGoalsCard';
import Spinner from '../../components/Spinner/Spinner';
import styles from './GoalManagementPage.module.scss';
import {
    getGoalCategoryRequest, getGoalBucketRequest, getGoalTypeRequest,
    getGoalFrequencyRequest, getUserGoalRequest, addUserGoalRequest,
    deleteGoalRequest, getGoalRateRequest
} from '../../actions/GoalManagement';
import { delay, has } from 'lodash';
import { validateNumbers } from '../../utilities/validations';



const goalPriorities = [
    {
        "id": 0,
        "Name": "Select Priority"
    },
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
    },
    {
        "id": 6,
        "Name": "6"
    },
    {
        "id": 7,
        "Name": "7"
    },
    {
        "id": 8,
        "Name": "8"
    },
    {
        "id": 9,
        "Name": "9"
    },
    {
        "id": 10,
        "Name": "10"
    }

];


class GoalManagementPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasErrors: false,
            isInitialLoading: true,
            isLoading: false,
            onLoadform: false,
            isGoalNameFieldEnabled: false,
            savedGoals: [],
            selectedValue: "Select Frequency",
            asOfTargetChecked: false,
            asOfTodayChecked: false,
            atAgeDisabled: false,
            atTillAgeDisable: false,
            endOfLifeChecked: false,
            endOfLifeHidden: false,
            isAsTodayTargetHidden: false,
            isInflectionRateHidden: false,
            userCurrentAge: 0,
            goalCategories: [],
            goalBuckets: [],
            goalFrequencies: [],
            goalTypes: [],
            gaolLists: [],
            isAdhocGoal: false,
            clearDDValues: false,
            goalId: 0,
        };
    }

    initialAPICall() {

        const { getGoalCategoryRequest, getGoalBucketRequest, getGoalTypeRequest, getGoalFrequencyRequest, getUserGoalRequest,
            getGoalRateRequest, userInfo } = this.props;

         const res6 = new Promise((resolve, reject) =>
           getUserGoalRequest({ reject, resolve }));
        const res1 = new Promise((resolve, reject) =>
            getGoalCategoryRequest({ reject, resolve })
        );

        const res2 = new Promise((resolve, reject) =>
            getGoalBucketRequest({ reject, resolve })
        );
        const res3 = new Promise((resolve, reject) =>
            getGoalTypeRequest({ reject, resolve })
        );
        const res4 = new Promise((resolve, reject) =>
            getGoalFrequencyRequest({ reject, resolve })
        );
        const res5 = new Promise((resolve, reject) =>
            getGoalRateRequest({ reject, resolve })
        );

        Promise.all([res1, res2, res3, res4, res5])
            .then(() => this.handleInitialMasterLists())
            // .catch(error => {
            //     if (error.response.status === 400) {
            //         notify.show(`${error.response.data.message}`, 'error', 10000);
            //     } else {
            //         notify.show(` ${error}`, 'error', 5000);
            //     }
            // });
    }

    componentDidMount() {

        const { history, userInfo, isAuthenticated } = this.props;
        const { getGoalCategoryRequest, getGoalBucketRequest, getGoalTypeRequest, getGoalFrequencyRequest, getUserGoalRequest,
            getGoalRateRequest } = this.props;

        if (!isAuthenticated) {
            history.push(`/`);
        } else {
            this.setState({
                userCurrentAge: moment().diff(userInfo.DateOfBirth, 'years', false),
                isInitialLoading: false
            });
            this.initialAPICall();
        }
    }


    handleInitialMasterLists() {
        const { goalCategories, goalTypes, goalBuckets, goalFrequencies, savedGoals, goalRates, userInfo } = this.props;
        this.setState({
            goalCategories: goalCategories,
            goalTypes: goalTypes,
            goalBuckets: goalBuckets,
            goalFrequencies: goalFrequencies,
            gaolLists: savedGoals.filter(x => x.UserId === userInfo.Id),
            isInitialLoading: false,
            goalRates: goalRates
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
        if (value.target.value === '85') {

            this.setState({
                endOfLifeChecked: true
            });

        }
        if (value.target.value === '') {

            this.setState({
                endOfLifeChecked: true
            });

        }


    }


    handleGoalName = (value) => {

        const { reset, change } = this.props;
        const { goalCategories, goalFrequencies, goalTypes, goalBuckets, userCurrentAge } = this.state;
        const { goalRates } = this.props;
        let goalCateItems = goalCategories.filter(x => x.Id === value);

        let goalRate = goalRates.filter(x => x.Id == goalCateItems[0].RateId);

        change('addGoalOrIncomeForm', 'goalInflationRate', goalRate[0].Percentage.toString());

        this.setState({
            isInflectionRateHidden: false
        });

        if (goalCateItems[0].Ref_Id === 12) {
            change('addGoalOrIncomeForm', 'goalInflationRate', '');
            this.setState({
                isGoalNameFieldEnabled: true,
                atAgeDisabled: false
            });
        } else {
            let goaltype = goalTypes.filter(x => x.Ref_Id == 1);
            change('addGoalOrIncomeForm', 'goalType', goaltype[0].Id);
            this.setState({
                isGoalNameFieldEnabled: false,
                isAdhocGoal: false
            });
        }

        //Recurring P
        if (goalCateItems[0].Ref_Id === 7 || goalCateItems[0].Ref_Id === 9 || goalCateItems[0].Ref_Id === 10) {
            let item = goalFrequencies.filter(x => x.Ref_Id === 1);

            this.setState({
                selectedValue: item[0].Name,

            });
            change('addGoalOrIncomeForm', 'atAge', '');
            change('addGoalOrIncomeForm', 'goalFrequency', item[0].Id);
            change('addGoalOrIncomeForm', 'tillAge', '85');

            this.setState({
                atAgeDisabled: true,
                endOfLifeChecked: true,
                isAsTodayTargetHidden: true,
            });
        } else {
            this.setState({
                atAgeDisabled: false,
                endOfLifeChecked: false,
                isAsTodayTargetHidden: false,
            });
            let item = goalFrequencies.filter(x => x.Ref_Id === 4);
            this.setState({
                selectedValue: item[0].Name,

            });
            change('addGoalOrIncomeForm', 'goalFrequency', item[0].Id);
            change('addGoalOrIncomeForm', 'tillAge', '');
            change('addGoalOrIncomeForm', 'atAge', (userCurrentAge + 1).toString());

        }
        //Adhoc Goals

        switch (goalCateItems[0].Ref_Id) {

            case 1:
                change('addGoalOrIncomeForm', 'atAge', (userCurrentAge + 1).toString());
                this.setState({
                    atTillAgeDisable: true,
                    endOfLifeHidden: true,
                });
                break;
            case 2:
                change('addGoalOrIncomeForm', 'atAge', (userCurrentAge + 1).toString());
                this.setState({
                    atTillAgeDisable: true,
                    endOfLifeHidden: true,
                });
                break;
            case 3:
                change('addGoalOrIncomeForm', 'atAge', (userCurrentAge + 1).toString());
                this.setState({
                    atTillAgeDisable: true,
                    endOfLifeHidden: true,
                });
                break;
            case 4:
                change('addGoalOrIncomeForm', 'atAge', (userCurrentAge + 1).toString());
                this.setState({
                    atTillAgeDisable: true,
                    endOfLifeHidden: true,
                });
                break;
            case 6:
                change('addGoalOrIncomeForm', 'atAge', '');
                this.setState({
                    endOfLifeHidden: true,
                    atTillAgeDisable: false,
                });
                break;
            default:
                this.setState({
                    atTillAgeDisable: false,
                    endOfLifeHidden: false,
                });
        }

    }

    handleSubmit = (value) => {
        const { hasErrors, goalCategories, userCurrentAge, goalId } = this.state;
        const { addUserGoalRequest, userInfo, goalTypes } = this.props;

        let haserror = this.handleErrorCheck(value);
        if (haserror === false) {
            let goalName = goalCategories.filter(x => x.Id == value.goalCategory);
            let goalType = goalTypes.filter(x => x.Id === goalName[0].GoalTypeId);
            let goalTypeId = goalType[0].Ref_Id === 1 ? 1 : goalType[0].Ref_Id == 2 ? 1 : 2
            this.setState({
                isLoading: true,
                clearDDValues: true
            });

            console.log(value.goalBucket);

            const saveUserGoal = new Promise((resolve, reject) =>
                addUserGoalRequest(
                    {
                        "UserId": userInfo.Id,
                        "GoalName": goalName[0].Ref_Id === 12 ? value.goalName : goalName[0].Name,
                        "GoalInflationRate": Number(value.goalInflationRate),
                        "GoalAmount": Number(value.goalAmount),
                        "GoalAmountType": true,
                        "EndOfLife": (value.endOfLife === undefined ? false : value.endOfLife),
                        "GoalPriority": Number(value.goalPriority),
                        "GoalStartAge": Number(value.atAge === undefined ? userCurrentAge : value.atAge),
                        "GoalEndAge": Number(value.tillAge === undefined ? 85 : value.tillAge),
                        "GoalBucketId": value.goalBucket,
                        "GoalCategoryId": value.goalCategory,
                        "GoalTypeId": goalName[0].GoalTypeId,
                        "GoalFrequencyId": value.goalFrequency,
                        "CreatedOn": moment().format(),
                        "UpdatedOn": moment().format()
                    },
                    { reject, resolve }
                )
            );
            saveUserGoal.then(() =>

                this.handleSaveGoalSuccess())
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

    handleSaveGoalSuccess = () => {
        const { getUserGoalRequest, userInfo, reset } = this.props;

        this.setState({
            isLoading: true,
            goalId: 0
        });
        const res = new Promise((resolve, reject) =>
            getUserGoalRequest({
                "user_id": userInfo.user,
            }, { reject, resolve }));

        res.then(this.handleGetSavedGoals());

    }

    handleGetSavedGoals = () => {

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
                this.componentDidMount();
            });



    }

    handleErrorCheck = (value) => {

        const { userCurrentAge, goalId } = this.state;
        const { savedGoals } = this.props;
        let goalNameUpdate = false;
        console.log(savedGoals);
        let ifCategoryExist = savedGoals !== undefined ? savedGoals.filter(x => x.GoalCategory === value.goalCategory) : [];

        if (goalId > 0) {
            let goalsExists = savedGoals.filter(x => x.id === goalId);
            if (goalsExists.length > 0 && goalsExists[0].GoalCategory !== value.goalCategory) {
                goalNameUpdate = true;
            }
        }

        let goalByBuckets = savedGoals !== undefined ? savedGoals.filter(x => x.GoalBucket__id === value.goalBucket) : [];

        let goalPriorityExist = savedGoals !== undefined ? goalByBuckets.filter(x => x.GoalPriority === value.goalPriority) : [];

        let haserrors = false;
        if (value.goalCategory === 1 || value.goalCategory === 2 || value.goalCategory === 3 || value.goalCategory === 4 || value.goalCategory === 6) {
            if (value.atAge <= (userCurrentAge)) {
                notify.show(`At age should  be greather than your current age`, 'error');
                haserrors = true;
            }
        }

        if (value.tillAge >= 100) {
            notify.show(`Till age should be lesser than 100`, 'error');
            haserrors = true;
        }
        if (goalId > 0 && goalNameUpdate === true) {
            if (ifCategoryExist.length > 0) {
                notify.show(`Goal category already exist in your Goal Lists`, 'error');
                haserrors = true;
            }

        } else {

            if (ifCategoryExist.length > 0 && goalId === 0) {
                notify.show(`Goal category already exist in your Goal Lists`, 'error');
                haserrors = true;
            }

        }



        if (goalPriorityExist.length > 0) {
            notify.show(`Goal Priority already exist in your Goal Bucket Lists`, 'error');
            haserrors = true;
        }

        if (haserrors === true) {

            this.setState({
                isLoading: false
            });
        }

        return haserrors;
    }

    handleasOfTarget = (value) => {
        this.setState({
            asOfTargetChecked: value,
            asOfTodayChecked: false
        });
    };

    handleasOfToday = (value) => {
        const { isAdhocGoal } = this.state;

        this.setState({
            asOfTodayChecked: value,
            asOfTargetChecked: false
        });
        if (isAdhocGoal === true) {

            if (this.state.asOfTodayChecked == true) {
                this.setState({
                    isInflectionRateHidden: !this.state.isInflectionRateHidden
                });
            } else {
                this.setState({
                    isInflectionRateHidden: !this.state.isInflectionRateHidden
                });
            }
        }



    };

    handleGoalType = (value) => {

        if (value === 3) {
            this.setState({
                atTillAgeDisable: true,
                endOfLifeHidden: true,
                isInflectionRateHidden: true,
                isAdhocGoal: true
            });
        } else {
            this.setState({
                isInflectionRateHidden: false,
                isAdhocGoal: false
            })
        }


    }

    handleCancelBtn = () => {
        const { reset, change } = this.props;

        //change('addGoalOrIncomeForm','goalPriority',goalPriorities[0].id);

        reset("addGoalOrIncomeForm");
        this.setState({
            onLoadform: false,
            endOfLifeChecked: false,
            asOfTodayChecked: false,
            asOfTargetChecked: false,
            clearDDValues: true
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
        this.setState({
            goalId: information.id
        });


        change(
            'addGoalOrIncomeForm',
            'goalAmount',
            information ? information.GoalAmount.toString() : null
        );
        change(
            'addGoalOrIncomeForm',
            'atAge',
            information ? information.GoalStartAge.toString() : null
        );
        change(
            'addGoalOrIncomeForm',
            'tillAge',
            information ? information.GoalEndAge.toString() : null
        );
        change(
            'addGoalOrIncomeForm',
            'goalPriority',
            information ? information.GoalPriority : null
        );
        change(
            'addGoalOrIncomeForm',
            'goalInflationRate',
            information ? information.GoalInflationRate.toString() : null
        );

        change(
            'addGoalOrIncomeForm',
            'goalBucket',
            information ? information.GoalBucketId : null
        );
        change(
            'addGoalOrIncomeForm',
            'goalFrequency',
            information ? information.GoalFrequencyId : null
        );
        change(
            'addGoalOrIncomeForm',
            'goalName',
            information ? information.GoalName : null
        );

        change(
            'addGoalOrIncomeForm',
            'goalInflationRate',
            information ? information.GoalInflationRate : null
        );

        change(
            'addGoalOrIncomeForm',
            'goalType',
            information ? information.GoalTypeId : null
        );

        change(
            'addGoalOrIncomeForm',
            'goalCategory',
            information ? information.GoalCategoryId : null
        );
      //  this.handleGoalName(information.GoalCategory);


        if (information.Name === "Others") {
            this.setState({
                isGoalNameFieldEnabled: true,
                atAgeDisabled: false,
                isInflectionRateHidden: true,
                isGoalNameFieldShow: true
            });
        }
     
        this.setState({
            endOfLifeChecked:information.EndOfLife===true?true:false,
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
        const { deleteGoalRequest, userInfo } = this.props;

        const res = new Promise((resolve, reject) =>
            deleteGoalRequest(
                {
                    uuid : information.Id,
                },
                { reject, resolve }
            )
        );
        res.then(() => {
            notify.hide();
            setTimeout(5000);
            notify.show('The Goal deleted successfully', 'error', 5000);
            this.handleSaveGoalSuccess();
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

        const { history, userInfo } = this.props;
        // if(userInfo.retirementStatus===1){
        //     history.push('/PreRetirementGoalPage');
        // }

        // if(userInfo.retirementStatus===2){
        //    history.push('/PostRetireeDashboardPage');
        // }
        history.push('/IncomeManagementPage');
    }

    handleEndOfLifeHidden = (value) => {
        const { change } = this.props;

        if (value == true) {
            change('addGoalOrIncomeForm', 'tillAge', '85');
        } else {
            change('addGoalOrIncomeForm', 'tillAge', '');
        }
    }

    handleExit = () => {

        const { history } = this.props;
        history.push("/productHomePage");
    }

    render() {
        const {
            hasErrors,
            isInitialLoading,
            isLoading,
            isGoalNameFieldEnabled,
            selectedValue,
            asOfTargetChecked,
            asOfTodayChecked,
            atAgeDisabled,
            endOfLifeChecked,
            endOfLifeHidden,
            isAsTodayTargetHidden,
            atTillAgeDisable,
            isInflectionRateHidden,
            userCurrentAge,
            goalCategories,
            goalBuckets,
            goalTypes,
            goalFrequencies,
            gaolLists,
            onLoadform,
            clearDDValues

        } = this.state;

        const { savedGoals,goalCategory } = this.props;
        gaolLists.sort(function (a, b) { return a.GoalPriority - b.GoalPriority });

        return (
            <div className={styles.container} id="Skip-content">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Goal Management</title>
                </Helmet>
                {isInitialLoading ? (
                    <Spinner className={styles.spinner} />
                ) : (
                    <div className={cn(styles.subContainer)} name={'Heading'}>
                        <h1 className={styles.heroText}>Goals Management</h1>
                        <div className={styles.heroSubText}>
                            This page allows you to View, Add, and Edit your Goals.
                        </div>
                        <h2 className={styles.textLight}>Saved Goals</h2>
                        {gaolLists.length === 0 ? (
                            <div className={styles.subContainer2}>
                                <div className={styles.heroSubText}>
                                    No Goals Found. Please create Goals.
                                </div>
                            </div>
                        ) : (

                            <div className={styles.subContainer2}>
                                {gaolLists.filter(x => x.GoalBucketId === "924d8165-8a4a-4620-9548-c2077db0670f").length > 0 ? (<div className={styles.subGoalTextHeader}>
                                    <h2 className={styles.goalText}>Need Goals</h2>
                                </div>) : null}
                                <div className={styles.subContainer2}>
                                    {gaolLists.filter(x => x.GoalBucketId === "924d8165-8a4a-4620-9548-c2077db0670f").map((beneficiary, index) => (
                                        <SavedGoalsCard
                                            key={`SD_${index}`}
                                            handleDeleteSuccess={this.handleDeleteConfirm}
                                            handleEditSuccess={this.handleEditSuccess}
                                            information={beneficiary}
                                            type="Beneficiary"
                                            goalCategories={goalCategories}
                                        />
                                    ))}
                                </div>
                                {gaolLists.filter(x => x.GoalBucket__Name === "Wants").length > 0 ? (<div className={styles.subGoalTextHeader}>
                                    <h2 className={styles.goalText}>Wants Goals</h2>
                                </div>) : null}
                                <div className={styles.subContainer2}>
                                    {gaolLists.filter(x => x.GoalBucket__Name === "Wants").map((beneficiary, index) => (
                                        <SavedGoalsCard
                                            key={`SD_${index}`}
                                            handleDeleteSuccess={this.handleDeleteConfirm}
                                            handleEditSuccess={this.handleEditSuccess}
                                            information={beneficiary}
                                            type="Beneficiary"
                                        />
                                    ))}
                                </div>
                                {gaolLists.filter(x => x.GoalBucket__Name === "Desire").length > 0 ? (<div className={styles.subGoalTextHeader}>
                                    <h2 className={styles.goalText}>Desire Goals</h2>
                                </div>) : null}
                                <div className={styles.subContainer2}>
                                    {gaolLists.filter(x => x.GoalBucket__Name === "Desire").map((beneficiary, index) => (
                                        <SavedGoalsCard
                                            key={`SD_${index}`}
                                            handleDeleteSuccess={this.handleDeleteConfirm}
                                            handleEditSuccess={this.handleEditSuccess}
                                            information={beneficiary}
                                            type="Beneficiary"
                                        />
                                    ))}
                                </div>

                            </div>
                        )}
                        <div className={styles.subContainer} name="addGoalForm">
                            <AddGoalOrIncomeForm
                                goalCategory={goalCategories}
                                goalBuckets={goalBuckets}
                                handleGoalName={this.handleGoalName}
                                handleasOfTarget={this.handleasOfTarget}
                                handleasOfToday={this.handleasOfToday}
                                isGoalNameFieldShow={isGoalNameFieldEnabled}
                                goalTypes={goalTypes}
                                asOfTargetChecked={asOfTargetChecked}
                                asOfTodayChecked={asOfTodayChecked}
                                goalPriorities={goalPriorities}
                                endOfLifeChecked={endOfLifeChecked}
                                endOfLifeHidden={endOfLifeHidden}
                                isAsTodayTargetHidden={isAsTodayTargetHidden}
                                // disabledCancelBtn={}
                                atAgeDisabled={atAgeDisabled}
                                atTillAgeDisable={atTillAgeDisable}
                                formType="Goal"
                                frequencyTypes={goalFrequencies}
                                loading={isLoading}
                                onLoadform={onLoadform}
                                onSubmit={this.handleSubmit}
                                onLoad={this.handleLoad}
                                handleGoalType={this.handleGoalType}
                                handleCancelBtn={this.handleCancelBtn}
                                // phoneTypes={}
                                submitting={isLoading}
                                // uniqueKey={uniqueKey}
                                selectedValue={selectedValue}
                                isInflectionRateHidden={isInflectionRateHidden}
                                handleTextBox={this.handleTextBox}
                                userCurrentAge={userCurrentAge}
                                handleEndOfLifeHidden={this.handleEndOfLifeHidden}
                                clearDDValues={clearDDValues}
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
                                <span>Add Income Details</span>
                            </Button>
                        </div>


                    </div>

                )}



            </div>)
    }
}

// demo

GoalManagementPage.propTypes = {
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
    getGoalCategoryRequest: PropTypes.func.isRequired,
    getGoalBucketRequest: PropTypes.func.isRequired,
    getGoalTypeRequest: PropTypes.func.isRequired,
    getUserGoalRequest: PropTypes.func.isRequired,
    addUserGoalRequest: PropTypes.func.isRequired,
    deleteGoalRequest: PropTypes.func.isRequired,
    getGoalRateRequest: PropTypes.func.isRequired
};

GoalManagementPage.defaultProps = {

};

const mapStateToProps = state => ({
    goalCategories: state.goalManagement.goalCategories,
    goalTypes: state.goalManagement.goalTypes,
    goalFrequencies: state.goalManagement.goalFrequencies,
    goalBuckets: state.goalManagement.goalBuckets,
    incomeTypes: state.goalManagement.incomeTypes,
    userInfo: state.userManagement.userInfo,
    savedGoals: state.goalManagement.savedUserGoals,
    isAuthenticated: state.header.isAuthenticated,
    goalRates: state.goalManagement.goalRates
});

const mapDispatchToProps = {
    change,
    reset,
    getGoalTypeRequest,
    getGoalBucketRequest,
    getGoalCategoryRequest,
    getGoalFrequencyRequest,
    getUserGoalRequest,
    addUserGoalRequest,
    deleteGoalRequest,
    getGoalRateRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(GoalManagementPage);
