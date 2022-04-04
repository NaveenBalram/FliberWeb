import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Form, reduxForm, Field } from 'redux-form';
import {
  required, validateNumbers
} from '../../utilities/validations';
import { InputText } from '../InputText/InputText';
import styles from './SustainablityScoreQuestionForms.module.scss';
import InputWrapper from '../InputWrapper/InputWrapper';
import Button from '../Button/Button';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import { set } from 'lodash';
import { numberToPercentageString } from '../../utilities/helpers';



const SustainablityScoreQuestionForms = ({
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
  return (
    <Form
      className={styles.formStyle}
      name="SustainablityScoreQuestionForms"
      onLoad={formOnLoad}
      onSubmit={handleSubmit}
    >

      <div className={styles.container}>

        <h2 className={cn(styles.lightText, styles.positioningClass)}>
          <span className={styles.labelHeading}>Question  {questionLists.questionSequence}/{questionsLength}</span>
        </h2>
        <h2 className={cn(styles.lightText, styles.positioningClass)}>
          <span className={styles.labelHeading}>{questionLists.questionTitle}</span>
        </h2>
        <h2 className={cn(textStyle, styles.heading)}>{questionLists.description}
        </h2>
        <Field
          aria-label=""
          className={styles.customText}
          component={InputWrapper}
          name="questionAnswer"
          placeholder=""
          validate={questionLists.questionSequence === 1 ? ([required, validateNumbers]) : ([validateNumbers])}
          autoFocus={true}
        >
          {InputText}
        </Field>
      </div>
      <div className={styles.buttonsdisplay}>
        {questionLists.questionId !== 20 ? (<div
          className={cn(styles.prevBtn)}
          onClick={() => handlePreviousSubmit(questionLists.prevQuestionId)}
          onKeyPress={() => handlePreviousSubmit(questionLists.prevQuestionId)}
          role="button"
        >
          <span>{'previous'}</span>
        </div>) : (null)}
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

SustainablityScoreQuestionForms.propTypes = {
  handleCSISuccess: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  prevousButtonClicked: PropTypes.bool.isRequired,
  handlePreviousSubmit: PropTypes.func.isRequired,
  questionLists: PropTypes.shape({
    questionId: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    prevQuestionId: PropTypes.number.isRequired,
    questionTitle: PropTypes.string.isRequired,
    questionSequence: PropTypes.string.isRequired,
  }).isRequired,
  questionsLength: PropTypes.number.isRequired
};

export default reduxForm({
  form: 'SustainablityScoreQuestionForms',
})(SustainablityScoreQuestionForms);
