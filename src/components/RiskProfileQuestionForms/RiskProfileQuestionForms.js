import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Form, reduxForm, Field } from 'redux-form';
import {
  required,
} from '../../utilities/validations';
import { InputText } from '../InputText/InputText';
import styles from './RiskProfileQuestionForms.module.scss';
import InputWrapper from '../InputWrapper/InputWrapper';
import Button from '../Button/Button';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import { set } from 'lodash';
import moment from 'moment';



const RiskProfileQuestionForms = ({
  handleCSISuccess,
  handleSubmit,
  submitting,
  loading,
  highContrast,
  handlePreviousSubmit,
  questionLists,
  riskProfileScoreUserAnswers,
  updateAnswers,
  userId,
  updateMainQuestions
//   handleChangeComplete,
//   handleChange,
//   handleChangeStart,
//   value,

}) => {

  const textStyle = highContrast ? styles.lightText : null;
  
  let [value,setValue] = useState(10);

  const handleChangeStart = () => {
    console.log('Change event started')
  };

 const handleChange = value => {
    setValue(value);
  };

  const handleChangeComplete = () => {
    console.log('Change event completed')
  };

  const isSelectedValue=()=>{
    riskProfileScoreUserAnswers.filter(x=>x.selectedValue)
  }

  const buildRadioButtons = (choices,questionId)=> {
    return choices.map((choice, i) => {
      const selectedValue = riskProfileScoreUserAnswers.find(x=>x.ChoiceId===choice.Id);
      return (
        <div className={styles.radioContainerOuter} key={i}>
          <input 
          key={i}
          type="radio"
          name={questionId}
          value={choice.Value}
          onChange={(e,questionId)=>onInput(e,questionId)}
          required={true}
          checked={selectedValue}
          className ={styles.radioContainer }
       />          
        <label className={styles.choices}>{choice.Text}</label>
      </div>
     )
  })
 }

 const onInput = (e,choice) => {
  const id = parseInt(e.target.name);
   
   let answer = questionLists.Choices.filter(x=>x.Value==parseInt(e.target.value))[0];

   var userAnswer = {
    "QuestionId": questionLists.Id,
    "UserId": userId,
    "ChoiceId": answer.Id,
    "SelectedValue": answer.Value,
    "UserText": "",
    "ModuleType": 2,
    "ChoiceSequence":answer.ChoiceSequence,
    "CreatedOn": moment().format(),
    "UpdatedOn": moment().format()
  }
 
  updateMainQuestions(answer.choiceId,questionLists.Ref_Id);
  if(riskProfileScoreUserAnswers.length==0){
    //riskProfileScoreUserAnswers.push(userAnswer);
    updateAnswers(userAnswer);
  }
  else{
  if (riskProfileScoreUserAnswers.some(answer => answer.questionId === id)) {
    //riskProfileScoreUserAnswers = [...riskProfileScoreUserAnswers.filter(answer => answer.questionId !== id), userAnswer];
    updateAnswers(userAnswer);
  } else {
    //riskProfileScoreUserAnswers = [...riskProfileScoreUserAnswers, userAnswer];
    updateAnswers(userAnswer);
  }
  //updateAnswers(riskProfileScoreUserAnswers);
}
}

  return (
    <Form
      className={styles.formStyle}
      name="RiskProfileQuestionForms"
      onLoad={handleCSISuccess}
      onSubmit={handleSubmit}
    >
      
      <div className={styles.container}>

      <h2 className={cn(styles.lightText, styles.positioningClass)}>
        <span className={styles.labelHeading}>Question  {questionLists.Ref_Id}/13</span>
      </h2>
      <h2 className={cn(styles.lightText, styles.positioningClass)}>
        <span className={styles.labelHeading}>{questionLists.QuestionTitle}</span>

      </h2>
     
     
       <h2 className={cn(textStyle, styles.heading)}>{questionLists.Description}
      </h2>
       
      {questionLists && questionLists.Choices && questionLists.Choices.length>0 ? 
      buildRadioButtons(questionLists.Choices,questionLists.Ref_Id):""}
      </div>
  

      <div className = {styles.buttonsdisplay}>
      <div
          className={cn(styles.prevBtn)}
          onClick = {()=>handlePreviousSubmit(questionLists.PreviousQuestionId)}
          onKeyPress = {()=>handlePreviousSubmit(questionLists.PreviousQuestionId)}
          role="button"
        >
          <span>{'previous'}</span>
        </div>
        <Button
          className={cn(styles.next)}
          disabled={submitting || loading}
          submitting={submitting || loading}
          type="submit"
        >
          <span>Next</span>
        </Button>
      </div>
    </Form>
  );
};

RiskProfileQuestionForms.propTypes = {
  accountInformation: PropTypes.bool.isRequired,
  genderTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleCSISuccess: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  highContrast: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  RetireTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  maritalStatus : PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  submitting: PropTypes.bool.isRequired,
  prevousButtonClicked:PropTypes.bool.isRequired,
  handlePreviousSubmit: PropTypes.func.isRequired,
  questionLists: PropTypes.shape({
    Id:PropTypes.number.isRequired,
    Description:PropTypes.string.isRequired,
    PreviousQuestionId:PropTypes.number.isRequired,
    QuestionTitle:PropTypes.string.isRequired,
    Choices: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    Ref_Id:PropTypes.number.isRequired
  }).isRequired,
  handleChangeComplete: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleChangeStart:PropTypes.func.isRequired,
  value:PropTypes.number.isRequired,
  riskProfileScoreUserAnswers:PropTypes.arrayOf(PropTypes.shape({})),
  userId:PropTypes.number.isRequired,
  updateMainQuestions: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'RiskProfileQuestionForms',
})(RiskProfileQuestionForms);
