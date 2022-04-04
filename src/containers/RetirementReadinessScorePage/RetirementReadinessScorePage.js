import cn from 'classnames';
import { change, reset } from 'redux-form';
import PropTypes, { element, object } from 'prop-types';
//import moment from 'moment';
import qs from 'query-string';
import React, { Component } from 'react';
import { notify } from 'react-notify-toast';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { setAuthStatus, setUserName } from '../../actions/Header';
import Spinner from '../../components/Spinner/Spinner';
import styles from './RetirementReadinessScorePage.module.scss';
import QuestionForms from '../../components/QuestionForms/QuestionForms';
import { getRRScoreQuestionsRequest, saveRRScoreQuestionReducer,saveRRScoreAnswersRequest,clearRRAcoreAnswers } from '../../actions/RRScore';
import { updateUser } from '../../actions/UserManagement';
import { ModuleType,Status } from '../../enums/enumHelper';
import moment from 'moment';


class RetirementReadinessScorePage extends Component {
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
        {module_Type:1},
        { reject, resolve })
    );
    res.then(() => {
      this.handleSubmitSuccess();
      updateUser({
        moduleType:ModuleType.RRScore,
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
      questionId: 14,
      questions: rrScoreQuestions.filter(x => x.Ref_Id === 14),
      isLoading:false,
    });
  }

  handlePreviousSubmit = (value) => {
   console.log(value);
    const { rrScoreQuestions, change,rrScoreUserAnswers } = this.props;
    const { questionId } = this.state;
    this.setState({
      questionId: value,
      isQuestionStatred: value > 0 ? true : false,
      questions: rrScoreQuestions.filter(x => x.Ref_Id === value)
    });
    const userAnswered = rrScoreUserAnswers.filter(x=>x.questionId === value);
     this.formOnLoad(userAnswered[0].userText ,userAnswered[0].questionId)
    // change(
    //   "QuestionForms",
    //   "questionAnswer",
    //   value>13 ? userAnswered[0].userText : null
    // );

    if (value == 13) {
      this.componentDidMount();
    }
  }

  handleSubmit = (values) => {
   

    const { reset,  rrScoreQuestions, rrScoreUserAnswers, saveRRScoreQuestionReducer,userInfo } = this.props;
    
  
    var userAnswers = new Array();
    userAnswers = [...rrScoreUserAnswers];
    let userInput = (values.questionAnswer === undefined ? 0 : values.questionAnswer);
    if (this.state.questionId <= 19) {

      var userAnswer = {
        "QuestionId": this.state.questionId,
        "UserId": userInfo.id,
        "ChoiceId": null,
        "SelectedValue": 0,
        "UserText": (this.state.questionId !== 19 ? userInput : sessionStorage.getItem("slider")),
        "ModuleType": 1,
        "ChoiceSequence":0,
        "CreatedOn": new Date(),
        "UpdatedOn" : new Date()
      }

      let isFound = userAnswers.findIndex((x=>x.questionId===this.state.questionId))
     
      if(isFound!==-1){
        change(
          "QuestionForms",
          "questionAnswer",
          userAnswers[isFound].QuestionId>13 ? userAnswers[isFound].UserText : null
        );
        userAnswers[isFound].UserText = userAnswer.UserText;
      }else{
        userAnswers.push(userAnswer);
      }

      saveRRScoreQuestionReducer(userAnswers);

      updateUser({
        moduleType:ModuleType.RRScore,
        status: Status.Pending
      });
      this.setState({
        isQuestionStatred: true,
        questionId: this.state.questionId + 1,
        questions: rrScoreQuestions.filter(x => x.Ref_Id === this.state.questionId + 1),
      });
      let isFoundAgain = userAnswers.findIndex((x=>x.QuestionId===this.state.questionId + 1))

     if(isFoundAgain!==-1){
       reset("QuestionForms");
       this.formOnLoad(userAnswers[isFoundAgain].UserText,this.state.questionId + 1)
     }else{
      reset("QuestionForms");
     }

    
      if (this.state.questionId === 19) {
          this.handleSaveAnswers(userAnswers);
      }
    
    }
  };

  formOnLoad = (userText,questionId) =>{
    const {change} = this.props;
    change(
      "QuestionForms",
      "questionAnswer",
      questionId>13 ? userText : null
    );
  }

  handleSaveAnswers = (userAnswers) =>{

    const {saveRRScoreAnswersRequest,rrScoreUserAnswers} = this.props

    this.setState({
      isLoading: true,
    });

   var finalAnswers = this.handleReplaceQuestion(userAnswers)
    const res = new Promise((resolve, reject) =>
      saveRRScoreAnswersRequest(
        {
          finalAnswers
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

  handleReplaceQuestion = (userAnswers) => {
    const { userInfo} = this.props;
    let updatedAnswers = {};
    var userFinalAnswers = new Array();

    const {rrScoreQuestions} = this.props;
    

    userAnswers.forEach(element => {
      
      var questionIdName =  rrScoreQuestions.filter(x=>x.Ref_Id==element.QuestionId).map(function(a) {return a.Id})
      updatedAnswers = {

        "QuestionId": questionIdName[0],
        "UserId": userInfo.Id,
        "ChoiceId": 0,
        "SelectedValue": 0,
        "UserText": element.UserText,
        "ModuleType": 1,
        "ChoiceSequence":0,
        "CreatedOn": new Date(),
        "UpdatedOn" : new Date()

      }
      userFinalAnswers.push(updatedAnswers);
    });
     return userFinalAnswers;

  }
  handleSubmitUserAnswerSuccess=()=>{
    const {history,clearRRAcoreAnswers,updateUser} = this.props;
   
    updateUser({
      moduleType:ModuleType.RRScore,
      status: Status.Completed
    });

    clearRRAcoreAnswers();
    history.push('/RetirementReadinessScoreSummaryPage');
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
              Retirement Readiness Score.
            </h1>
            <h2 className={styles.heroSubText}>
              Retirement readiness is the state and degree of being ready for retirement.<br />
              Readiness requires discipline, clearly defined goals, and plans.<br />
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
              <QuestionForms
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


RetirementReadinessScorePage.protoTypes = {

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


RetirementReadinessScorePage.defaultProps = {};
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
  updateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(RetirementReadinessScorePage);
