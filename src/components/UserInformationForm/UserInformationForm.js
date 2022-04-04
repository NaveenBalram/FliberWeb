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
} from '../../utilities/validations';
import { InputText } from '../InputText/InputText';
import InputCheckbox from '../InputCheckbox/InputCheckbox';
import styles from './UserInformationForm.module.scss';
import InputWrapper from '../InputWrapper/InputWrapper';
import Button from '../Button/Button';
import InputPassword from '../InputPassword/InputPassword';
import { InputDate } from '../InputDate/InputDate';
import { InputDropdown } from '../InputDropdown/InputDropdown';
import { InputMasked } from '../InputMasked/InputMasked';
//import LayoutTermsAndConditions from '../LayoutTermsAndConditions/LayoutTermsAndConditions';

import {

} from '../../utilities/masks';

const UserInformationForm = ({
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


  return (
    <Form
      className={styles.formStyle}
      name="UserInformationForm"
      onLoad={handleCSISuccess}
      onSubmit={handleSubmit}
    >
      <div className={styles.container}>
        <h2 className={cn(styles.lightText, styles.positioningClass)}>
          <span className={styles.required}>*</span>{' '}
          <span className={styles.requiredSmall}>Denotes a Required Field</span>
        </h2>
        <h2 className={cn(styles.lightText, styles.heading)}>Personal Details</h2>
        <div className={styles.row}>

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
              return { label: item.Description, value: item.Id };
            })}
            placeholder="Select Your Gender"
            validate={[required]}
          >
            {InputDropdown}
          </Field>
          <Field
            aria-label="Retirement Status"
            className={cn(styles.customText, styles.customDropdown)}
            component={InputWrapper}
            isSearchable={false}
            label={
              <p className={styles.label}>
                Retirement Status<span className={styles.required}>*</span>
              </p>
            }
            multi={false}
            name="retirementStatus"
            options={RetireTypes.map((item) => {
              return { label: item.Description, value: item.Id };
            })}
            placeholder="Retirement Status"
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
              return { label: item.Description, value: item.Id };
            })}
            placeholder="Marital Status"
            validate={[required]}
          >
            {InputDropdown}
          </Field>
        </div>

        <div className={styles.nextButton}>
          <Button
            className={styles.next}
            disabled={false }
            submitting={submitting || loading}
            type="submit"
          >
            <span>{accountInformation ? 'Update' : 'continue'}</span>
          </Button>
        </div>
      </div>
    </Form>
  );
};

UserInformationForm.propTypes = {
  accountInformation: PropTypes.bool.isRequired,
  genderTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleCSISuccess: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  highContrast: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  RetireTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  maritalStatus: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  submitting: PropTypes.bool.isRequired,

};

export default reduxForm({
  form: 'UserInformationForm',
})(UserInformationForm);
