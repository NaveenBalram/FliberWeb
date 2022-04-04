import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Form, reduxForm, Field } from 'redux-form';
import {
  required,
  validateBankNumber,
  repeatBankAccountNumber,
  ifscCodeValidation
} from '../../utilities/validations';
import { InputText } from '../InputText/InputText';
import InputCheckbox from '../InputCheckbox/InputCheckbox';
import styles from './BankDetailsForm.module.scss';
import InputWrapper from '../InputWrapper/InputWrapper';
import Button from '../Button/Button';
import InputPassword from '../InputPassword/InputPassword';
import { InputDate } from '../InputDate/InputDate';
import { InputDropdown } from '../InputDropdown/InputDropdown';
import { InputMasked } from '../InputMasked/InputMasked';
import { Link, NavLink } from "react-router-dom";
//import LayoutTermsAndConditions from '../LayoutTermsAndConditions/LayoutTermsAndConditions';



const BankDetailsForm = ({
  // getBrokerInfo,
  handleLoad,
  handleSubmit,
  accountInformation,
  submitting,
  loading,
  highContrast,
  accountTypes,
  initialBankDetails,
  handleIFscCode,
  setIfscCodeName,
  isDefaultAccount,
  makeItDefault

}) => {

  const textStyle = highContrast ? styles.lightText : null;

  return (
    <Form
      className={styles.formStyle}
      name="BankDetailsForm"
      onLoad={handleLoad}
      onSubmit={handleSubmit}
    >

      <div className={styles.container}>
        {initialBankDetails === false ? (<div>
          <div className={styles.row}>
            <Field
              aria-label="Account Holder Name"
              className={styles.customText}
              component={InputWrapper}
              label={
                <p className={styles.label}>
                  Account Holder Name<span className={styles.required}>*</span>
                </p>
              }
              name="accountHolderName"
              placeholder="Enter Name"
              validate={[required]}
            >
              {InputText}
            </Field>
            <Field
              aria-label="account Types"
              className={cn(styles.customText, styles.customDropdown)}
              component={InputWrapper}
              isSearchable={false}
              label={
                <p className={styles.label}>
                  Account Type<span className={styles.required}>*</span>
                </p>
              }
              multi={false}
              name="accountTypes"
              options={accountTypes.map((item) => {
                return { label: item.Description, value: item.Id };
              })}
              placeholder="Select Account types"
              validate={[required]}
            >
              {InputDropdown}
            </Field>
          </div>
          <div className={styles.row}>
            <Field
              aria-label="Account Number"
              className={styles.customText}
              component={InputWrapper}
              label={
                <p className={styles.label}>
                  Account Number<span className={styles.required}>*</span>
                </p>
              }
              name="accountNumber"
              placeholder="Enter Account Number"
              validate={[required, validateBankNumber]}
            >
              {InputText}
            </Field>
            <Field
              aria-label="Confirm Account Number"
              className={styles.customText}
              component={InputWrapper}
              label={
                <p className={styles.label}>
                  Confirm Account Number<span className={styles.required}>*</span>
                </p>
              }
              name="confirmAccountNumber"
              placeholder="Re-Enter Account Number"
              validate={[required, validateBankNumber, repeatBankAccountNumber]}
            >
              {InputText}
            </Field>
            <Field
              aria-describedby="default Account"
              aria-label="Default Account"
              component={InputCheckbox}
              id="defaultAccount"
              label="Make it Primary"
              name="defaultAccount"
              onChange={(value) => makeItDefault(value)}
              isSelected={isDefaultAccount}
            >
              {InputCheckbox}
            </Field>

          </div>
        </div>) : (
          <div>
            <div className={styles.row}>
              <Field
                aria-label="IFSC Code"
                className={styles.customText}
                component={InputWrapper}
                label={
                  <p className={styles.label}>
                    Enter IFSC Code<span className={styles.required}>*</span>
                  </p>
                }
                name="ifscCode"
                placeholder="Enter IFSC code"
                validate={[required, ifscCodeValidation]}
                onChange={setIfscCodeName}
              >
                {InputText}
              </Field>

              <div className={styles.linkFlex}>
                <p
                  className={styles.downloadLink}
                  onClick={handleIFscCode}
                >
                  <Link>Get Bank Details</Link>
                </p>
              </div>
            </div>
            <div className={styles.row}>
              <Field
                aria-label="Bank Name"
                className={styles.customText}
                component={InputWrapper}
                label={
                  <p className={styles.label}>
                    Bank<span className={styles.required}>*</span>
                  </p>
                }
                name="bankName"
                placeholder="Enter Bank"
                validate={[required]}
              >
                {InputText}
              </Field>
              <Field
                aria-label="Branch Name"
                className={styles.customText}
                component={InputWrapper}
                label={
                  <p className={styles.label}>
                    Bank Branch<span className={styles.required}>*</span>
                  </p>
                }
                name="branchName"
                placeholder="Enter Branch"
                validate={[required]}
              >
                {InputText}
              </Field>
            </div>
            <Field
              aria-describedby="Bankaddress"
              aria-label="BankAddress"
              className={cn(styles.customText)}
              component={InputWrapper}
              id="bankAddress"
              label={
                <p className={styles.label}>
                  Address <span className={styles.required}>*</span>
                </p>
              }
              name="bankaddress"
              placeholder="Address,"
              validate={[required]}
            >
              {InputText}
            </Field>
            <div className={styles.row}>
              <Field
                aria-label="City"
                className={styles.customText}
                component={InputWrapper}
                label={
                  <p className={styles.label}>
                    Bank City<span className={styles.required}>*</span>
                  </p>
                }
                name="branchCity"
                placeholder="Enter City"
                validate={[required]}
              >
                {InputText}
              </Field>
              <Field
                aria-label="State"
                className={styles.customText}
                component={InputWrapper}
                label={
                  <p className={styles.label}>
                    Bank State<span className={styles.required}>*</span>
                  </p>
                }
                name="branchState"
                placeholder="Enter State"
                validate={[required]}
              >
                {InputText}
              </Field>
            </div>
          </div>
        )}
      </div>
      <div className={styles.nextButton}>
        <Button
          className={styles.next}
          disabled={submitting || loading}
          submitting={submitting || loading}
          type="submit"
        >
          <span>{initialBankDetails === false ? 'Next' : 'Add Bank'}</span>
        </Button>
      </div>

    </Form>
  );
};

BankDetailsForm.propTypes = {
  accountInformation: PropTypes.bool.isRequired,
  handleLoad: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  highContrast: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  accountTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  initialBankDetails: PropTypes.bool.isRequired,
  handleIFscCode: PropTypes.func.isRequired,
  setIfscCodeName: PropTypes.func.isRequired,
  makeItDefault:PropTypes.func.isRequired,
  isDefaultAccount:PropTypes.bool.isRequired

};

export default reduxForm({
  form: 'BankDetailsForm',
})(BankDetailsForm);
