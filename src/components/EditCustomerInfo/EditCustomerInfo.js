import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { Form, reduxForm, Field } from "redux-form";
import {
  required,
  email,
  repeatEmail,
  beforeNowDaysMMDDYYYY,
  phoneNumber,
  ssn,
} from "../../utilities/validations";
import { InputText } from "../InputText/InputText";
import styles from "./EditCustomerInfo.module.scss";
import InputWrapper from "../InputWrapper/InputWrapper";
import Button from "../Button/Button";
import { InputDate } from "../InputDate/InputDate";
import { InputDropdown } from "../InputDropdown/InputDropdown";
import { InputMasked } from "../InputMasked/InputMasked";
import {
  zipCodeMask,
  phoneNumberMask,
  ssnMask,
  initialMask,
} from "../../utilities/masks";

const EditCustomerInfo = ({
  handleSubmit,
  submitting,
  loading,
  highContrast,
  genderTypes,
  phoneTypes,
  states,
  isCmsPage,
  handleCSISuccess,
  RetireTypes,
  maritalStatus
}) => {
  
  const textStyle = highContrast ? styles.darkContainer : null;
  return (
    <Form
      className={styles.formStyle}
      name="editCustomerInfo"
      onSubmit={handleSubmit}
      ha
      autoComplete={true}
    >
      <div className={cn(styles.positioningClass, styles.denotesLabel)}>
        <span className={styles.required}>*</span> Denotes a Required Field
      </div>
      <div className={cn(styles.container, textStyle)}>
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
            validate={[required]}
            id="editFirstName"
            aria-describedby="editFirstName"
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
            validate={[required]}
            id="editLastName"
            aria-describedby="editLastName"
          >
            {InputText}
          </Field>
        </div>
        <div className={styles.row}>
          <div>
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
              id="editDob"
              aria-describedby="editDob"
            >
              {InputDate}
            </Field>
          </div>
          <div aria-describedby="editGender">
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
              id="editGender"
              aria-describedby="editGender"
            >
              {InputDropdown}
            </Field>

          </div>
          <div aria-describedby="editRetiree">
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
              name="RetirementStatus"
              options={RetireTypes.map((item) => {
                return { label: item.Name, value: item.Id };
              })}
              placeholder="Retirement Status"
              validate={[required]}
            >
              {InputDropdown}
            </Field>
          </div>
        </div>
        <div className={styles.row}>
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
            <Field
              aria-label="phone number"
              className={styles.customText}
              component={InputWrapper}
              label={
                <p className={styles.label}>
                  Phone Number<span className={styles.required}>*</span>
                </p>
              }
              maxLength="14"
              name="phoneNumber"
              placeholder="(123) 456-7890"
              mask={phoneNumberMask}
              validate={[phoneNumber, required]}
              id="editPhone"
              aria-describedby="editPhone"
            >
              {InputMasked}
            </Field>
          </div>

        <div className={styles.nextButton}>
          <Button
            className={styles.next}
            disabled={submitting || loading}
            submitting={submitting || loading}
            highContrast={highContrast}
            type="submit"
            aria-label="submit"
          >
            Update
          </Button>
        </div>
      </div>
    </Form>
  );
};

EditCustomerInfo.propTypes = {
  customerDetails: PropTypes.shape({
    EmailOptIn: PropTypes.bool,
  }).isRequired,
  genderTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleCSISuccess: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  highContrast: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  phoneTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  states: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  RetireTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  maritalStatus:PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: "editCustomerInfo",
  onSubmitFail: (errors) => {
    const errorEl = document.querySelector(
      Object.keys(errors)
        .map((fieldName) => `[name="${fieldName}"]`)
        .join(",")
    );
    if (errorEl.name === "gender") {
      document.getElementById("react-select-6-input").focus();
    } else if (errorEl.name === "state") {
      document.getElementById("react-select-7-input").focus();
    } else if (errorEl.name === "phoneType") {
      document.getElementById("react-select-8-input").focus();
    } else {
      errorEl.focus();
    }
  },
})(EditCustomerInfo);
