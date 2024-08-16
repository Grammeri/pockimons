import * as yup from 'yup';

import * as yup from 'yup';

export const controlledFormSchema = yup.object().shape({
  name: yup.string().required("Name is required").matches(/^[A-Z]/, "Name must start with an uppercase letter"),
  age: yup.number().required("Age is required").positive("Age must be a positive number").integer(),
  email: yup.string().required("Email is required").email("Email is not valid"),
});

