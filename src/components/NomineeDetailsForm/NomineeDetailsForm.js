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
import styles from './NomineeDetailsForm.module.scss';
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

const NomineeDetailsForm = ({
  // getBrokerInfo,
  handleLoad,
  handleSubmit,
  accountInformation,
  submitting,
  loading,
  highContrast,
  nomineeReleation
}) => {

  const textStyle = highContrast ? styles.lightText : null;

  return (
    <Form
      className={styles.formStyle}
      name="NomineeDetailsForm"
      onLoad={handleLoad}
      onSubmit={handleSubmit}
    >

      <div className={styles.container}>
           <div className={styles.row}>
           <Field
            aria-label="Nominee Name"
            className={styles.customText}
            component={InputWrapper}
            label={
              <p className={styles.label}>
                Nominee Name<span className={styles.required}>*</span>
              </p>
            }
            name="nomineeName"
            placeholder="Name"
            validate={[required]}
          >
            {InputText}
          </Field>
          
          </div>
          <div className={styles.row}>
          <Field
            aria-label="Nominee date of birth"
            className={cn(styles.customText)}
            component={InputWrapper}
            dateFormat="mm/dd/yyyy"
            label={
              <p className={styles.label}>
                Date Of Birth<span className={styles.required}>*</span>
              </p>
            }
            name="nomineedateOfBirth"
            placeholder="MM/DD/YYYY"
            validate={[required, beforeNowDaysMMDDYYYY]}
          >
            {InputDate}
          </Field>
          <Field
            aria-label="nomineeRelation"
            className={cn(styles.customText, styles.customDropdown)}
            component={InputWrapper}
            isSearchable={false}
            label={
              <p className={styles.label}>
                Relation Ship<span className={styles.required}>*</span>
              </p>
            }
            multi={false}
            name="nomineeRelation"
            options={nomineeReleation.map((item) => {
              return { label: item.Description, value: item.Id };
            })}
            placeholder="Releations"
            validate={[required]}
          >
            {InputDropdown}
          </Field>
          <Field
            aria-label="Nominee Share(%)"
            className={styles.customText}
            component={InputWrapper}
            label={
              <p className={styles.label}>
                Nominee Share(%)<span className={styles.required}>*</span>
              </p>
            }
            name="nomineeShare"
            placeholder="Nominee Share"
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
        >
          <span>{accountInformation ? 'Update' : 'Add Nominee'}</span>
        </Button>
      </div>
    </Form>
  );
};

NomineeDetailsForm.propTypes = {
  accountInformation: PropTypes.bool.isRequired,
  handleLoad: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  highContrast: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  nomineeReleation:PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default reduxForm({
  form: 'NomineeDetailsForm',
})(NomineeDetailsForm);
