import * as yup from 'yup';

export const controlledFormSchema = yup.object().shape({
  name: yup.string()
    .matches(/^[A-Z][a-zA-Z\s]*$/, 'Name must start with an uppercase letter and contain only Latin letters')
    .required('Name is required'),
  age: yup.number()
    .positive('Age must be a positive number')
    .integer('Age must be an integer')
    .required('Age is required'),
  email: yup.string()
    .email('Email must be a valid email')
    .matches(/^[A-Za-z0-9@.]+$/, 'Email can only contain Latin letters and numbers')
    .required('Email is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/^[A-Za-z0-9!@#$%^&*]+$/, 'Password can only contain Latin letters, numbers, and special characters')
    .matches(/(?=.*[0-9])/, 'Password must contain a number')
    .matches(/(?=.*[A-Z])/, 'Password must contain an uppercase letter')
    .matches(/(?=.*[a-z])/, 'Password must contain a lowercase letter')
    .matches(/(?=.*[!@#$%^&*])/, 'Password must contain a special character')
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: yup.string().required('Gender is required'),
  acceptTerms: yup.bool().oneOf([true], 'You must accept the terms and conditions'),
  picture: yup.mixed()
    .test('fileSize', 'Picture is required and must be a valid image', value => value && value.length > 0)
    .required('Picture is required'),
  country: yup.string().required('Country is required'),
});
