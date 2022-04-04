import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Form, reduxForm, Field } from 'redux-form';
import {
  required,
  beforeNowDaysMMDDYYYY, email
} from '../../utilities/validations';
import Button from '../Button/Button';
import { InputDate } from '../InputDate/InputDate';
import { InputText } from '../InputText/InputText'
import InputWrapper from '../InputWrapper/InputWrapper';
import styles from './DobValidationForm.module.scss';

const DobValidationForm = ({ handleSubmit, submitting, loading }) => {
  return (
    <Form
      className={styles.formStyle}
      name="DobValidationForm"
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <Field
          key="email"
          aria-label="email address"
          className={styles.customText}
          component={InputWrapper}
          customChildrenWrapper={styles.passwordWrapper}
          label="Email Address"
          name="email"
          placeholder="user@domain.com"
          validate={[required, email]}
          id="signEmail"
          aria-describedby="signEmail"
        //autoComplete={true}
        >
          {InputText}
        </Field>
      </div>
      <div className={styles.row}>

        <Field
          aria-label="date of birth"
          className={cn(styles.customText)}
          component={InputWrapper}
          dateFormat="mm/dd/yyyy"
          label={
            <p className={styles.label}>
              Date Of Birth<span className={styles.required}>*</span>
            </p>
          }
          name="dateOfBirth"
          placeholder="MM/DD/YYYY"
          validate={[required, beforeNowDaysMMDDYYYY]}
        >
          {InputDate}
        </Field>
      </div>
      
      <div className={styles.nextButton}>
        <Button
          className={styles.next}
          // disabled={}
          submitting={submitting || loading}
          type="submit"
        >
          <span>{'Verify'}</span>
        </Button>
      </div>
    </Form>
  );
};

DobValidationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleCSISuccess: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'DobValidationForm',
  // onSubmitFail:(errors) => {
  //   const errorEl = document.querySelector(
  //     Object.keys((errors)).map(fieldName => `[name="${fieldName}"]`).join(',')
  //     );
  //     console.log(errorEl)
  //     if (errorEl && errorEl.focus) {
  //       errorEl.focus(); 
  //     }
  // }
})(DobValidationForm);
