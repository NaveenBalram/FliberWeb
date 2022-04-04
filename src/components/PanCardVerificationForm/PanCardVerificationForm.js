import PropTypes from 'prop-types';
import React from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { pancardValidation, required } from '../../utilities/validations';
import Button from '../Button/Button';
import InputPassword from '../InputPassword/InputPassword';
import { InputText } from '../InputText/InputText';
import InputWrapper from '../InputWrapper/InputWrapper';
import styles from './PanCardVerificationForm.module.scss';

const PanCardVerificationForm = ({ handleSubmit, submitting, loading }) => {
    return (
        <Form
            className={styles.formStyle}
            name="PanCardVerificationForm"
            onSubmit={handleSubmit}
        >
            <div className={styles.container}>
                <Field
                    key="panCardNumber"
                    aria-label="panCard Number"
                    className={styles.customText}
                    component={InputWrapper}
                    customChildrenWrapper={styles.passwordWrapper}
                    label="Pancard Number"
                    name="pancardNumber"
                    placeholder="ASRPBXXXXX"
                    validate={[required, pancardValidation]}
                >
                    {InputText}
                </Field>
               
                <div className={styles.nextButton}>
                    <Button
                        className={styles.next}
                        disabled={submitting || loading}
                        submitting={submitting || loading}
                        type="submit"
                    >
                        <span>Continue</span>
                    </Button>
                </div>
            </div>

        </Form>
    );
};

PanCardVerificationForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
    form: 'PanCardVerificationForm',
})(PanCardVerificationForm);
