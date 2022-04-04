import cn from 'classnames';
import PropTypes, { number } from 'prop-types';
import React, { useState } from 'react';
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
import styles from './AddGoalOrIncomeForm.module.scss';


const AddGoalOrIncomeForm = ({
    addNewDependentForm,
    disabledCancelBtn,
    handleCancelBtn,
    handleSubmit,
    onLoadform,
    isSelected,
    submitting,
    goalTypes,
    goalCategory,
    goalBuckets,
    formType,
    loading,
    uniqueKey,
    handleGoalName,
    isGoalNameFieldShow,
    frequencyTypes,
    selectedValue,
    asOfTodayChecked,
    asOfTargetChecked,
    handleasOfTarget,
    handleasOfToday,
    goalPriorities,
    atAgeDisabled,
    endOfLifeChecked,
    endOfLifeHidden,
    handleLoad,
    isAsTodayTargetHidden,
    atTillAgeDisable,
    handleGoalType,
    isInflectionRateHidden,
    handleTextBox,
    handleEndOfLifeHidden,
    clearDDValues,
}) => {
    const [value, setValue] = useState();

    const refresh = ()=>{
        // re-renders the component
        setValue({});
    }

    return (
        <Form
            key={uniqueKey}
            className={styles.formStyle}
            name="addGoalOrIncomeForm"
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
                        aria-describedby="goalCategory"
                        aria-label="goalCategory"
                        className={cn(styles.customText, styles.customDropdown)}
                        component={InputWrapper}
                        id="goalCategory"
                        isSearchable={false}
                        label={
                            <p className={styles.label}>
                                Goal Category<span className={styles.required}>*</span>
                            </p>
                        }
                        multi={false}
                        name="goalCategory"
                        options={goalCategory.map(item => {
                            return { label: item.Name, value: item.Id };
                        })}
                        placeholder={clearDDValues===true?"Select Goal":"Select Goal"}
                        validate={[required]}
                        onChange={(value) => handleGoalName(value)}
                        isSelected={1}
                    >
                        {InputDropdown}
                    </Field>
                    {isGoalNameFieldShow === true ? (<Field
                        aria-describedby="goalName"
                        aria-label="goalname"
                        className={styles.customText}
                        component={InputWrapper}
                        id="goalName"
                        label={
                            <p className={styles.label}>
                                Goal Name<span className={styles.required}>*</span>
                            </p>
                        }
                        name="goalName"
                        placeholder=""
                        validate={[required]}
                    >
                        {InputText}
                    </Field>) : null}
                    <Field
                        aria-describedby="goalBuckets"
                        aria-label="goalBuckets"
                        className={cn(styles.customText, styles.customDropdown)}
                        component={InputWrapper}
                        id="goalBuckets"
                        isSearchable={false}
                        label={
                            <p className={styles.label}>
                                Goal Bucket<span className={styles.required}>*</span>
                            </p>
                        }
                        multi={false}
                        name="goalBucket"
                        options={goalBuckets.map(item => {
                            return { label: item.Name, value: item.Id };
                        })}
                        placeholder="Select Goal Bucket"
                        validate={[required]}
                    >
                        {InputDropdown}
                    </Field>
                </div>
                <div className={styles.row}>
                    <Field
                        aria-describedby="goalFrequency"
                        aria-label="goalFrequency"
                        className={cn(styles.customText, styles.customDropdown)}
                        component={InputWrapper}
                        id="goalFrequency"
                        isSearchable={false}
                        label={
                            <p className={styles.label}>
                                Goal Frequency<span className={styles.required}>*</span>
                            </p>
                        }
                        multi={false}
                        name="goalFrequency"
                        options={frequencyTypes.map(item => {
                            return { label: item.Name, value: item.Id };
                        })}
                        placeholder={clearDDValues===true?"Select Frequency":"Select Frequency"}
                        validate={[required]}
                    >
                        {InputDropdown}
                    </Field>
                    {isInflectionRateHidden === false ? (<Field
                        aria-describedby="goalInflationRate"
                        aria-label="goalInflationRate"
                        className={styles.customText}
                        component={InputWrapper}
                        id="goalInflationRate"
                        label={
                            <p className={styles.label}>
                                Goal Inflation Rate<span className={styles.required}>*</span>
                            </p>
                        }
                        name="goalInflationRate"
                        placeholder=""
                        validate={[required]} //,validateNumbers]}
                    >
                        {InputText}
                    </Field>) : null}
                    {isGoalNameFieldShow === true ? (
                        <Field
                            aria-describedby="goalType"
                            aria-label="goalType"
                            className={cn(styles.customText, styles.customDropdown)}
                            component={InputWrapper}
                            id="goalType"
                            isSearchable={false}
                            label={
                                <p className={styles.label}>
                                    Goal Types<span className={styles.required}>*</span>
                                </p>
                            }
                            multi={false}
                            name="goalType"
                            options={goalTypes.map(item => {
                                return { label: item.Name, value: item.Id };
                            })}
                            placeholder={"Select Goal Types"}
                            validate={[required]}
                            onChange={(value) => handleGoalType(value)}
                        >
                            {InputDropdown}
                        </Field>) : null}
                </div>
                <div className={styles.row}>
                    <Field
                        aria-describedby="goalAmount"
                        aria-label="goalAmount"
                        className={styles.customText}
                        component={InputWrapper}
                        id="goalAmount"
                        label={
                            <p className={styles.label}>
                                Goal Amount<span className={styles.required}>*</span>
                            </p>
                        }
                        name="goalAmount"
                        placeholder=""
                        validate={[required,validateNumbers]}
                    >
                        {InputText}
                    </Field>
                    {isAsTodayTargetHidden === false ? (<div className={styles.row}><Field
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
                        </Field></div>) : null}
                    <Field
                        aria-describedby="goalPriority"
                        aria-label="goalPriority"
                        className={cn(styles.customText, styles.customDropdown)}
                        component={InputWrapper}
                        id="goalPriority"
                        isSearchable={false}
                        label={
                            <p className={styles.label}>
                                Goal Priority<span className={styles.required}>*</span>
                            </p>
                        }
                        multi={false}
                        name="goalPriority"
                        options={goalPriorities.filter(x=>x.id!=0).map(item => {
                            return { label: item.Name, value: item.id };
                        })}
                        placeholder={clearDDValues===true?"Select Priority":"Select Priority"}
                        validate={[required]}
                    >
                        {InputDropdown}
                    </Field>
                </div>
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
                            [required,validateNumbers]}
                        disabled={atAgeDisabled === true ? true : false}
                       //onChange={(value)=>handleAtAge(value)}
                    >
                        {InputText}
                    </Field>
                    {atTillAgeDisable === false ? (<Field
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
                        placeholder={atAgeDisabled === true ? "Default age is 85" : ""}
                        validate={[required,validateNumbers]}
                        maxLength={3}
                        onChange={(value)=>handleTextBox(value)}
                    >
                        {InputText}
                    </Field>) : null}
                    {endOfLifeHidden === false ? (<Field
                        aria-describedby="endOfLife"
                        aria-label="End Of Life"
                        component={InputCheckbox}
                        id="endOfLife"
                        label="End Of Life"
                        name="endOfLife"
                        isSelected={endOfLifeChecked}
                        onChange={(value)=>handleEndOfLifeHidden(value)}
                    >
                        {InputCheckbox}
                    </Field>) : null}
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
                            onKeyPress={refresh}
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

AddGoalOrIncomeForm.propTypes = {
    addNewDependentForm: PropTypes.bool,
    goalBuckets: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    disabledCancelBtn: PropTypes.bool.isRequired,
    formType: PropTypes.oneOf(['Beneficiary', 'Dependent']).isRequired,
    goalTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    handleCancelBtn: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired,
    isSelected: PropTypes.bool,
    loading: PropTypes.bool.isRequired,
    onLoadform: PropTypes.bool.isRequired,
    goalCategory: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    submitting: PropTypes.bool.isRequired,
    uniqueKey: PropTypes.string.isRequired,
    handleGoalName: PropTypes.func.isRequired,
    isGoalNameFieldShow: PropTypes.bool.isRequired,
    frequencyTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    selectedValue: PropTypes.string.isRequired,
    asOfTodayChecked: PropTypes.bool.isRequired,
    asOfTargetChecked: PropTypes.bool.isRequired,
    handleasOfTarget: PropTypes.func.isRequired,
    handleasOfToday: PropTypes.func.isRequired,
    goalPriorities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    atAgeDisabled: PropTypes.bool.isRequired,
    endOfLifeChecked: PropTypes.bool.isRequired,
    endOfLifeHidden: PropTypes.bool.isRequired,
    handleLoad: PropTypes.func.isRequired,
    isAsTodayTargetHidden: PropTypes.bool.isRequired,
    atTillAgeDisable: PropTypes.bool.isRequired,
    handleGoalType: PropTypes.func.isRequired,
    isInflectionRateHidden: PropTypes.bool.isRequired,
    handleTextBox:PropTypes.func.isRequired,
    userCurrentAge:PropTypes.number.isRequired,
    handleEndOfLifeHidden: PropTypes.func.isRequired,
    clearDDValues:PropTypes.bool.isRequired
};

export default reduxForm({
    form: 'addGoalOrIncomeForm',
})(AddGoalOrIncomeForm);
