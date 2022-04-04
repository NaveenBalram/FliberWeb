import PropTypes from 'prop-types';
import React from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { email, required,phoneNumber,validateNumbers, minLength6 } from '../../utilities/validations';
import Button from '../Button/Button';
import InputPassword from '../InputPassword/InputPassword';
import { InputText } from '../InputText/InputText';
import InputWrapper from '../InputWrapper/InputWrapper';
import styles from './SignInWithMobileForm.module.scss';
import { useSelector } from "react-redux";
const SignInWithMobileForm = ({ handleSubmit, submitting, loading, BeforeOTPEnter,userInfo,isEmailClicked }) => {


  return (
    <Form
      className={styles.formStyle}
      name="userInformation"
      onSubmit={handleSubmit}
    >
      <div className={styles.container}>
      {BeforeOTPEnter===false?(<Field
          key={isEmailClicked===true?"emailId":"mobileNumber"}
          aria-label={isEmailClicked===true?"email Id":"mobile Number"}
          className={styles.customText}
          component={InputWrapper}
          customChildrenWrapper={styles.passwordWrapper}
          label={isEmailClicked===true?"Email Address":"mobileNumber"}
          name={isEmailClicked===true?"emailAddress":"mobileNumber"}
          maxLength = {isEmailClicked===true?100:10}
          placeholder= {isEmailClicked===true?"userName@Fliber.com":"9945000000"}
          validate={isEmailClicked===true?[required,email]:[required,phoneNumber]}
        >
          {InputText}
        </Field>):userInfo!=null && userInfo.MPIN ?(  <Field
           key="mpin"
           aria-label="=mpin"
           className={styles.customText}
           component={InputWrapper}
           customChildrenWrapper={styles.passwordWrapper}
           label="Enter your mpin"
           name="mpin"
           maxLength={6}
           placeholder="123456"
           validate={[required,validateNumbers]}
         >
           {InputPassword}
         </Field>
         ):(
         <Field
         key="otp"
         aria-label="otp"
         className={styles.customText}
         component={InputWrapper}
         customChildrenWrapper={styles.passwordWrapper}
         label={Object.keys(userInfo).length === 0?"Enter your OTP":"Enter your MPIN"}
         name="otp"
         maxLength={6}
         placeholder="567891"
         validate={[required,validateNumbers, minLength6]}
       >
         {InputPassword}
       </Field>
       )} 
      </div>
      <div className={styles.nextButton}>
        <Button
          className={styles.next}
          disabled={submitting || loading}
          submitting={submitting || loading}
          type="submit"
        >
          {BeforeOTPEnter===false?(<span>Continue</span>):Object.keys(userInfo).length === 0?(<span>Verify OTP</span>) :(<span>Verify MPIN</span>)}
        </Button>
      </div>
      <div className={styles.container}>
       
      </div>
    </Form>
  );
};

SignInWithMobileForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  BeforeOTPEnter: PropTypes.bool.isRequired,
  userInfo: PropTypes.shape({}).isRequired,
  isEmailClicked: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'signIn',
})(SignInWithMobileForm);
