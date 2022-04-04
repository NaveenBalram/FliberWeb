import PropTypes from 'prop-types';
import React from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { email, required } from '../../utilities/validations';
import Button from '../Button/Button';
import InputPassword from '../InputPassword/InputPassword';
import { InputText } from '../InputText/InputText';
import InputWrapper from '../InputWrapper/InputWrapper';
import styles from './SignInForm.module.scss';

const SignInForm = ({ handleSubmit, submitting, loading }) => {
  return (
    <Form
      className={styles.formStyle}
      name="userInformation"
      onSubmit={handleSubmit}
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
          placeholder="example@aflac.com"
          validate={[required, email]}
        >
          {InputText}
        </Field>
        <Field
          key="password"
          aria-label="password"
          className={styles.customText}
          component={InputWrapper}
          customChildrenWrapper={styles.passwordWrapper}
          label="Password"
          name="password"
          placeholder="password"
          validate={[required]}
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
        >
          <span>Sign In</span>
        </Button>
      </div>
    </Form>
  );
};

SignInForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'signIn',
})(SignInForm);
