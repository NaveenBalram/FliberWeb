import isCreditCard from 'validator/lib/isCreditCard';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import moment from 'moment';
import { toNumber } from './helpers';

const afterDate = (date, format, specificity) => {
  return value => {
    if (value && moment(value, format).diff(date, specificity) <= 0) {
      return `Date must be after ${moment(date).format(format)}`;
    }
  };
};



export const afterDateDaysMMDDYYYY = date => {
  const format = 'MM/DD/YYYY';
  return afterDate(moment(date, format), format, 'days');
};

export const afterDateDaysMMDDYYYYInclusive = date => {
  const format = 'MM/DD/YYYY';
  return afterDate(moment(date, format).subtract(1, 'days'), format, 'days');
};

export const afterNowMonthsMMYYYYInclusive = afterDate(
  moment()
    .startOf('month')
    .subtract(1, 'month'),
  'MM/YYYY',
  'months'
);

const beforeDate = (date, format, specificity) => {
  return value => {
    if (value && moment(value, format).diff(date, specificity) >= 0) {
      return `Date must be before ${moment(date).format('L')}`;
    }
  };
};

export const beforeNowDaysMMDDYYYY = beforeDate(moment(), 'MM/DD/YYYY', 'days');

export const creditCard = (value, allValues) => {
  if (value && !isCreditCard(value)) {
    return 'Invalid card number';
  }
  if (!allValues.cardType) {
    return 'Please select a card type.';
  }
  if (
    allValues.cardType === 'MC' &&
    parseInt(value.substring(0, 1), 10) !== 5
  ) {
    return 'Invalid card number';
  }
  if (
    allValues.cardType === 'VISA' &&
    parseInt(value.substring(0, 1), 10) !== 4
  ) {
    return 'Invalid card number';
  }
};

export const cvv = value => {
  if (value && !/^\d\d\d$/.test(value)) return 'Invalid CVV';
};

export const cvvAmex = value => {
  if (value && !/^\d\d\d\d$/.test(value)) return 'Invalid CVV';
};

export const bankRoutingNumber = value => {
  if (value && !/^\d\d\d\d\d\d\d\d\d$/.test(value)) {
    return 'Invalid Routing Number';
  }
};

export const validateBankNumber = value => {
  if(value && !/^(?:[0-9]{11}|[0-9]{2}-[0-9]{3}-[0-9]{6})$/.test(value)){
    return 'Invalid Account Number';
  }
}

const date = format => {
  return value => {
    if (value && !moment(value, format, true).isValid()) return 'Invalid date';
  };
};

export const dateMMDDYYYY = date('MM/DD/YYYY');
export const dateMMYYYY = date('MM/YYYY');

export const email = value => {
  if (value && !isEmail(value)) return 'Invalid email';
};

export const legalIdentificationNumber = value => {
  if (value && !/\d\d-\d\d\d\d\d\d\d/.test(value)) {
    return 'Invalid identification number';
  }
};

export const equalToPercentage = value => {
  const number = toNumber(value ? value.substring(0, value.length - 1) : '0');
  if (number > 0 && number !== 100) {
    return 'Must be equal to 0% or 100%';
  }
};

export const lessThanOrEqualToPercentage = value => {
  let number;
 if(typeof value!=='number')
 {
   number = toNumber(value ? value.substring(0, value.length - 1) : 0);
 }else{
   number = value;
 }
  if (number > 100) {
    return 'Must be less than or equal to 100%';
  }
};

export const lessThanOrEqualTo = (lessThanValue, suffix = '') => value => {
  if (value) {
      const number = toNumber(value ? value.substring(0, value.length - 1) : 0);
    if (number > lessThanValue) {
      return `Must be less than or equal to ${lessThanValue}${suffix}`;
    }
  }
};

const minLength = length => {
  return value => {
    if (value && value.length < length) {
      return `Must be  ${length} characters`;
    }
  };
};

const maxLength = length => {
  return value => {
    if (value && value.length > length) {
      return `Max ${length} digits`;
    }
  };
};

export const minLength6 = minLength(6);

export const maxLength6 = maxLength(6);

export const maxLength3 = maxLength(3);

export const maxLength5 = maxLength(5);

export const minLength8 = minLength(8);

export const phoneNumber = value => {
  var INDNUM =/^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;

  if (value && !INDNUM.test(value)) return 'Invalid phone number';
};

export const positive = value => {
  if (value && value < 0) return 'Invalid number';
};

export const onlystring = value => {
  const ONLYSTRING = /^[A-Za-z]+$/;
  if(value && !ONLYSTRING.test(value)) return 'Value should be type of Character';
}

export const required = value => {
  if (value === undefined || value === '') return 'Required';
};

export const specialCharecterPaymethodRequired = value => {
  const splChars = '/';
  let counter = 0;
  for (let i = 0; i < value.length; i += 1) {
    if (splChars.indexOf(value.charAt(i)) !== -1) {
      counter += 1;
    }
  }
  if (counter < 1) {
    return 'Invalid Expiration Date';
  }
};

export const specialCharecterRequired = value => {
  const splChars = '*|,":<>[]{}`\';()@&$#%/!';
  let counter = 0;
  for (let i = 0; i < value.length; i += 1) {
    if (splChars.indexOf(value.charAt(i)) !== -1) {
      counter += 1;
    }
  }
  if (counter < 1) {
    return 'At least one special charecter required';
  }
};

export const checkUpperAndLowerCase = value => {
  let hasUpperCase = false;
  let hasLowerCase = false;
  if (value.match(/[A-Z]/)) {
    hasUpperCase = true;
  }
  if (value.match(/[a-z]/)) {
    hasLowerCase = true;
  }
  if (!hasUpperCase || !hasLowerCase) {
    return 'Mix Upper Case and Lower Case Characters.';
  }
};

export const hasNumber = value => {
  if (!/\d/.test(value)) return 'At least one number required';
};

export const ssn = value => {
  if (
    value &&
    (!/\d\d\d-\d\d-\d\d\d\d/.test(value) ||
      parseInt(value.substring(0, 3), 10) > 740 ||
      parseInt(value.substring(0, 3), 10) === 0 ||
      parseInt(value.substring(4, 6), 10) === 0 ||
      parseInt(value.substring(7, 11), 10) === 0)
  ) {
    return 'Invalid SSN';
  }
};

export const routingNumber = value => {
  if (value && !/\d\d\d\d\d\d\d\d\d/.test(value)) {
    return 'Invalid Routing Number';
  }
};

export const employeeId = value => {
  if (
    value &&
    !/[A-Z,a-z][A-Z,a-z,0-9][A-Z,a-z,0-9][A-Z,a-z,0-9][A-Z,a-z,0-9]/.test(value)
  ) {
    return 'Invalid Employee Id';
  }
};

export const compareWithStartDate = (value, allValues) => {
  const { coverageStartDate, coverageEndDate } = allValues;
  const format = 'MM/DD/YYYY';
  if (
    moment
      .utc(coverageEndDate, format)
      .diff(moment.utc(coverageStartDate, format), 'days') < 0
  ) {
    return 'End date must be after or equal to Start date';
  }
};

export const compareWithSystemDate = value => {
  if (moment.utc(value, 'MM/DD/YYYY').diff(moment().startOf('day')) < 0) {
    return 'Date must be greater than or equal to today’s date';
  }
};

export const today = value => {
  if (moment(new Date()).format('MM/DD/YYYY') !== value)
    return `Date must be today's date.`;
};

export const compareCoverageAndEnrollmentDates = (values, props) => {
  const errors = {};
  const format = 'MM/DD/YYYY';
  const { planStartDate, planEndDate } = props;
  const startDate = moment(planStartDate, 'x').format('L');
  const endDate = moment(planEndDate, 'x').format('L');
  if (values && Object.keys(values).length > 0) {
    Object.values(values).forEach((data, index) => {
      if (Object.keys(data).some(x => x.split('_')[0] === 'plan')) {
        const productId = Object.keys(values)[index];
        const coverageEndDate = data[`coverageEndDate_${productId}`];
        const coverageStartDate = data[`coverageStartDate_${productId}`];
        const enrollmentEndDate = data[`enrollmentEndDate_${productId}`];
        const enrollmentStartDate = data[`enrollmentStartDate_${productId}`];
        if (!errors[productId]) {
          errors[productId] = {};
        }
        if (coverageEndDate && coverageStartDate) {
          if (
            moment
              .utc(coverageEndDate, format)
              .diff(moment.utc(coverageStartDate, format), 'days') <= 0
          ) {
            errors[productId][`coverageEndDate_${productId}`] =
              'Coverage End date must be after Coverage Start date';
          }
          if (
            moment
              .utc(coverageStartDate, format)
              .add(1, 'years')
              .diff(moment.utc(coverageEndDate, format), 'days') > 0
          ) {
            errors[productId][`coverageEndDate_${productId}`] =
              'The coverage end date must be a year from the coverage start date';
          }
        }
        if (enrollmentEndDate && enrollmentStartDate) {
          if (
            moment
              .utc(enrollmentEndDate, format)
              .diff(moment.utc(enrollmentStartDate, format), 'days') <= 0
          ) {
            errors[productId][`enrollmentEndDate_${productId}`] =
              'Enrollment End date must be after Enrollment start date';
          }
        }
        if (
          (enrollmentStartDate && coverageStartDate) ||
          (enrollmentEndDate && coverageEndDate)
        ) {
          if (
            moment
              .utc(enrollmentStartDate, format)
              .diff(moment.utc(coverageStartDate, format), 'days') < 0
          ) {
            errors[productId][`enrollmentStartDate_${productId}`] =
              'Enrollment dates must be within the coverage period';
          }
          if (
            moment
              .utc(coverageEndDate, format)
              .diff(moment.utc(enrollmentEndDate, format), 'days') <= 0
          ) {
            errors[productId][`enrollmentEndDate_${productId}`] =
              'Enrollment dates must be within the coverage period';
          }
        }
        if (coverageStartDate && planStartDate) {
          if (
            moment
              .utc(coverageStartDate, format)
              .isBefore(moment.utc(startDate, format), 'days')
          ) {
            errors[productId][
              `coverageStartDate_${productId}`
            ] = `Coverage start date must be after or equal to ${startDate}`;
          }
        }
        if (coverageEndDate && planEndDate) {
          if (
            moment
              .utc(coverageEndDate, format)
              .isAfter(moment.utc(endDate, format), 'days')
          ) {
            errors[productId][
              `coverageEndDate_${productId}`
            ] = `Coverage end date must be before or equal to ${endDate}`;
          }
        }
        if (enrollmentStartDate && planStartDate) {
          if (
            moment
              .utc(enrollmentStartDate, format)
              .isBefore(moment.utc(startDate, format), 'days')
          ) {
            errors[productId][`enrollmentStartDate_${productId}`] =
              'Enrollment start date must be after plan start date';
          }
        }
        if (enrollmentEndDate && planEndDate) {
          if (
            moment
              .utc(enrollmentEndDate, format)
              .isAfter(moment.utc(endDate, format), 'days')
          ) {
            errors[productId][`enrollmentEndDate_${productId}`] =
              'Enrollment end date must be before plan end date';
          }
        }
      }
    });
  }
  return errors;
};

export const groupNumber = value => {
  if (value && !/[A-Z,a-z,0-9][A-Z,a-z,0-9]-\d\d\d\d/.test(value)) {
    return 'Invalid group number';
  }
};

export const writingNumber = value => {
  if (value && !/[A-Z,a-z][A-Z,a-z][A-Z,a-z][A-Z,a-z]/.test(value)) {
    return 'Invalid writing number';
  }
};

export const zipcode = value => {
  if (value && !/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value)) {
    return 'Invalid Zipcode';
  }
};

export const repeatPassword = (value, allValues) => {
  if (!(allValues.new_mpin === allValues.re_mpin)) {
    return "MPIN provided is not matching";
  }
};

export const repeatBankAccountNumber = (value, allValues) => {

  if (!(allValues.accountNumber === allValues.confirmAccountNumber)) {
    return "Account Numbers Don't Match";
  }
};

export const repeatEmail = (value, allValues) => {
  if (!(allValues.email === allValues.reEnterEmail)) {
    return "Email Addresses Don't Match";
  }
};

export const latestHireDate = (value, allValues) => {
  const format = 'MM-DD-YYYY';
  if (
    allValues.latestDateOfHire &&
    moment
      .utc(allValues.dateOfHire, format)
      .diff(moment.utc(allValues.latestDateOfHire, format), 'days') > 0
  ) {
    return 'Should be before Date of Hire';
  }
};

export const terminationDate = (value, allValues) => {
  if (
    value &&
    allValues.latestDateOfHire &&
    moment(value, 'MM/DD/YYYY').isBefore(
      moment(allValues.latestDateOfHire, 'MM/DD/YYYY')
    )
  ) {
    return 'Should be before Latest Date of Hire';
  }
  if (
    value &&
    allValues.dateOfHire &&
    !allValues.latestDateOfHire &&
    moment(value, 'MM/DD/YYYY').isBefore(
      moment(allValues.dateOfHire, 'MM/DD/YYYY')
    )
  ) {
    return 'Should be before Date of Hire';
  }
};

export const validateNumbers = value => {
  let error = '';
  if (value) {
    const values = value.replace(/\s*,\s*/g, ',').split(',');
    values.forEach(val => {
      if (Number.isNaN(Number(val))) {
        error = 'Values should be of type number';
      }
    });
  }
  return error;
};

export const beforeEffectiveDate = (value, allValues) => {
  const format = 'MM/DD/YYYY';
  if (
    allValues.effectiveDate &&
    allValues.lossDate &&
    moment
      .utc(allValues.effectiveDate, format)
      .diff(moment.utc(allValues.lossDate, format), 'days') > 0
  ) {
    return 'Loss Date cannot be before Effective Date';
  }
};

export const beforeNowDaysMMDDYYYYInclusive = value => {
  if (value && moment(value, 'MM/DD/YYYY').isAfter(moment())) {
    return `Date must be before or equal to ${moment().format('L')}`;
  }
};
export const tillAgeValue = (lessThanValue, currentAge, suffix = '') => value => {
    if (value) {
        const number = toNumber(value ? value.substring(0, value.length - 1) : 0);
        if (number > lessThanValue) {
            return `Till age must be less than or equal to ${lessThanValue}${suffix}`;
        }
        // if(number <= currentAge){
        //   return `Till age must be more than current age.`
        // }
    }
};

export const currentAgeValue = (currentAge, suffix = '') => value => {

    if (value) {
        const number = toNumber(value.substring(0, value.length - 1));

        if (number <= toNumber(currentAge)) {
            return `At Age must be greater than Current age`;
        }
        // if(number > (currentAge+1)){
        //   return `At Age must be equal to ${currentAge+1}`;
        // }
    }
};

export const pancardValidation = (text) => {
  let   regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
  if(!regex.test(text)) {
    return `Invalid Pancard Number`;
  }
};

export const ifscCodeValidation = (text) =>{
  let regex = /^[A-Za-z]{4}\d{7}$/;
  if(!regex.test(text)){
    return `Invalid IFSC code`
  }
};