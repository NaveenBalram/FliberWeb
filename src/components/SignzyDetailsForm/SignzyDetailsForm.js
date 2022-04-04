import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Form, reduxForm, Field } from 'redux-form';
import {
  required,
  email,
  repeatPassword,
  repeatEmail,
  beforeNowDaysMMDDYYYY,
  phoneNumber,
  specialCharecterRequired,
  hasNumber,
  ssn,
  minLength8,
  checkUpperAndLowerCase,
  pancardValidation
} from '../../utilities/validations';
import { InputText } from '../InputText/InputText';
import InputCheckbox from '../InputCheckbox/InputCheckbox';
import styles from './SignzyDetailsForm.module.scss';
import InputWrapper from '../InputWrapper/InputWrapper';
import Button from '../Button/Button';
import InputPassword from '../InputPassword/InputPassword';
import { InputDate } from '../InputDate/InputDate';
import { InputDropdown } from '../InputDropdown/InputDropdown';
import { InputMasked } from '../InputMasked/InputMasked';
//import LayoutTermsAndConditions from '../LayoutTermsAndConditions/LayoutTermsAndConditions';

import {
  zipCodeMask,
  phoneNumberMask,
  ssnMask,
  initialMask,
} from '../../utilities/masks';

const SignzyDetailsForm = ({
  // getBrokerInfo,
  handleLoad,
  handleSubmit,
  accountInformation,
  submitting,
  loading,
  highContrast,
  handleExit
}) => {

  const textStyle = highContrast ? styles.lightText : null;


  const toggleDisplay = (value) => {

  };

  const toggleNotSelected = (value) => {

  };

  const toggleShowTermsConditions = (value) => {
    ;
  };


  return (
    <Form
      className={styles.formStyle}
      name="signzyDetailsForm"
      onLoad={handleLoad}
      onSubmit={handleSubmit}
    >
      {/* <h2 className={cn(styles.lightText, styles.positioningClass)}>
        <span className={styles.required}>*</span>{' '}
        <span className={styles.requiredSmall}>Denotes a Required Field</span>
      </h2> */}

      <div className={styles.container}>
        <div className={styles.row}>
          <Field
            aria-label="full Name(As in PAN)"
            className={styles.customText}
            component={InputWrapper}
            label={
              <p className={styles.label}>
                 Name(As in PAN)<span className={styles.required}>*</span>
              </p>
            }
            name="Name"
            placeholder="full Name(As in PAN)"
            validate={[required]}
            maxLength={30}
          >
            {InputText}
          </Field>
          <Field
            key="mobileNumber"
            aria-label="mobile Number"
            className={styles.customText}
            component={InputWrapper}
            label={<p className={styles.label}>
              Mobile Number<span className={styles.required}>*</span>
            </p>}
            name="mobileNumber"
            maxLength="13"
            placeholder="91-9901234568940"
            validate={[required, phoneNumber]}
          >
            {InputText}
          </Field>
        </div>
        <div className={styles.row}>
          <Field
            aria-label="userName"
            className={styles.customText}
            component={InputWrapper}
            label={
              <p className={styles.label}>
                User Name(Signzy Account)<span className={styles.required}>*</span>
              </p>
            }
            name="userName"
            placeholder="User Name"
            validate={[required]}
          >
            {InputText}
          </Field>
          <Field
            aria-label="emailId"
            className={styles.customText}
            component={InputWrapper}
            label={
              <p className={styles.label}>
                Email Id
              </p>
            }
            name="emailId"
            placeholder="Email Id"
            validate={[required,email]}
          >
            {InputText}
          </Field>
        </div>
      </div>
      <div className={styles.nextButton}>
      <Button
          className={styles.next}
          disabled={submitting || loading}
          submitting={submitting || loading}
          type="submit"
          onClick ={()=>handleExit()}
        >
          <span>{`Back`}</span>
        </Button>
        <Button
          className={styles.next}
          disabled={submitting || loading}
          submitting={submitting || loading}
          type="submit"
        >
          <span>{accountInformation ? 'Update' : 'continue'}</span>
        </Button>
      </div>
    </Form>
  );
};

SignzyDetailsForm.propTypes = {
  
  handleLoad: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  highContrast: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleExit:PropTypes.func.isRequired
};

export default reduxForm({
  form: 'signzyDetailsForm',
})(SignzyDetailsForm);
