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
import styles from './CustomerBasicDetails.module.scss';
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

const customerBasicForm = ({
  // getBrokerInfo,
  handleLoad,
  handleSubmit,
  accountInformation,
  submitting,
  loading,
  highContrast,
  genderTypes,
  maritalStatus,
  isSpouseShow,
  handlemaritalStatus,
  handleExit,
  stateList,
  countryList
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
      name="customerBasicForm"
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
                Full Name(As in PAN)<span className={styles.required}>*</span>
              </p>
            }
            name="fullName"
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
            aria-label="Father's Name"
            className={styles.customText}
            component={InputWrapper}
            label={
              <p className={styles.label}>
                Father's Name<span className={styles.required}>*</span>
              </p>
            }
            name="fatherName"
            placeholder="Father's Name"
            validate={[required]}
          >
            {InputText}
          </Field>
          <Field
            aria-label="Mother's Name"
            className={styles.customText}
            component={InputWrapper}
            label={
              <p className={styles.label}>
                Mother's Name
              </p>
            }
            name="motherName"
            placeholder="Mother's Name"
            validate={[required]}
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

          <Field
            aria-label="gender"
            className={cn(styles.customText, styles.customDropdown)}
            component={InputWrapper}
            isSearchable={false}
            label={
              <p className={styles.label}>
                Gender<span className={styles.required}>*</span>
              </p>
            }
            multi={false}
            name="gender"
            options={genderTypes.map((item) => {
              return { label: item.Name, value: item.Id };
            })}
            placeholder="Select Your Gender"
            validate={[required]}
          >
            {InputDropdown}
          </Field>
          <Field
            aria-label="marital Status"
            className={cn(styles.customText, styles.customDropdown)}
            component={InputWrapper}
            isSearchable={false}
            label={
              <p className={styles.label}>
                Marital Status<span className={styles.required}>*</span>
              </p>
            }
            name="maritalStatus"
            options={maritalStatus.map((item) => {
              return { label: item.Name, value: item.Id };
            })}
            placeholder="Marital Status"
            validate={[required]}
            onChange={(value)=>handlemaritalStatus(value)}
          >
            {InputDropdown}
          </Field>
        </div>
        {isSpouseShow===true?(<div className={styles.row}>
          <Field
            aria-label="spouse Name"
            className={styles.customText}
            component={InputWrapper}
            label={
              <p className={styles.label}>
                Spouse Name<span className={styles.required}>*</span>
              </p>
            }
            name="spouseName"
            placeholder="Spouse Name"
            validate={[required]}
          >
            {InputText}
          </Field>
          <Field
            aria-label="Spouse date of birth"
            className={cn(styles.customText)}
            component={InputWrapper}
            dateFormat="mm/dd/yyyy"
            label={
              <p className={styles.label}>
                Date Of Birth<span className={styles.required}>*</span>
              </p>
            }
            name="SpousedateOfBirth"
            placeholder="MM/DD/YYYY"
            validate={[required, beforeNowDaysMMDDYYYY]}
          >
            {InputDate}
          </Field>
          <Field
            key="panCardNumber"
            aria-label="panCard Number"
            className={styles.customText}
            component={InputWrapper}
            label="Pancard Number"
            name="pancardNumber"
            placeholder="ASRPBXXXXX"
            validate={[required, pancardValidation]}
          >
            {InputText}
          </Field>
        </div>):(null)}
        <div className={styles.row}>
          <Field
            aria-label="born City"
            className={styles.customText}
            component={InputWrapper}
            label={
              <p className={styles.label}>
                Born City<span className={styles.required}>*</span>
              </p>
            }
            name="bornCity"
            placeholder="City"
            validate={[required]}
          >
            {InputText}
          </Field>
          <Field
            aria-label="born Country"
            className={cn(styles.customText, styles.customDropdown)}
            component={InputWrapper}
            isSearchable={false}
            label={
              <p className={styles.label}>
                Born Country<span className={styles.required}>*</span>
              </p>
            }
            multi={false}
            name="bornCountry"
            options={countryList.map((item) => {
              return { label: item.CountryName, value: item.Id };
            })}
            placeholder="Select Your Country"
            validate={[required]}
          >
            {InputDropdown}
          </Field>
          
          <Field
            key="nationality"
            aria-label="Nationality"
            className={styles.customText}
            component={InputWrapper}
            label={
              <p className={styles.label}>
                Nationality<span className={styles.required}>*</span>
              </p>
            }
            name="nationality"
            placeholder="Nationality"
            validate={[required]}
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

customerBasicForm.propTypes = {
  accountInformation: PropTypes.bool.isRequired,
  genderTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleLoad: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  highContrast: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  maritalStatus: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  submitting: PropTypes.bool.isRequired,
  isSpouseShow: PropTypes.bool.isRequired,
  handlemaritalStatus:PropTypes.func.isRequired,
  handleExit:PropTypes.func.isRequired,
  stateList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  countryList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default reduxForm({
  form: 'customerBasicForm',
})(customerBasicForm);
