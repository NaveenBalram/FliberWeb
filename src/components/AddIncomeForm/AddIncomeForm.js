import cn from 'classnames';
import PropTypes, { number } from 'prop-types';
import React from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { initialMask, phoneNumberMask, ssnMask } from '../../utilities/masks';
import {
    beforeNowDaysMMDDYYYY,
    required,
    phoneNumber,
    ssn,
    tillAgeValue,
    currentAgeValue,
    lessThanOrEqualTo,
    validateNumbers
} from '../../utilities/validations';
import Button from '../Button/Button';
import InputCheckbox from '../InputCheckbox/InputCheckbox';
import { InputDate } from '../InputDate/InputDate';
import { InputDropdown } from '../InputDropdown/InputDropdown';
import { InputMasked } from '../InputMasked/InputMasked';
import { InputText } from '../InputText/InputText';
import InputWrapper from '../InputWrapper/InputWrapper';
import styles from './AddIncomeForm.module.scss';

const AddIncomeForm = ({

    disabledCancelBtn,
    handleCancelBtn,
    handleSubmit,
    onLoadform,
    isSelected,
    formType,
    loading,
    uniqueKey,
    handleIncomeName,
    selectedValue,
    handleLoad,
    incomeCategory,
    incomeTypes,
    frequencyTypes,
    submitting,
    handleIncomeType,
    endOfLifeChecked,
    atAgeDisabled,
    endOfLifeHidden,
    tillAgeHidden,
    isAsTodayTargetHidden,
    handleasOfToday,
    asOfTargetChecked,
    asOfTodayChecked,
    handleasOfTarget,
    handleEndOfLifeHidden

}) => {

    return (
        <Form
            key={uniqueKey}
            className={styles.formStyle}
            name="addIncomeForm"
            onSubmit={handleSubmit}
            onLoad={handleLoad}
        >
            {onLoadform ? (
                <h2 className={cn(styles.positioningClass)}>{`Update ${formType}`}</h2>
            ) : (
                <h2 className={cn(styles.positioningClass)}>{`Add New ${formType}`}</h2>
            )}
            <h2 className={cn(styles.positioningClass, styles.information)}>
                <span className={styles.required}>*</span> Denotes a Required Field
            </h2>
            <div className={styles.container}>
                <div className={styles.row}>

                    <Field
                        aria-describedby="incomeCategory"
                        aria-label="incomeCategory"
                        className={cn(styles.customText, styles.customDropdown)}
                        component={InputWrapper}
                        id="incomeCategory"
                        isSearchable={false}
                        label={
                            <p className={styles.label}>
                                Income Category<span className={styles.required}>*</span>
                            </p>
                        }
                        multi={false}
                        name="incomeCategory"
                        options={incomeCategory.map(item => {
                            return { label: item.Name, value: item.Id };
                        })}
                        placeholder="Select Income"
                        validate={[required]}
                        onChange={(value) => handleIncomeName(value)}
                    >
                        {InputDropdown}
                    </Field>
                    <Field
                        aria-describedby="incomeFrequency"
                        aria-label="incomeFrequency"
                        className={cn(styles.customText, styles.customDropdown)}
                        component={InputWrapper}
                        id="incomeFrequency"
                        isSearchable={false}
                        label={
                            <p className={styles.label}>
                                Income Frequency<span className={styles.required}>*</span>
                            </p>
                        }
                        multi={false}
                        name="incomeFrequency"
                        options={frequencyTypes.map(item => {
                            return { label: item.Name, value: item.Id };
                        })}
                        placeholder={"Select Frequency"}
                        validate={[required]}
                    >
                        {InputDropdown}
                    </Field>

                </div>
                <div className={styles.row}>

                    <Field
                        aria-describedby="incomeInflationRate"
                        aria-label="incomeInflationRate"
                        className={styles.customText}
                        component={InputWrapper}
                        id="incomeInflationRate"
                        label={
                            <p className={styles.label}>
                                Income Inflation Rate<span className={styles.required}>*</span>
                            </p>
                        }
                        name="incomeInflationRate"
                        placeholder=""
                        validate={[required], [validateNumbers]}
                    >
                        {InputText}
                    </Field>

                    <Field
                        aria-describedby="incomeType"
                        aria-label="incomeType"
                        className={cn(styles.customText, styles.customDropdown)}
                        component={InputWrapper}
                        id="incomeType"
                        isSearchable={false}
                        label={
                            <p className={styles.label}>
                                Income Types<span className={styles.required}>*</span>
                            </p>
                        }
                        multi={false}
                        name="incomeType"
                        options={incomeTypes.map(item => {
                            return { label: item.Name, value: item.Id };
                        })}
                        placeholder={"Select Income Types"}
                        validate={[required]}
                        onChange={(value) => handleIncomeType(value)}
                    >
                        {InputDropdown}
                    </Field>
                    <Field
                        aria-describedby="incomeAmount"
                        aria-label="incomeAmount"
                        className={styles.customText}
                        component={InputWrapper}
                        id="incomeAmount"
                        label={
                            <p className={styles.label}>
                                Income Amount<span className={styles.required}>*</span>
                            </p>
                        }
                        name="incomeAmount"
                        placeholder=""
                        validate={[required, validateNumbers]}
                    >
                        {InputText}
                    </Field>

                </div>

                {isAsTodayTargetHidden === true ? (<div className={styles.row}>
                    <Field
                        aria-describedby="asOfToday"
                        aria-label="As Of Today"
                        component={InputCheckbox}
                        id="asOfToday"
                        label="As of Today"
                        name="asOfToday"
                        onChange={(value) => handleasOfToday(value)}
                        isSelected={asOfTodayChecked}
                    >
                        {InputCheckbox}
                    </Field>
                    <Field
                        aria-describedby="asOfTarget"
                        aria-label="AsofTarget"
                        component={InputCheckbox}
                        id="asOfTarget"
                        label="As Of Target"
                        name="asOfTarget"
                        customLabelStyle={styles.checkBoxLabel}
                        onChange={(value) => handleasOfTarget(value)}
                        isSelected={asOfTargetChecked}
                    >
                        {InputCheckbox}
                    </Field>
                </div>) : (null)}
                <div className={styles.row}>

                    <Field
                        aria-describedby="atAge"
                        aria-label="atAge"
                        className={styles.customText}
                        component={InputWrapper}
                        id="atAge"
                        maxLength={3}
                        label={
                            <p className={styles.label}>
                                At the Age<span className={styles.required}>*</span>
                            </p>
                        }
                        name="atAge"
                        placeholder={atAgeDisabled === true ? "This field is Disabled" :
                            ""}
                        validate={atAgeDisabled === true ? null :
                            [required, validateNumbers]}
                        disabled={atAgeDisabled === true ? true : false}
                        disabled={atAgeDisabled === true ? true : false}
                    >
                        {InputText}
                    </Field>
                    {tillAgeHidden === false ? (<Field
                        aria-describedby="tillAge"
                        aria-label="tillAge"
                        className={styles.customText}
                        component={InputWrapper}
                        id="tillAge"
                        label={
                            <p className={styles.label}>
                                Till Age<span className={styles.required}>*</span>
                            </p>
                        }
                        name="tillAge"
                        placeholder={''}
                        validate={[required, validateNumbers]}
                        maxLength={3}
                    >
                        {InputText}
                    </Field>) : (null)}
                    {endOfLifeHidden === false ? (<Field
                        aria-describedby="endOfLife"
                        aria-label="End Of Life"
                        component={InputCheckbox}
                        id="endOfLife"
                        label="End Of Life"
                        name="endOfLife"
                        isSelected={endOfLifeChecked}
                        onChange={(value) => handleEndOfLifeHidden(value)}
                    >
                        {InputCheckbox}
                    </Field>) : (null)}

                </div>
                <div className={styles.nextButton}>
                    <Button
                        className={styles.next}
                        disabled={submitting || loading}
                        submitting={submitting || loading}
                        type="submit"
                    >
                        {onLoadform ? (
                            <span>{`Update ${formType}`}</span>
                        ) : (
                            <span>{`Add ${formType}`}</span>
                        )}
                    </Button>
                    {disabledCancelBtn ? null : (
                        <div
                            className={styles.cancelBtn}
                            onClick={() => handleCancelBtn()}
                            onKeyPress={handleCancelBtn}
                            role="button"
                            tabIndex="0"
                        >
                            Cancel
                        </div>
                    )}
                </div>
            </div>
        </Form>
    );
};

AddIncomeForm.propTypes = {
    addNewDependentForm: PropTypes.bool,

    disabledCancelBtn: PropTypes.bool.isRequired,
    formType: PropTypes.oneOf(['Beneficiary', 'Dependent']).isRequired,
    incomeTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    handleCancelBtn: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired,
    isSelected: PropTypes.bool,
    loading: PropTypes.bool.isRequired,
    onLoadform: PropTypes.bool.isRequired,
    incomeCategory: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    submitting: PropTypes.bool.isRequired,
    uniqueKey: PropTypes.string.isRequired,
    handleIncomeName: PropTypes.func.isRequired,
    frequencyTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    selectedValue: PropTypes.string.isRequired,
    handleLoad: PropTypes.func.isRequired,
    handleIncomeType: PropTypes.func.isRequired,
    endOfLifeChecked: PropTypes.bool.isRequired,
    atAgeDisabled: PropTypes.bool.isRequired,
    endOfLifeHidden: PropTypes.bool.isRequired,
    tillAgeHidden: PropTypes.bool.isRequired,
    handleCancelBtn: PropTypes.func.isRequired,
    isAsTodayTargetHidden: PropTypes.bool.isRequired,
    handleasOfToday: PropTypes.func.isRequired,
    asOfTargetChecked: PropTypes.bool.isRequired,
    asOfTodayChecked: PropTypes.bool.isRequired,
    handleasOfTarget: PropTypes.func.isRequired,
    handleEndOfLifeHidden: PropTypes.func.isRequired

};

export default reduxForm({
    form: 'addIncomeForm',
})(AddIncomeForm);
