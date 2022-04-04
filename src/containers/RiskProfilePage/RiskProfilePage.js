import cn from 'classnames';
import { change, reset } from 'redux-form';
import PropTypes from 'prop-types';
//import moment from 'moment';
import qs from 'query-string';
import React, { Component } from 'react';
//import {notify} from 'react-notify-toast';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { setAuthStatus, setUserName } from '../../actions/Header';
import Spinner from '../../components/Spinner/Spinner';
import styles from './RiskProfilePage.module.scss';
import RiskProfileQuestionForms from '../../components/RiskProfileQuestionForms/RiskProfileQuestionForms';
import { getRiskProfileScoreQuestionsRequest, saveRiskProfileScoreQuestionReducer, saveRiskProfileAnswersRequest, updateQuestions, clearAnswers } from '../../actions/RiskProfileScore';
import { notify } from 'react-notify-toast';
import { updateUser } from '../../actions/UserManagement';
import { ModuleType,Status } from '../../enums/enumHelper';

class RiskProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isQuestionStatred: false,
      prevousButtonClicked: false,
      questionId: 0,
      questions: {},
      value: 10,
      isLoading: false,
      showNextButton: false,
    };
  }

  componentDidMount() {
    const { getRiskProfileScoreQuestionsRequest, clearAnswers,isAuthenticated, history } = this.props;

    if (!isAuthenticated) {
      history.push(`/`);
    } else {

      clearAnswers();
      this.setState({
        isLoading: true
      });

      const payload = {
        module_Type: 2
      }
      const res = new Promise((resolve, reject) =>
        getRiskProfileScoreQuestionsRequest(payload, { reject, resolve })
      );
      res.then(() => {
        this.loadQuestionsSuccess();
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
    }
  }

  loadQuestionsSuccess = () => {

    const { riskProfileScoreQuestions,updateUser } = this.props;
    updateUser({
      moduleType:ModuleType.RiskProfile,
      status: Status.YetToStart
    })
    this.setState({
      isQuestionStatred: false,
      prevousButtonClicked: false,
      showRetirementReadinessScore: false,
      questionId: 1,
      questions: riskProfileScoreQuestions.find(x => x.Ref_Id == 1),
      isLoading: false,
    });
  }



  handlePreviousSubmit = (value) => {
    // const {reset} = this.props;
    const { riskProfileScoreQuestions } = this.props;
    const { questionId } = this.state;
    this.setState({
      questionId: value,
      isQuestionStatred: value > 0 ? true : false,
      questions: riskProfileScoreQuestions.sort((a,b)=>a.Ref_Id-b.Ref_Id).find(x => x.Ref_Id === value)
    });

    if (value == 0) {
      this.componentDidMount();
    }
    // reset("QuestionForms");
  }

  updateAnswers = (payload) => {
    const { saveRiskProfileScoreQuestionReducer, riskProfileScoreUserAnswers,updateUser } = this.props;

    let answers = new Array();
    answers = [...riskProfileScoreUserAnswers];

    let index = answers.findIndex(x => x.Ref_Id === payload.questionId);

    updateUser({
      moduleType:ModuleType.RiskProfile,
      status: Status.Pending
    })
    if (index > 0) {
      answers[index].selectedValue = payload.selectedValue;
    }
    else {
      answers.push(payload);
    }
    // Modify object property

    saveRiskProfileScoreQuestionReducer(answers);


  }

  handleSubmit = (e) => {
    //eslint-disable-line

    const { riskProfileScoreQuestions, riskProfileScoreUserAnswers } = this.props;
    let nextquestions = riskProfileScoreQuestions.filter(x => x.Ref_Id === this.state.questionId + 1);

    
    //this.updateAnswers(riskProfileScoreUserAnswers);
    reset("RiskProfileQuestionForms");
    if (nextquestions.length === 0) {
      this.saveAnswers();
    }
    else {

      const { reset } = this.props;
      this.setState({
        isQuestionStatred: true,
        questionId: this.state.questionId + 1,
        questions: riskProfileScoreQuestions.find(x => x.Ref_Id === this.state.questionId + 1)
      });

    }
  };

  saveAnswers = () => {
    const { riskProfileScoreUserAnswers, saveRiskProfileAnswersRequest, clearAnswers } = this.props;
    const { saveRiskProfileScoreQuestionReducer } = this.props;
    var data = riskProfileScoreUserAnswers[0]
    const payload = {
      riskProfileScoreUserAnswers
    }
    this.setState({isLoading:true})
    const res = new Promise((resolve, reject) =>
      saveRiskProfileAnswersRequest(data, { reject, resolve })
    );
    res.then(() => {
      clearAnswers();

      updateUser({
        moduleType:ModuleType.RiskProfile,
        status: Status.Completed
      })

      this.navigateToSummary();
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
  }

  navigateToSummary = (questionId) => {
    const { history } = this.props;
    this.setState({isLoading:false});
    history.push('/RiskProfileSummaryPage');
  }

  updateMainQuestions = (choiceId, questionId) => {
    const { riskProfileScoreQuestions, updateQuestions } = this.props;

    let questions = new Array();
    questions = [...riskProfileScoreQuestions];

    let question = questions.filter(x => x.Ref_Id === questionId)[0];

    let choiceIndex = question.Choices.findIndex((x => x.Id === choiceId));

    if (choiceIndex !== -1) {
      question.Choices[choiceIndex].selected = true;
      updateQuestions(questions);
    }
  }



  render() {
    const { isQuestionStatred, questions, value, isLoading, showNextButton,questionId } = this.state;

    const { riskProfileScoreUserAnswers, userInfo,riskProfileScoreQuestions } = this.props;

   
  
    return (
      <div className={cn(styles.container)} >
        <Helmet>
          <meta charSet="utf-8" />
          <title>Risk Profile Score</title>
        </Helmet>
        {isLoading === true ? (<Spinner />) : (
          <div className={styles.heading} name="maindiv">
            {isQuestionStatred == false ? (<div className={styles.overlayBlock}>
              <h1 className={styles.heroText}>
                Risk Profile Score.
              </h1>
              <h2 className={styles.heroSubText}>
                A risk profile is an <strong>evaluation of an individual's willingness and ability to take risks</strong>. A risk profile is important for determining a proper investment asset allocation for a portfolio. Organizations use a risk profile as a way to mitigate potential risks and threats.
              </h2>
              <div className={styles.linkFlex}>
                <p
                  className={styles.downloadLink}
                  onClick={() => this.setState({ isQuestionStatred: !isQuestionStatred })}
                >
                  <Link>Continue</Link>
                </p>
              </div>
            </div>) : (<div className={styles.heading}>
              {/* {(questions.map((question, index) => ( */}
                <RiskProfileQuestionForms
                  onSubmit={this.handleSubmit}
                  handlePreviousSubmit={this.handlePreviousSubmit}
                  questionLists={questions}
                  handleChange={this.handleChange}
                  handleChangeComplete={this.handleChangeComplete}
                  handleChangeStart={this.handleChangeStart}
                  value={value}
                  riskProfileScoreUserAnswers={riskProfileScoreUserAnswers}
                  updateAnswers={this.updateAnswers}
                  userId={userInfo.Id}
                  updateMainQuestions={this.updateMainQuestions}
                  loading = {isLoading}
                />
              {/* )))} */}

            </div>)}



          </div>)}
        {showNextButton ? <button type="button"  onClick={() => this.navigateToSummary()}>Next</button> : ""}

      </div>

    );
  }
}


RiskProfilePage.protoTypes = {

  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string,
    }),
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string,
  }).isRequired,
  setAuthStatus: PropTypes.func.isRequired,
  getRiskProfileScoreQuestionsRequest: PropTypes.func.isRequired,
  riskProfileScoreQuestions: PropTypes.arrayOf(PropTypes.shape({})),
  saveRiskProfileScoreQuestionReducer: PropTypes.func.isRequired,
  riskProfileScoreUserAnswers: PropTypes.arrayOf(PropTypes.shape({})),
  saveRiskProfileAnswersRequest: PropTypes.func.isRequired,
  updateQuestions: PropTypes.func.isRequired,
  clearAnswers: PropTypes.func.isRequired,
  updateUser : PropTypes.func.isRequired
};


RiskProfilePage.defaultProps = {};
const mapStateToProps = state => ({
  riskProfileScoreQuestions: state.riskProfileScore.riskProfileScoreQuestions,
  getCustomerRiskProfileScoreRequest: PropTypes.func.isRequired,
  saveRiskProfileScoreQuestionReducer: PropTypes.func.isRequired,
  riskProfileScoreUserAnswers: state.riskProfileScore.riskProfileScoreUserAnswers,
  saveRiskProfileAnswersRequest: PropTypes.func.isRequired,
  userInfo: state.userManagement.userInfo,
  clearAnswers: PropTypes.func.isRequired,
  userInfo: state.userManagement.userInfo,
  isAuthenticated: state.header.isAuthenticated,
});

const mapDispatchToProps = {
  change,
  reset,
  setAuthStatus,
  setUserName,
  getRiskProfileScoreQuestionsRequest,
  saveRiskProfileScoreQuestionReducer,
  saveRiskProfileAnswersRequest,
  updateQuestions,
  clearAnswers,
  updateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(RiskProfilePage);
