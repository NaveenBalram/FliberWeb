import PropTypes from 'prop-types';
import React from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { email, required,
  repeatPassword,
  minLength6,
  maxLength6,validateNumbers } from '../../utilities/validations';
import Button from '../Button/Button';
import InputPassword from '../InputPassword/InputPassword';
import { InputText } from '../InputText/InputText';
import InputWrapper from '../InputWrapper/InputWrapper';
import styles from './EmailPasswordUpdateForm.module.scss';


const EmailPasswordUpdateForm = ({ handleSubmit, submitting, loading,EmailChange,MPINChange,stageOne }) => {
  
  return (
    <Form
      className={styles.formStyle}
      name="confirmUserForm"
      onSubmit={handleSubmit}
      autoComplete={true}
    >
      
        {EmailChange===true?(
        <div className={styles.container}>
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
        {stageOne==false?(<Field
          key="Security_code"
          aria-label="Verification Code"
          className={styles.customText}
          component={InputWrapper}
          customChildrenWrapper={styles.passwordWrapper}
          label="Verification Code"
          name="Security_code"
          placeholder="Verification Code"
          validate={[
            required,
            validateNumbers,
            minLength6
          ]}
          id="Security_Code"
          aria-describedby="verification code"
          //autoComplete={true}
        >
          {InputPassword}
        </Field>):(null)}
        </div>):
        (<div className={styles.container}>
         {!MPINChange ? <Field
          key="old_mpin"
          aria-label="Previous MPIN"
          className={styles.customText}
          component={InputWrapper}
          customChildrenWrapper={styles.passwordWrapper}
          label="Previous MPIN"
          name="old_mpin"
          placeholder="Previous MPIN"
          id="old_mpin"
          maxLength = "6"
          aria-describedby="Previous MPIN"
          dis
          validate={[
            required,
            minLength6,
            validateNumbers
                      ]}
          //autoComplete={true}
        >
          {InputPassword}
        </Field> : null}
        <Field
            aria-describedby="New MPIN"
            aria-label="New MPIN"
            autoComplete="new_mpin"
            className={styles.customText}
            component={InputWrapper}
            customChildrenWrapper={styles.passwordWrapper}
            id="new_mpin"
            label= "New MPIN"
            name="new_mpin"
            placeholder="New MPIN"
            validate={[
              required,
              minLength6,
              validateNumbers
            ]}
            maxLength = "6"
          >
            {InputPassword}
          </Field>

          <Field
            aria-describedby="re_mpin"
            aria-label="Confirm MPIN"
            className={styles.customText}
            component={InputWrapper}
            customChildrenWrapper={styles.passwordWrapper}
            id="re_mpin"
            label="Confirm MPIN"
            name="re_mpin"
            placeholder="Confirm MPIN"
            validate={[required, repeatPassword,validateNumbers]}
            maxLength = "6"
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
          <span>{`Confirm`}</span>
        </Button>
      </div>
    </Form>
  );
};

EmailPasswordUpdateForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  EmailChange: PropTypes.bool.isRequired,
  MPINChange: PropTypes.bool.isRequired,
  stage: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'EmailPasswordUpdateForm',
  // onSubmitFail:(errors) => {
  //   const errorEl = document.querySelector(
  //     Object.keys((errors)).map(fieldName => `[name="${fieldName}"]`).join(',')
  //     );
  //     console.log(errorEl)
  //     if (errorEl && errorEl.focus) {
  //       errorEl.focus(); 
  //     }
  // }
})(EmailPasswordUpdateForm);
