import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Form, reduxForm, Field } from 'redux-form';
import {
  required,
  email,
  onlystring,
  repeatPassword,
  repeatEmail,
  beforeNowDaysMMDDYYYY,
  phoneNumber,
  specialCharecterRequired,
  hasNumber,
  ssn,
  minLength8,
  checkUpperAndLowerCase,
} from '../../utilities/validations';
import { InputText } from '../InputText/InputText';
import InputCheckbox from '../InputCheckbox/InputCheckbox';
import styles from './SignUpForm.module.scss';
import InputWrapper from '../InputWrapper/InputWrapper';
import Button from '../Button/Button';
import InputPassword from '../InputPassword/InputPassword';
import { InputDate } from '../InputDate/InputDate';
import { InputDropdown } from '../InputDropdown/InputDropdown';
import { InputMasked } from '../InputMasked/InputMasked';
//import LayoutTermsAndConditions from '../LayoutTermsAndConditions/LayoutTermsAndConditions';

import {

} from '../../utilities/masks';

const SignUpForm = ({
  // getBrokerInfo,
  handleCSISuccess,
  handleSubmit,
  accountInformation,
  submitting,
  loading,
  highContrast,
  genderTypes,
  maritalStatus,
  RetireTypes,
  isResidentConfirmed,
  isOn,
  handleToggle,
  onColor = '#527318'
}) => {

  const textStyle = highContrast ? styles.lightText : null;
  const formStyle = isResidentConfirmed===true? styles.formStyle:styles.formStyleNoMargin;
  const [isExpanded, setIsExpanded] = useState(true);
  const [isNotSelected, setIsNotExpanded] = useState(false);
  const [isShowTC, setIsShowTC] = useState(false);

  const toggleDisplay = (value) => {
    setIsExpanded(value);
    localStorage.setItem('isEmailSelected', value);
    setIsNotExpanded(!value);
  };

  const toggleNotSelected = (value) => {
    setIsExpanded(!value);
    localStorage.setItem('isEmailSelected', !value);
    setIsNotExpanded(value);
  };

  const toggleShowTermsConditions = (value) => {
    setIsShowTC(value);
  };


  return (
    <Form
      className={formStyle}
      name="signUp"
      onLoad={handleCSISuccess}
      onSubmit={handleSubmit}
    >


      {isResidentConfirmed === false ? (
        <div className={styles.container}>
          <div className={styles.row}>
          <h1 className={styles.heroText}>Non-Resident Indian</h1>
          <input
            checked={isOn}
            onChange={handleToggle}
            className={styles.reactswitchcheckbox}
            id={`react-switch-new`}
            type="checkbox"
          />
          <label
            style={{ background: isOn && onColor }}
            className={styles.reactswitchlabel}
            htmlFor={`react-switch-new`}
          >
            <span className={styles.reactswitchbutton} />
          </label>
          <h1 className={styles.heroText}>Resident Indian</h1>
          </div>
        <div className={styles.row}>
            <h1 className={styles.heroText}>{isOn===false?`Fliber currently open for Resident Indians.`:
            `Please click on continue.`}</h1>
          </div>
        </div>
      ) : (

        <div className={styles.container}>
          <h2 className={cn(styles.lightText, styles.positioningClass)}>
            <span className={styles.required}>*</span>{' '}
            <span className={styles.requiredSmall}>Denotes a Required Field</span>
          </h2>
          <h2 className={cn(textStyle, styles.heading)}>Personal Details</h2>
          <div className={styles.row}>
            <Field
              aria-label="first name"
              className={styles.customText}
              component={InputWrapper}
              label={
                <p className={styles.label}>
                  First Name<span className={styles.required}>*</span>
                </p>
              }
              name="firstName"
              placeholder="Tom"
              validate={[required,onlystring]}
            >
              {InputText}
            </Field>

           

            <Field
              aria-label="last name"
              className={styles.customText}
              component={InputWrapper}
              label={
                <p className={styles.label}>
                  Last Name<span className={styles.required}>*</span>
                </p>
              }
              name="lastName"
              placeholder="Smith"
              validate={[required,onlystring]}
            >
              {InputText}
            </Field>
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
            <div className={styles.row} >
            <Field
            aria-label="email"
            className={styles.customText}
            component={InputWrapper}
            label="Email"
           // mask={initialMask}
            name="email"
            placeholder="example@fliber.com"
            validate={[required, email]}
          >
            {InputText}
          </Field>
            </div>
          </div>
        </div>)}
      <div className={styles.nextButton}>
        <Button
          className={styles.next}
          disabled={!isOn}
          submitting={submitting || loading}
          type="submit"
        >
          <span>{accountInformation ? 'Update' : 'continue'}</span>
        </Button>
      </div>
    </Form>
  );
};

SignUpForm.propTypes = {
  accountInformation: PropTypes.bool.isRequired,
  genderTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleCSISuccess: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  highContrast: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  RetireTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  maritalStatus: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  submitting: PropTypes.bool.isRequired,
  isResidentConfirmed: PropTypes.bool.isRequired,
  isOn:PropTypes.bool.isRequired,
  onColor:PropTypes.string.isRequired,
  handleToggle:PropTypes.func.isRequired
};

export default reduxForm({
  form: 'signUp',
})(SignUpForm);
