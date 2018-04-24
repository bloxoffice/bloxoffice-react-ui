import { length, both, is, complement, equals } from 'ramda';

const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
const validate10DigitPhone = /^\d{10}$/;
export const validateEmail = validEmail.test.bind(validEmail);
export const validateNumber = both(is(Number), complement(equals(NaN)));
export const validateAge = num => num >= 18;
export const validatePhone = validate10DigitPhone.test.bind(validate10DigitPhone);
export const validateMinLength = len => length >= len;

export const fieldTypes = {
  email: validateEmail,
  number: validateNumber,
  age: validateAge,
  phone: validatePhone,
  minLength: validateMinLength(1),
  password: validateMinLength(6),
};

export const messages = {
  email: 'Invalid Email',
  age: 'Invalid Age',
  phone: 'Invalid Phone Number',
  password: 'Password should have min 8 characters',
  number: 'Invalid Number',
  required: 'is required',
  name: 'Invalid field'
};

export const validateTextInput = (name, placeholder, required, validate, value, type) => {
  if (validate) {
    if (required) {
      if (!value || value === '') {
        return { isValid: false, message: `${placeholder} ${messages.required}` };
      }
      const check = fieldTypes[type];
      const isValid = check ? check(value) : true;
      return { isValid, message: isValid ? '' : messages[type] };
    }
  }
  return { isValid: true, message: '' };
};
