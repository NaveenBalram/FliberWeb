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
import styles from './ProfessionalDetailsForm.module.scss';
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

const ProfessionalDetailsForm = ({
  // getBrokerInfo,
  handleLoad,
  handleSubmit,
  accountInformation,
  submitting,
  loading,
  highContrast,
  incomeRange,
  occupationTypes,
  sourceOfWealth,
  handleExit,
  residentStatus
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
      name="ProfessionalDetailsForm"
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
            aria-label="sourceOfWealth"
            className={cn(styles.customText, styles.customDropdown)}
            component={InputWrapper}
            isSearchable={false}
            label={
              <p className={styles.label}>
                Source of Wealth<span className={styles.required}>*</span>
              </p>
            }
            multi={false}
            name="sourceofWealth"
            options={sourceOfWealth.map((item) => {
              return { label: item.Description, value: item.Id };
            })}
            placeholder="Source incomes"
            validate={[required]}
          >
            {InputDropdown}
          </Field>
          <Field
            aria-label="occupation Types"
            className={cn(styles.customText, styles.customDropdown)}
            component={InputWrapper}
            isSearchable={false}
            label={
              <p className={styles.label}>
                Occupation Types<span className={styles.required}>*</span>
              </p>
            }
            name="occupationTypes"
            options={occupationTypes.map((item) => {
              return { label: item.Description, value: item.Id };
            })}
            placeholder="occupationTypes"
            validate={[required]}
          >
            {InputDropdown}
          </Field>
        </div>
        <div className={styles.row}>
        
        <Field
            aria-label="Resident Status"
            className={cn(styles.customText, styles.customDropdown)}
            component={InputWrapper}
            isSearchable={false}
            label={
              <p className={styles.label}>
                Resident Status<span className={styles.required}>*</span>
              </p>
            }
            name="residentStatus"
            options={residentStatus.map((item) => {
              return { label: item.Description, value: item.Id };
            })}
            placeholder="select"
            validate={[required]}
          >
            {InputDropdown}
          </Field>
          <Field
            aria-label="Income Slab"
            className={cn(styles.customText, styles.customDropdown)}
            component={InputWrapper}
            isSearchable={false}
            label={
              <p className={styles.label}>
                Income Slab<span className={styles.required}>*</span>
              </p>
            }
            name="incomeSlab"
            options={incomeRange.map((item) => {
              return { label: item.Description, value: item.Id };
            })}
            placeholder="Income Slabs"
            validate={[required]}
          >
            {InputDropdown}
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

ProfessionalDetailsForm.propTypes = {
  accountInformation: PropTypes.bool.isRequired,
  handleLoad: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  highContrast: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleExit:PropTypes.func.isRequired,
  incomeRange:PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  occupationTypes:PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  sourceOfWealth:PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  residentStatus:PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default reduxForm({
  form: 'professionalDetailsForm',
})(ProfessionalDetailsForm);
