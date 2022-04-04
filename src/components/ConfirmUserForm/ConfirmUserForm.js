import PropTypes from 'prop-types';
import React from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { email, required,validateNumbers } from '../../utilities/validations';
import Button from '../Button/Button';
import InputPassword from '../InputPassword/InputPassword';
import { InputText } from '../InputText/InputText';
import InputWrapper from '../InputWrapper/InputWrapper';
import styles from './ConfirmUserForm.module.scss';

const ConfirmUserForm = ({ handleSubmit, submitting, loading,handleCSISuccess }) => {
  return (
    <Form
      className={styles.formStyle}
      name="confirmUserForm"
      onSubmit={handleSubmit}
      onLoad = {handleCSISuccess}
      autoComplete={true}
    >
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
        <Field
          key="passcode"
          aria-label="passcode"
          className={styles.customText}
          component={InputWrapper}
          customChildrenWrapper={styles.passwordWrapper}
          label="Verification Code"
          name="passcode"
          placeholder="Verification Code"
          validate={[required,validateNumbers]}
          id="signPassword"
          aria-describedby="signPasscode"
          //autoComplete={true}
        >
          {InputPassword}
        </Field>
      </div>
      <div className={styles.nextButton}>
        <Button
          className={styles.next}
          disabled={submitting || loading}
          submitting={submitting || loading}
          type="submit"
          aria-label="submit"
        >
          <span>Confirm</span>
        </Button>
      </div>
    </Form>
  );
};

ConfirmUserForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleCSISuccess: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'confirmUserForm',
  // onSubmitFail:(errors) => {
  //   const errorEl = document.querySelector(
  //     Object.keys((errors)).map(fieldName => `[name="${fieldName}"]`).join(',')
  //     );
  //     console.log(errorEl)
  //     if (errorEl && errorEl.focus) {
  //       errorEl.focus(); 
  //     }
  // }
})(ConfirmUserForm);
