import PropTypes from 'prop-types';
import React from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import moment from 'moment-timezone';
import { required } from '../../utilities/validations';
import Button from '../Button/Button';
import { InputText } from '../InputText/InputText';
import InputWrapper from '../InputWrapper/InputWrapper';
import styles from './ESignatureForm.module.scss';


const date = moment().tz('America/New_York').format('MM/DD/YYYY h:mm a');

const ESignatureForm = ({
  handleSubmit,
  submitting,
  loading,
  disabled,
  handleOnChange,
  imgSrc,
  inputVal
}) => {
  return (
    <Form
      className={styles.formStyle}
      name="eSignatureForm"
      onSubmit={handleSubmit}
    >
      <div className={styles.container}>
        <Field
          key="esign"
          aria-label="electronic signature"
          className={styles.customText}
          component={InputWrapper}
          label="Electronic Signature"
          name="esign"
		  placeholder="Full Name"
          validate={[required]}
        >
          {InputText}
        </Field>
		<Field
          key="esignDate"
          aria-label="electronic signature Date"
          className={styles.customText}
          component={InputWrapper}
          label="Date"
          name="esignDate"
		  placeholder={date}
		  readOnly
        >
          {InputText}
        </Field>
      </div>
    </Form>
  );
};

ESignatureForm.propTypes = {
  disabled: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  imgSrc: PropTypes.arrayOf({}).isRequired,
  inputVal: PropTypes.arrayOf({}).isRequired

};

export default reduxForm({
  form: 'eSignatureForm',
})(ESignatureForm);
