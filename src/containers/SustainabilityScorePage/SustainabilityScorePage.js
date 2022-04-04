import cn from 'classnames';
import { change, reset } from 'redux-form';
import PropTypes, { object } from 'prop-types';
//import moment from 'moment';
import qs from 'query-string';
import React, { Component } from 'react';
import { notify } from 'react-notify-toast';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { setAuthStatus, setUserName } from '../../actions/Header';
import Spinner from '../../components/Spinner/Spinner';
import styles from './SustainabilityScorePage.module.scss';
import SustainablityScoreQuestionForms from '../../components/SustainablityScoreQuestionForms/SustainablityScoreQuestionForms';
import { getRRScoreQuestionsRequest, saveRRScoreQuestionReducer,saveRRScoreAnswersRequest,clearRRAcoreAnswers,saveSSScoreQuestionReducer } from '../../actions/RRScore';
import { updateUser } from '../../actions/UserManagement';
import { ModuleType,Status } from '../../enums/enumHelper';

class SustainabilityScorePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isQuestionStatred: false,
      prevousButtonClicked: false,
      questionId: 0,
      questions: {},
      userAnswers: [],
    };
  }

  componentDidMount() {
    const { getRRScoreQuestionsRequest,history,isAuthenticated,clearRRAcoreAnswers,updateUser } = this.props;
    
     clearRRAcoreAnswers();
     
    if (!isAuthenticated) {
      history.push(`/`);
    }
    this.setState({
      isLoading: true
    });
    const res = new Promise((resolve, reject) =>
      getRRScoreQuestionsRequest(
        {moduleType:3},
        { reject, resolve })
    );
    res.then(() => {
      this.handleSubmitSuccess();
      updateUser({
        moduleType:ModuleType.SustainabilityScore,
        status: Status.YetToStart
      });
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

  handleSubmitSuccess = () => {
    const { rrScoreQuestions } = this.props;
    this.setState({
      isQuestionStatred: false,
      prevousButtonClicked: false,
      showRetirementReadinessScore: false,
      questionId: 20,
      questions: rrScoreQuestions.filter(x => x.questionId === 20),
      isLoading:false,
    });
  }

  handlePreviousSubmit = (value) => {

    const { rrScoreQuestions, change,rrScoreUserAnswers } = this.props;
    const { questionId } = this.state;
    this.setState({
      questionId: value,
      isQuestionStatred: value > 0 ? true : false,
      questions: rrScoreQuestions.filter(x => x.questionId === value)
    });
    const userAnswered = rrScoreUserAnswers.filter(x=>x.questionId === value);
     this.formOnLoad(userAnswered[0].userText ,userAnswered[0].questionId)
   

    if (value == 19) {
      this.componentDidMount();
    }
  }

  handleSubmit = (values) => {


    const { reset,  rrScoreQuestions, rrScoreUserAnswers, saveRRScoreQuestionReducer,userInfo } = this.props;
    
  
    var userAnswers = new Array();
    userAnswers = [...rrScoreUserAnswers];
    let userInput = (values.questionAnswer === undefined ? 0 : values.questionAnswer);
    if (this.state.questionId <=23) {

      var userAnswer = {
        "questionId": this.state.questionId,
        "userId": userInfo.id,
        "choiceId": null,
        "selectedValue": 0,
        "userText":  userInput,
        "moduleType": 3
      }

      let isFound = userAnswers.findIndex((x=>x.questionId===this.state.questionId))
     
      if(isFound!==-1){
        change(
          "QuestionForms",
          "questionAnswer",
          userAnswers[isFound].questionId>19 ? userAnswers[isFound].userText : null
        );
        userAnswers[isFound].userText = userAnswer.userText;
      }else{
        userAnswers.push(userAnswer);
      }

      saveRRScoreQuestionReducer(userAnswers);

      updateUser({
        moduleType:ModuleType.SustainabilityScore,
        status: Status.Pending
      });
      this.setState({
        isQuestionStatred: true,
        questionId: this.state.questionId + 1,
        questions: rrScoreQuestions.filter(x => x.questionId === this.state.questionId + 1),
      });
      let isFoundAgain = userAnswers.findIndex((x=>x.questionId===this.state.questionId + 1))

     if(isFoundAgain!==-1){
       reset("SustainablityScoreQuestionForms");
       this.formOnLoad(userAnswers[isFoundAgain].userText,this.state.questionId + 1)
     }else{
      reset("SustainablityScoreQuestionForms");
     }

   
      if (this.state.questionId === 23) {
       
          this.handleSaveAnswers(userAnswers);
      }
    
    }
  };

  formOnLoad = (userText,questionId) =>{
    const {change} = this.props;
    change(
      "SustainablityScoreQuestionForms",
      "questionAnswer",
      questionId? userText : null
    );
  }

  handleSaveAnswers = (userAnswers) =>{

    const {saveRRScoreAnswersRequest,saveSSScoreQuestionReducer} = this.props
    saveSSScoreQuestionReducer(userAnswers);
    this.setState({
      isLoading: true,
    });

   
    const res = new Promise((resolve, reject) =>
      saveRRScoreAnswersRequest(
        {
          "userAnswered":userAnswers
        },
        { reject, resolve }
      ));
      res.then(() => this.handleSubmitUserAnswerSuccess());
      res.catch(error => {
          alert(error);
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
  handleSubmitUserAnswerSuccess=()=>{
    const {history,clearRRAcoreAnswers} = this.props;
    clearRRAcoreAnswers();
    updateUser({
      moduleType:ModuleType.SustainabilityScore,
      status: Status.Completed
    });
    history.push('/SustainabilityScoreSummaryPage');
  }


  render() {
    const { isQuestionStatred, questions, isLoading } = this.state;
    const { rrScoreQuestions } = this.props
    return (
      <div className={cn(styles.container)} >
        <Helmet>
          <meta charSet="utf-8" />
          <title>Retirement Readiness Score</title>
        </Helmet>
        {isLoading === true ? (<Spinner />) : (
        <div className={styles.heading} name="maindiv">
          {(isQuestionStatred === false) ? (<div className={styles.overlayBlock}>
            <h1 className={styles.heroText}>
            Sustainability Score
            </h1>
            <h2 className={styles.heroSubText}>
              Sustainability Score is the state and degree of being ready for retirement.<br />
              The sustainability ratings are based on two components: company-level ESG scores developed by Sustainalytics and ESG controversies.<br />
              Give us few information on your income and will let you know where you stand retirement.
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
            {(questions.map((question, index) => (
              <SustainablityScoreQuestionForms
                onSubmit={this.handleSubmit}
                handlePreviousSubmit={this.handlePreviousSubmit}
                questionLists={question}
                handleChange={this.handleChange}
                questionsLength={rrScoreQuestions.length}
                formOnLoad={this.formOnLoad}
              />
            )))}

          </div>)}
        </div>)}
      </div>
    );
  }
}


SustainabilityScorePage.protoTypes = {

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
  getRRScoreQuestionsRequest: PropTypes.func.isRequired,
  rrScoreQuestions: PropTypes.arrayOf(PropTypes.shape({})),
  saveRRScoreQuestionReducer: PropTypes.func.isRequired,
  rrScoreUserAnswers: PropTypes.arrayOf(PropTypes.shape({})),
  saveRRScoreAnswersRequest: PropTypes.func.isRequired,
  updateUser : PropTypes.func.isRequired
};


SustainabilityScorePage.defaultProps = {};
const mapStateToProps = state => ({
  rrScoreQuestions: state.rrScore.rrScoreQuestions,
  getCustomerRRScoreRequest: PropTypes.func.isRequired,
  saveRRScoreQuestionReducer: PropTypes.func.isRequired,
  rrScoreUserAnswers: state.rrScore.rrScoreUserAnswers,
  isAuthenticated: state.header.isAuthenticated,
  saveRRScoreAnswersRequest: PropTypes.func.isRequired,
  userInfo:state.userManagement.userInfo,
});

const mapDispatchToProps = {
  change,
  reset,
  setAuthStatus,
  setUserName,
  getRRScoreQuestionsRequest,
  saveRRScoreQuestionReducer,
  saveRRScoreAnswersRequest,
  clearRRAcoreAnswers,
  saveSSScoreQuestionReducer,
  updateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(SustainabilityScorePage);
