import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Form, reduxForm, Field } from 'redux-form';
import {
  required,
} from '../../utilities/validations';
import { InputText } from '../InputText/InputText';
import InputCheckbox from '../InputCheckbox/InputCheckbox';
import styles from './AddressDetailsForm.module.scss';
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

const AddressDetailsForm = ({
  // getBrokerInfo,
  handleLoad,
  handleSubmit,
  accountInformation,
  submitting,
  loading,
  highContrast,
  handleExit,
  residentTypes,
  stateList
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
      name="AddressDetailsForm"
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
            aria-label="addressType"
            className={cn(styles.customText, styles.customDropdown)}
            component={InputWrapper}
            isSearchable={false}
            label={
              <p className={styles.label}>
                Address Type<span className={styles.required}>*</span>
              </p>
            }
            multi={false}
            name="addressType"
            options={residentTypes.map((item) => {
              return { label: item.Description, value: item.Id };
            })}
            placeholder="Address Types"
            validate={[required]}
          >
            {InputDropdown}
          </Field>
        </div>
        <Field
              aria-describedby="Address1"
              aria-label="Address1"
              className={cn(styles.customText)}
              component={InputWrapper}
              id="address1"
              label={
                <p className={styles.label}>
                  Address Line 1 <span className={styles.required}>*</span>
                </p>
              }
              name="Address1"
              placeholder="Number, Street Name"
              validate={[required]}
            >
              {InputText}
          </Field>
          <Field
              aria-describedby="Address2"
              aria-label="Address2"
              className={cn(styles.customText)}
              component={InputWrapper}
              id="Address2"
              label={
                <p className={styles.label}>
                  Address Line 2 <span className={styles.required}>*</span>
                </p>
              }
              name="Address2"
              placeholder="street Name,"
              //validate={[required]}
            >
              {InputText}
            </Field>
        <div className={styles.row}>
        <Field
              aria-describedby="City"
              aria-label="city"
              className={cn(styles.customText)}
              component={InputWrapper}
              id="city"
              label={
                <p className={styles.label}>
                  City <span className={styles.required}>*</span>
                </p>
              }
              name="city"
              placeholder="city"
              validate={[required]}
            >
              {InputText}
            </Field>
            <Field
            aria-label="state"
            className={cn(styles.customText, styles.customDropdown)}
            component={InputWrapper}
            isSearchable={false}
            label={
              <p className={styles.label}>
               State<span className={styles.required}>*</span>
              </p>
            }
            multi={false}
            name="state"
            options={stateList.map((item) => {
              return { label: item.State, value: item.Id };
            })}
            placeholder="Select Your State"
            validate={[required]}
          >
            {InputDropdown}
          </Field>
            <Field
              aria-describedby="Pincode"
              aria-label="Pincode"
              className={cn(styles.customText)}
              component={InputWrapper}
              id="Pincode"
              label={
                <p className={styles.label}>
                  Pincode <span className={styles.required}>*</span>
                </p>
              }
              name="Pincode"
              placeholder="Pincode,"
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

AddressDetailsForm.propTypes = {
  accountInformation: PropTypes.bool.isRequired,
  handleLoad: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  highContrast: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleExit:PropTypes.func.isRequired,
  residentTypes:PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  stateList:PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default reduxForm({
  form: 'AddressDetailsForm',
})(AddressDetailsForm);
