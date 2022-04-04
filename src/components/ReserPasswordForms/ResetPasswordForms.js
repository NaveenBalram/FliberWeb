import PropTypes from 'prop-types';
import React from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { email, required,
  repeatPassword,
  hasNumber, minLength6,
  validateNumbers } from '../../utilities/validations';
import Button from '../Button/Button';
import InputPassword from '../InputPassword/InputPassword';
import { InputText } from '../InputText/InputText';
import InputWrapper from '../InputWrapper/InputWrapper';
import styles from './ResetPasswordForms.module.scss';
import cn from 'classnames'

const ResetPasswordForm = ({ handleSubmit, submitting, loading,stageOne }) => {
  return (
    <Form
      className={styles.formStyle}
      name="confirmUserForm"
      onSubmit={handleSubmit}
      autoComplete={true}
    >
      
        {stageOne===true?(
        <div className={styles.container}>
        <Field
          key="email"
          aria-label="email address"
          className={styles.customText}
          component={InputWrapper}
          customChildrenWrapper={styles.passwordWrapper}
          label="Email Address"
          name="email"
          placeholder="example@fliber.com"
          validate={[required, email]}
          id="signEmail"
          aria-describedby="signEmail"
          //autoComplete={true}
        >
          {InputText}
        </Field>
        </div>):
        (<div className={styles.container}>
          <Field
          key="Confirmation_Code"
          aria-label="Verification Code"
          className={styles.customText}
          component={InputWrapper}
          customChildrenWrapper={styles.passwordWrapper}
          label="Verification Code"
          name="Confirmation_Code"
          placeholder="Verification Code"
          validate={[
            required,validateNumbers, minLength6
          ]}
          id="confirmation_Code"
          aria-describedby="Verification code"
          //autoComplete={true}
        >
          {InputPassword}
        </Field>
        <Field
            aria-describedby="password"
            aria-label="password"
            autoComplete="new-password"
            className={styles.customText}
            component={InputWrapper}
            customChildrenWrapper={styles.passwordWrapper}
            id="password"
            label= "MPIN"
            name="password"
            placeholder="MPIN"
            maxLength={6}
            validate={[
              required,
              validateNumbers,
              minLength6,
            ]}
          >
            {InputPassword}
          </Field>

          <Field
            aria-describedby="reEnterPassword"
            aria-label="confirm MPIN"
            className={styles.customText}
            component={InputWrapper}
            customChildrenWrapper={styles.passwordWrapper}
            id="reEnterPassword"
            label="Confirm MPIN"
            name="reEnterPassword"
            placeholder="MPIN"
            validate={[required, repeatPassword,validateNumbers]}
          >
            {InputPassword}
          </Field>
      
      </div>)}
      <div className={styles.nextButton}>
        <Button
          className={styles.next}
          disabled={submitting || loading}
          submitting={submitting || loading}
          type="submit"
          aria-label="submit"
        >
          <span>{stageOne===true?(`Continue`):(`Reset Password`)}</span>
        </Button>
      </div>
    </Form>
  );
};

ResetPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  stageOne: PropTypes.bool.isRequired,
  stageTwo: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'ReEnterPasswordForm',
  // onSubmitFail:(errors) => {
  //   const errorEl = document.querySelector(
  //     Object.keys((errors)).map(fieldName => `[name="${fieldName}"]`).join(',')
  //     );
  //     console.log(errorEl)
  //     if (errorEl && errorEl.focus) {
  //       errorEl.focus(); 
  //     }
  // }
})(ResetPasswordForm);
