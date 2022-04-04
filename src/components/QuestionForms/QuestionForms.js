import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Form, reduxForm, Field } from 'redux-form';
import {
  required,validateNumbers
} from '../../utilities/validations';
import { InputText } from '../InputText/InputText';
import styles from './QuestionForms.module.scss';
import InputWrapper from '../InputWrapper/InputWrapper';
import Button from '../Button/Button';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import { set } from 'lodash';
import { numberToPercentageString } from '../../utilities/helpers';



const QuestionForms = ({
  handleCSISuccess,
  handleSubmit,
  submitting,
  loading,
  highContrast,
  handlePreviousSubmit,
  questionLists,
  handleChangeComplete,
  formOnLoad,
  questionsLength,
//   handleChange,
//   handleChangeStart,
//   value,

}) => {

  const textStyle = highContrast ? styles.lightText : null;
  let setValues = "";
  let [value,setValue] = useState(0);

  // const handleChangeStart = () => {
  //   console.log('Change event started')
  // };

 const handleChange = value => {
    setValue(value);
    sessionStorage.setItem("slider",value);
  };



  return (
    <Form
      className={styles.formStyle}
      name="QuestionForms"
      onLoad={formOnLoad}
      onSubmit={handleSubmit}
    >
      
      <div className={styles.container}>

      <h2 className={cn(styles.lightText, styles.positioningClass)}>
        <span className={styles.labelHeading}>Question  {questionLists.QuestionSequence}/{questionsLength}</span>
      </h2>
      <h2 className={cn(styles.lightText, styles.positioningClass)}>
        <span className={styles.labelHeading}>{questionLists.QuestionTitle}</span>
      </h2>
     
      {questionLists.Ref_Id===24?(
        <h2 className={cn(textStyle, styles.heading)}>{value}&nbsp; {questionLists.Description}
        </h2>):(
            <h2 className={cn(textStyle, styles.heading)}>{questionLists.Description}
            </h2>
        )}

        {questionLists.Ref_Id===19?(<div className={styles.rangesliderWidth}>
          <div>
            <h2 className={cn(textStyle,styles.floatLeft)}>Equity : {value}</h2>
            <h2 className={cn(textStyle,styles.floatRight)}>Debt : {100-value}</h2>
          </div>
          <div className={styles.marginTop}>
        <Slider
          min={0}
          max={100}
          value={value}
          // onChangeStart={()=>handleChangeStart()}
          onChange={(value)=>handleChange(value)}
          //onChangeComplete={(setValues)=>handleChangeComplete(setValues)}
          name="slider"
        /></div>
      </div>):(<Field
            aria-label=""
            className={styles.customText}
            component={InputWrapper}
            name="questionAnswer"
            placeholder=""
            validate={questionLists.questionSequence===1?([required,validateNumbers]):([validateNumbers])}
            autoFocus={true}
          >
            {InputText}
          </Field>)}
      </div>
    {questionLists.Ref_Id===24?(
            <div>
                <h2 className={cn(styles.lightText, styles.positioningClass)}> 
                 <span className={styles.labelHeading }>Based on Investment in Equity. We can derive your Investment Profile</span>
                 <div className={styles.displayResults}>
                 {value>65?('Aggressive.'):(value>50?('Balanced.'):('Conservative.'))}
                 </div>
                </h2>
           </div>
          ):("")}

      <div className = {styles.buttonsdisplay}>
      {questionLists.Ref_Id!==14?(<div
          className={cn(styles.prevBtn)}
          onClick = {()=>handlePreviousSubmit(questionLists.PreviousQuestionId)}
          onKeyPress = {()=>handlePreviousSubmit(questionLists.PreviousQuestionId)}
          role="button"
        >
          <span>{'previous'}</span>
        </div>):(null)}
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

QuestionForms.propTypes = {
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
    QuestionSequence:PropTypes.string.isRequired,
    Ref_Id:PropTypes.number.isRequired
  }).isRequired,
  handleChangeComplete: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleChangeStart:PropTypes.func.isRequired,
  questionsLength:PropTypes.number.isRequired
 

};

export default reduxForm({
  form: 'QuestionForms',
})(QuestionForms);
